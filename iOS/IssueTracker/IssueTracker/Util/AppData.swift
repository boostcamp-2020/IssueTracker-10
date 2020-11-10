//
//  AppData.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/03.
//

import Foundation


struct Key {
	static let user = "user"
	static let apply = "apply"
	static let token = "token"
}

struct AppData {
	@Storage(key: Key.user, defaultValue: User.basic)
	static var user: User
	
	@Storage(key: Key.apply, defaultValue: Filters.defaultApplies)
	static var applies: [Bool]
	
	@Storage(key: Key.token, defaultValue: "")
	static var token: String
}
