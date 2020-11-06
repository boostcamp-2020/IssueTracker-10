//
//  Criteria.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/10/28.
//

import Foundation

protocol IssueCriteria {
    
    func apply(issues: [Issue]) -> [Issue]
}

class CloseCriteria: IssueCriteria {
    
    func apply(issues: [Issue]) -> [Issue] {
        return issues.filter { $0.state == 0 }
    }
}

class OpenCriteria: IssueCriteria {
    
    func apply(issues: [Issue]) -> [Issue] {
        return issues.filter { $0.state == 1 }
    }
}

class AuthorCriteria: IssueCriteria {
	
	let author: Author
	
	init(author: Author) {
		self.author = author
	}
	
	func apply(issues: [Issue]) -> [Issue] {
		return issues.filter { $0.user == author }
	}
}

class AssignedCriteria: IssueCriteria {
	
	let assignee: Assignee
	
	init(assignee: Assignee) {
		self.assignee = assignee
	}
	
	func apply(issues: [Issue]) -> [Issue] {
		return issues.filter { $0.assignees.contains(assignee) }
	}
}

class CommentCriteria: IssueCriteria {
	
	func apply(issues: [Issue]) -> [Issue] {
		//로직 추가하기
		return issues
	}
}

class TitleCriteria: IssueCriteria {
    
    let inputText: String
    
    init(input: String) {
        inputText = input
    }
    
    func apply(issues: [Issue]) -> [Issue] {
        return issues.filter {
            $0.title.lowercased().contains(inputText.lowercased()) || inputText == ""
        }
    }
}

class AndCriteria: IssueCriteria {
	
	let criterias: [IssueCriteria]
	
	init(criterias: [IssueCriteria]) {
		self.criterias = criterias
	}
	
	func apply(issues: [Issue]) -> [Issue] {
		criterias.reduce(issues) { $1.apply(issues: $0) }
	}
}

class OrCriteria: IssueCriteria {
    
    let left: IssueCriteria
    let right: IssueCriteria
    
    init(left: IssueCriteria, right: IssueCriteria) {
        self.left = left
        self.right = right
    }
    
    func apply(issues: [Issue]) -> [Issue] {
        
        let leftResult = left.apply(issues: issues)
        let rightResult = right.apply(issues: issues)
        return Array(Set(leftResult + rightResult)).sorted(by: >)
    }
}

class LabelNameCriteria: IssueCriteria {
    
    let name: String
    
    init(name: String) {
        self.name = name
    }
    
    func apply(issues: [Issue]) -> [Issue] {
        return issues.filter { $0.labels.filter{ $0.title == name }.count > 0  }
    }
}

class EmptyCriteria: IssueCriteria {
    
    func apply(issues: [Issue]) -> [Issue] {
        return issues
    }
}
