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

class TitleCriteria: IssueCriteria {
    
    let inputText: String
    
    init(input: String) {
        inputText = input
    }
    
    func apply(issues: [Issue]) -> [Issue] {
        return issues.filter {
            $0.title.lowercased().contains(inputText.lowercased())
        }
    }
}

class AndCriteria: IssueCriteria {
    
    let left: IssueCriteria
    let right: IssueCriteria
    
    init(left: IssueCriteria, right: IssueCriteria) {
        self.left = left
        self.right = right
    }
    
    func apply(issues: [Issue]) -> [Issue] {
        let leftResult = left.apply(issues: issues)
        return right.apply(issues: leftResult)
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
 
        return Array(Set(leftResult + rightResult))
    }
}
