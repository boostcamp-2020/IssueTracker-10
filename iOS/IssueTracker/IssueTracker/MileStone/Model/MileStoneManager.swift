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
		hvNet.request("http://49.50.163.58:3000/api/milestone?state", method: .get, headers: headers).response { (result: HVDataResponse<MilestoneResponse>) in
			switch result {
			case .success(let mileStones):
				completion(mileStones.data)
			case .failure:
				completion([])
			}
		}
	}
}

extension MileStoneManager {
	enum Constant {
		static let token = AppData.token
	}
}
