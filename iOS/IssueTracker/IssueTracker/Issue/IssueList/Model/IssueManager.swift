//
//  IssueManager.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/10/27.
//

import Foundation

class IssueManager {
	
    var issues: [Issue]
    
    init(issues: [Issue]) {
        self.issues = issues
    }
    
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
