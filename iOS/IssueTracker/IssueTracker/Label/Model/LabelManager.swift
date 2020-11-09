//
//  LabelManager.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/09.
//

import Foundation
import hvNetwork

class LabelManager {
	
	func get(completion: @escaping (([Label]) -> Void)) {
		let headers = ["Authorization": Constant.token]
		hvNet.request("http://49.50.163.58:3000/api/label", method: .get, headers: headers).response { (result: HVDataResponse<LabelResponse>) in
			switch result {
			case .success(let labels):
				completion(labels.data)
			case .failure:
				completion([])
			}
		}
	}
	
	func create(title: String, content: String?, color: String) {
		let headers = ["Authorization": Constant.token]
		let parameters = ["title": title, "description": content ?? "", "color": color] as Parameters
		hvNet.request("http://49.50.163.58:3000/api/issue/", method: .post, parameter: parameters, headers: headers).response { (result: HVDataResponse<Data?>) in
			switch result {
			case .success:
				NotificationCenter.default.post(name: .issueDidChanged, object: nil)
			case.failure(let error):
				print(error.localizedDescription)
			}
		}
	}
}


extension LabelManager {
	enum Constant {
		static let token = ""
	}
}
