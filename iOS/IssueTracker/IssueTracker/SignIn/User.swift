//
//  User.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/02.
//

import Foundation

struct User: Codable {
	
	enum Key: String {
		case user = "user"
	}
	
	static let basic = User(name: "user", avatorURL: nil)
	
	let name: String
    let avatorURL: String?
}
