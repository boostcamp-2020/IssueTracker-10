//
//  IssueDetail.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/09.
//

import Foundation

struct IssueDetailResponse: Decodable {
    let message: String
    let data: IssueDetail
}

struct IssueDetail: Decodable {
    let id: Int
    let title: String
    var state: Int
    let createdAt: String
    let user: DetailAuthor
    let milestone: Milestone?
    var labels: [Label]
    let assignees: [Assignee]
    let commentCount: Int
    
    init(issue: Issue) {
        self.id = issue.id
        self.title = issue.title
        self.state = issue.state
        self.createdAt = issue.createdAt
        self.user = DetailAuthor(id: issue.user.id, username: issue.user.username)
        self.milestone = issue.milestone
        self.labels = issue.labels
        self.assignees = issue.assignees
        self.commentCount = 0
    }
}

struct DetailAuthor: Decodable {
    let id: Int
    let username: String
}
