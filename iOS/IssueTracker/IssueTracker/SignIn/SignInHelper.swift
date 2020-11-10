//
//  SignInHelper.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/10.
//

import Foundation
import hvNetwork

class SignInHelper {

	//MARK:- Github Login
	func requestAccessToken(code: String) {
		let url = Constant.Github.accessTokenURL
		let clientId = Environment.clientId
		let client_secret = Environment.clientSecret
		let parameter = ["client_id": clientId, "client_secret": client_secret, "code":code]
		
		let headers = ["Accept": "application/json"]
		
		hvNet.request(url, method: .post, parameter: parameter, headers: headers).response { (result: HVDataResponse<JSON>) in
			switch result {
			case .success(let json):
				self.getUserInfo(token: json["access_token"] as! String)
			case .failure(let error):
				print(error)
			}
		}
	}
	
	func getUserInfo(token: String) {
		
		let url = Constant.Github.userAPIURL
		let headers = ["Accept":"application/json","Authorization": "token \(token)"]
		
		hvNet.request(url, headers: headers).response { (result: HVDataResponse<JSON>) in
			switch result {
			case .success(let json):
				guard let userName = json["login"] as? String,
					  let avatarURL = json["avatar_url"] as? String else { return }
				AppData.user = User(name: userName, avatorURL: avatarURL, state: 1)
				print(userName, avatarURL)
				//서버에 요청해서 어세스토큰 받아와서 유저 디포트에 받아오기
				self.registerUserInfo(user: AppData.user)
			case .failure(let error):
				print(error)
			}
		}
	}
	
	func registerUserInfo(user: User) {
		let headers = ["Authorization": Environment.masterToken]
		let parameters: Parameters = ["username": user.name, "state": user.state, "avatar": user.avatorURL]
		hvNet.request("http://49.50.163.58:3000/auth/login", method: .post, parameter: parameters, headers: headers).response { (result: HVDataResponse<JSON>) in
			switch result {
			case .success(let json):
				//서버에 등록완료 + 토큰 저장하기
				guard let token = json["token"] as? String else { return }
				AppData.token = token
				if user.state == 1 {
					NotificationCenter.default.post(name: .signInDidFinished, object: nil)
				}
			case .failure:
				print("fail")
			}
		}
	}
}
