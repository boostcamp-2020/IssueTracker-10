//
//  AppData.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/03.
//

import Foundation

struct AppData {
	@Storage(key: User.Key.user.rawValue, defaultValue: User.basic)
	static var user: User
}
