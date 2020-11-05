//
//  Issue.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/10/27.
//

import Foundation


struct IssueResponse: Codable {
    let message: String
    let data: [Issue]
}

struct Issue: Codable, Hashable {
    
    static let empty = Issue(id: 0, title: "     ", state: 0, createdAt: "", updatedAt: "", user: Author(id: 0, username: "", avatar: ""), milestone: nil, labels: [], assignees: [])
    
    static func == (lhs: Issue, rhs: Issue) -> Bool {
        return lhs.id == rhs.id
    }
    
    static func > (lhs: Issue, rhs: Issue) -> Bool {
        return lhs.id > rhs.id
    }
    
    func hash(into hasher: inout Hasher) {
        hasher.combine(id)
    }
    
    let id: Int
    let title: String
    var state: Int
    let createdAt: String
    let updatedAt: String
    let user: Author
    let milestone: Milestone?
    var labels: [Label]
    let assignees: [Assignee]
    
    mutating func setlabel(labels: [Label]) {
        self.labels = labels
    }
}

struct Author: Codable, Hashable {
    let id: Int
    let username: String
    let avatar: String
}

struct Milestone: Codable, Hashable {
    let id: Int
    let title: String
}

struct Label: Codable, Hashable {
    let id: Int
    let title: String
    let color: String
}

struct Assignee: Codable, Hashable {
    let id: Int
    let avatar: String
    let username: String
}
