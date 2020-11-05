//
//  FilterContent.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/04.
//

import Foundation

struct Filter: Hashable {
	static func == (lhs: Filter, rhs: Filter) -> Bool {
		return lhs.description == rhs.description
	}
	
	func hash(into hasher: inout Hasher) {
		return hasher.combine(description)
	}
	
	let criteria: IssueCriteria
	let description: String
}

struct Filters {
	
	let contents: [Filter] = [
		Filter(criteria: OpenCriteria(), description: "열린 이슈들"),
		Filter(criteria: CloseCriteria(), description: "닫힌 이슈들"),
		Filter(criteria: AuthorCriteria(author: Author(id: 1, username: "me", avatar: "noAavtar")), description: "내가 작성한 이슈들"),
		Filter(criteria: AssignedCriteria(assignee: Assignee(id: 1, avatar: "me", username: "noAvatar")), description: "나한테 할당된 이슈들"),
		Filter(criteria: CommentCriteria(), description: "내가 댓글을 남긴 이슈들")
	]
	
}
