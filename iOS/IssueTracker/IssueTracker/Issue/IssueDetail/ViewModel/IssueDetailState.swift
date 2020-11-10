//
//  IssueDetailState.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/09.
//

import Foundation

struct IssueDetailState {
    var issue: IssueDetail
    var comments: [IssueComment]
    
    init(issue: Issue) {
        self.issue = IssueDetail(issue: issue)
        comments = []
    }
}
