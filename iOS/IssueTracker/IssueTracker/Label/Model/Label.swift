//
//  Label.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/09.
//

import Foundation

struct Label: Codable, Hashable {
	let id: Int
	let title: String
	let description: String?
	let color: String
	var state = false
	
	enum CodingKeys : String, CodingKey{
		case id
		case title
		case description
		case color
	}
}
