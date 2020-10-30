//
//  Issue.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/10/27.
//

import Foundation

class Issue: Hashable {
	static func == (lhs: Issue, rhs: Issue) -> Bool {
		return lhs.id == rhs.id
	}
	
	func hash(into hasher: inout Hasher) {
		hasher.combine(id)
	}
	
	let id: Int
	let title: String
	let author: Int
	var state: Int
	let milestoneId: Int
	let createdAt: Date
	let updatedAt: Date
	
	let description: String // firstComment
	let labels: [String]
	
	init(id: Int, title: String, author: Int, state: Int, milestoneId: Int, createdAt: Date, updatedAt: Date, description: String, labels: [String]) {
		self.id = id
		self.title = title
		self.author = author
		self.state = state
		self.milestoneId = milestoneId
		self.createdAt = createdAt
		self.updatedAt = updatedAt
		self.description = description
		self.labels = labels
	}
}
