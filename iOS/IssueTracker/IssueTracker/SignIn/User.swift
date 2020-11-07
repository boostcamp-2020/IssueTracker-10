//
//  User.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/02.
//

import Foundation

struct User: Codable {
	
	static let basic = User(name: "user", avatorURL: nil)
	
	let name: String
    let avatorURL: String?
}
