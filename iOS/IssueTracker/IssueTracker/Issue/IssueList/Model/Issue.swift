//
//  Issue.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/10/27.
//

import Foundation


struct IssueResponse: Codable {
    
    let message: String
    let data: IssueDataResponse
}

struct IssueDataResponse: Codable {
   
    let closedCount: Int
    let openCount: Int
    let issues: [Issue]
}

struct Issue: Codable, Hashable {
    
    static let empty = Issue(id: 0, title: "     ", state: 0, createdAt: "", updatedAt: "", user: Author(id: 0, username: "", avatar: ""), milestone: nil, labels: [], assignees: [])
    let id: Int
    let title: String
    var state: Int
    let createdAt: String
    let updatedAt: String
    let user: Author
    let milestone: Milestone?
    var labels: [Label]
    let assignees: [Assignee]
    
    mutating func setLabelState(name: String, isChecked: Bool) {
        var idx: Int?
        for i in 0..<labels.count {
            if labels[i].title == name {
                labels[i].state = isChecked
                idx = i
            }
        }
        if let idx = idx, isChecked && labels.count > 1{
            let picked = labels.remove(at: idx)
            if let first = labels.first(where: { !$0.state }) {
                let insertIdx = Int(labels.firstIndex(of: first) ?? 0)
                labels.insert(picked, at: insertIdx)
            } else {
                labels.append(picked)
            }
        }
    }
    
    static func > (lhs: Issue, rhs: Issue) -> Bool {
        return lhs.id > rhs.id
    }
}

struct Author: Codable, Hashable {
    let id: Int
    let username: String
    let avatar: String?
}

struct Assignee: Codable, Hashable {
    let id: Int
    let avatar: String?
    let username: String
}
