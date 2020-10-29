//
//  IssueManager.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/10/27.
//

import Foundation

class IssueManager {
	
	var issues: [Issue] = [
		Issue(id: 1, title: "first제목이 미친듯이 길면 안되나보네 그러면 이거는", author: 1, state: 1, milestoneId: 11111111, createdAt: Date(), updatedAt: Date(), description: "firstDescription", labels: ["firstLabel"]),
		Issue(id: 2, title: "second", author: 2, state: 1, milestoneId: 2222222, createdAt: Date(), updatedAt: Date(), description: "secondDescription\n이건좀 길지 않나요 점점점으로 표시가 될까요 알아맞춰보세요 딩동댕동", labels: ["secondLabel"]),
		Issue(id: 3, title: "레이블 목록 보기 구현", author: 3, state: 1, milestoneId: 33333333, createdAt: Date(), updatedAt: Date(), description: "레이블 전체목록을 볼 수 있어야 한다.\n2줄까지 보입니다.\n이건 안보여", labels: ["feature"]),
		Issue(id: 4, title: "iOS는 뭘 할까요", author: 4, state: 1, milestoneId: 44444444, createdAt: Date(), updatedAt: Date(), description: "DiffableDataSource\n너무 어려워요", labels: ["iOS"]),
		Issue(id: 5, title: "Web은 뭘 할까요", author: 5, state: 1, milestoneId: 555, createdAt: Date(), updatedAt: Date(), description: "웹은 잘 몰라요", labels: ["Web"]),
		Issue(id: 6, title: "스크롤을위해1", author: 6, state: 1, milestoneId: 66666, createdAt: Date(), updatedAt: Date(), description: "No description", labels: ["feature1"]),
		Issue(id: 7, title: "스크롤을위해2", author: 7, state: 1, milestoneId: 77777, createdAt: Date(), updatedAt: Date(), description: "No description\nNo descriptoin", labels: ["feature2"]),
		Issue(id: 8, title: "스크롤을위해3", author: 8, state: 1, milestoneId: 8888888, createdAt: Date(), updatedAt: Date(), description: "이슈가 너무 많네요", labels: ["feature3"])
	]
	
	func closed() -> [Issue] {
		return issues.filter { $0.state == 0 }
	}
	
	func opened() -> [Issue] {
		return issues.filter{ $0.state == 1 }
	}
	
	func delete(at index: Int) {
		issues.remove(at: index)
	}
	
	func close(with id: Int) {
		guard let issue = find(with: id) else { return }
		close(with: issue)
	}
	
	func close(with issue: Issue) {
		issue.state = 0
	}
	
	func find(with id: Int) -> Issue? {
		return issues.first(where: { $0.id == id })
	}
}
