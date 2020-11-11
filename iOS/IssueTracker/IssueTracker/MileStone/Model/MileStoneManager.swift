//
//  MileStoneManager.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/11.
//

import Foundation
import hvNetwork

class MileStoneManager {
	
	func get(completion: @escaping (([Milestone]) -> Void)) {
		let headers = ["Authorization": Constant.token]
		hvNet.request("http://49.50.163.58:3000/api/milestone?state=1", method: .get, headers: headers).response { (result: HVDataResponse<MilestoneResponse>) in
			switch result {
			case .success(let mileStones):
				completion(mileStones.data)
			case .failure:
				completion([])
			}
		}
	}
	
	func create(title: String, description: String?, date: String?) {
		let headers = ["Authorization": Constant.token]
		let parameters = ["title": title, "description": description ?? "No description", "date": date] as Parameters
		hvNet.request("http://49.50.163.58:3000/api/milestone/", method: .post, parameter: parameters, headers: headers).response { (result: HVDataResponse<Data?>) in
			switch result {
			case .success:
				NotificationCenter.default.post(name: .mileStoneDidCreated, object: nil)
			case.failure(let error):
				print(error.localizedDescription)
			}
		}
	}
}

extension MileStoneManager {
	enum Constant {
		static let token = AppData.token
	}
}
