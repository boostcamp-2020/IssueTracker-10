//
//  IssueViewModel.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/10/29.
//

import Foundation
import hvNetwork

class IssueViewModel {
    
    let issueManager = IssueManager(issues: IssueFactory.make(count: 8))
    var issueDataSource: (([Issue], IssueCriteria?) -> Void)?
    var issues: [Issue] {
        get { issueManager.issues }
    }
    
    init() {
        NotificationCenter.default.addObserver(self, selector: #selector(issueDidChanged), name: .issueDidChanged, object: nil)
    }
    
    @objc func issueDidChanged() {
        issueDataSource?(issues, OpenCriteria())
    }
}
