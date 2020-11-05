//
//  SceneDelegate.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/10/26.
//

import UIKit
import AuthenticationServices
import hvNetwork

class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?


    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
		checkAppleID()
        guard let _ = (scene as? UIWindowScene) else { return }
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        if let url = URLContexts.first?.url {
            guard url.absoluteString.starts(with: "issuetracker://") else { return }
            if let code = url.absoluteString.split(separator: "=").last.map({ String($0) }) {
                requestAccessToken(code: code)
            }
        }
    }

	private func checkAppleID() {
		let provider = ASAuthorizationAppleIDProvider()
		provider.getCredentialState(forUserID: KeychainItem.currentUserIdentifier) { (credentialState, error) in
			switch credentialState {
			case .authorized:
				break
			case .notFound, .revoked:
				self.configureSignIn()
			default: break
			}
		}
	}
	
	private func configureSignIn() {
		DispatchQueue.main.async {
			self.window?.rootViewController?.showSignInView()
		}
	}
    
    //github login
    func requestAccessToken(code: String) {
        let url = Constant.Github.accessTokenURL
        let clientId = Environment.clientId
        let client_secret = Environment.clientSecret
        let parameter = ["client_id": clientId, "client_secret": client_secret, "code":code]
        
        let headers = ["Accept": "application/json"]
        
        hvNet.request(url, method: .post, parameter: parameter, headers: headers).response { result in
            
            switch result {
            case .success(let data):
                guard let data = data else { return }
                let json = try! JSONSerialization.jsonObject(with: data, options: []) as! [String:Any]
                self.getUserInfo(token: json["access_token"] as! String)
                
            case .failure(let error):
                print(error)
            }
        }
    }
    
    func getUserInfo(token: String) {
        
        let url = Constant.Github.userAPIURL
        let headers = ["Accept":"application/json","Authorization": "token \(token)"]
        
        hvNet.request(url, headers: headers).response { result in
            
            switch result {
            case .success(let data):
                guard let data = data else { return }
                
                guard let object = try? JSONSerialization.jsonObject(with: data, options: []) as? [String:Any] else { return }
                
                guard let userName = object["login"] as? String,
                      let avatorURL = object["avatar_url"] as? String else { return }
                AppData.user = User(name: userName, avatorURL: avatorURL)
                //서버에 요청해서 어세스토큰 받아와서 유저 디포트에 받아오기
            case .failure(let error):
                print(error)
            }
        }
    }
}
