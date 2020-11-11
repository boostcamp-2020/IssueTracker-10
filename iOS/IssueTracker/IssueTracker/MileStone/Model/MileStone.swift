//
//  MileStone.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/11.
//

import Foundation

struct MilestoneResponse: Codable {
	let message: String
	let data: [Milestone]
}

struct Milestone: Codable, Hashable {
	let id: Int
	var title: String
	var description: String?
	var date: String?
	let open: Int?
	let closed: Int?
	let state: Int?
}
