//
//  Issue.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/10/27.
//

import Foundation

struct Issue: Hashable {
	let id: Int
	let title: String
	let author: Int
	let state: Int
	let milestoneId: Int
	let createdAt: Date
	let updatedAt: Date
	
	let description: String // firstComment
	let labels: [String]
}
