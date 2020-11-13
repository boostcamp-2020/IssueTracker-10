//
//  Label.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/09.
//

import Foundation

struct LabelResponse: Codable {
	let message: String
	let data: [Label]
}

struct Label: Codable, Hashable {
	let id: Int
	var title: String
	var description: String?
	var color: String
	var state = false
	
	enum CodingKeys : String, CodingKey{
		case id
		case title
		case description
		case color
	}
    
    static func == (lhs: Label, rhs: Label) -> Bool {
        return lhs.id == rhs.id && lhs.state == rhs.state
    }
}
