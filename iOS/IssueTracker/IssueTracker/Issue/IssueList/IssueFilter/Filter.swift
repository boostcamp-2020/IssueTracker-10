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
	var isApply: Bool
}

class Filters {
	static var defaultApplies = [true,true,false,false,false]
	
	var contents: [Filter] = [
		Filter(criteria: OpenCriteria(), description: "열린 이슈들", isApply: false),
		Filter(criteria: CloseCriteria(), description: "닫힌 이슈들", isApply: false),
		Filter(criteria: AuthorCriteria(name: AppData.user.name), description: "내가 작성한 이슈들", isApply: false),
		Filter(criteria: AssignedCriteria(name: AppData.user.name), description: "나한테 할당된 이슈들", isApply: false),
		Filter(criteria: CommentCriteria(), description: "내가 댓글을 남긴 이슈들", isApply: false)
	]
	
	func changeApplies() {
		for index in 0..<contents.count {
			contents[index].isApply = AppData.applies[index]
		}
	}
}
