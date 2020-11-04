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
	var filter: IssueCriteria = OpenCriteria()
    
    init() {
        NotificationCenter.default.addObserver(self, selector: #selector(issueDidChanged), name: .issueDidChanged, object: nil)
		NotificationCenter.default.addObserver(self, selector: #selector(filterDidchanged), name: .filterDidchanged, object: nil)
		updateIssues(filter: nil)
    }
    
	@objc func filterDidchanged(_ notification: Notification) {
		guard let filters = notification.userInfo?["filters"] as? [IssueCriteria] else { return }
		let combineCriterias = CombineCriteria(criterias: filters)
		filter = combineCriterias
		updateIssues(filter: filter)
	}
	
    @objc func issueDidChanged() {
        updateIssues(filter: filter)
    }
    
	func updateIssues(filter: IssueCriteria?) {
        issueManager.get { [weak self] issues in
            self?.issues = issues
            DispatchQueue.main.async {
                self?.issueDataSource?(issues, filter)
            }
        }
    }
}
