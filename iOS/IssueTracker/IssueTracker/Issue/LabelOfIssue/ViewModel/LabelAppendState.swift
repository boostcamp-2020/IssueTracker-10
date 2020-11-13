//
//  LabelAppendState.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/12.
//

import Foundation

struct LabelAppendState {
    
    var issueDetail: IssueDetail
    var totalLabels: [Label]
    var filteredLabel: [Label] {
        get {
            return totalLabels.filter{ !issueDetail.labels.contains($0) }
        }
    }
    var issueId: Int {
        get { issueDetail.id }
    }
    
    init() {
        totalLabels = []
        issueDetail = IssueDetail(issue: Issue.empty)
    }
}
