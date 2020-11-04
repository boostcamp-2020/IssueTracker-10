//
//  IssueViewModel.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/10/29.
//

import Foundation
import hvNetwork

class IssueViewModel {
    
    let issueManager = IssueManager()
    var issueDataSource: (([Issue], IssueCriteria? ) -> Void)?
    var issues: [Issue] = [Issue.empty]
    
    init() {
        NotificationCenter.default.addObserver(self, selector: #selector(issueDidChanged), name: .issueDidChanged, object: nil)
        updateIssues()
    }
    
    @objc func issueDidChanged() {
        updateIssues()
    }
    
    func updateIssues() {
        issueManager.get { [weak self] issues in
            self?.issues = issues
            DispatchQueue.main.async {
                self?.issueDataSource?(issues, nil)
            }
        }
    }
}
