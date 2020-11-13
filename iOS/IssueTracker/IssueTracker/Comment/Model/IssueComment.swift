//
//  IssueComment.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/09.
//

import Foundation

struct IssueCommentResponse: Decodable{
    let message: String
    let data: [IssueComment]
}

struct IssueComment: Decodable, Hashable {
	static func == (lhs: IssueComment, rhs: IssueComment) -> Bool {
		return lhs.id == rhs.id
	}
	
    let id: Int
    let content: String
    let createdAt: String
    let updatedAt: String
    let user: Author
}
