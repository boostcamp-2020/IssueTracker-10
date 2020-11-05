//
//  IssueViewModel.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/10/29.
//

import Foundation
import hvNetwork

let tempLabels = [Label(id: 0, title: "backend", color: "#111111"),
                  Label(id: 0, title: "document", color: "#fd3887"),
                  Label(id: 0, title: "review request", color: "#bd3d21"),
                  Label(id: 0, title: "frontend", color: "#ce12aa"),
                  Label(id: 0, title: "refactoring", color: "#bd3d21"),
                  ]

class IssueViewModel {
    
    let issueManager = IssueManager()
    var issueApplyToDatasource: (([Issue], IssueCriteria? ) -> Void)?
    var issues: [Issue] = [Issue.empty]
    var selectedLabels = SelectedLabels.shared
	var filter: IssueCriteria = OrCriteria(left: OpenCriteria(), right: CloseCriteria())
    var combineFilter: IssueCriteria {
        get {
            let filter1 = self.filter
            let filter2 = TitleCriteria(input: inputText)
            let filter3 = selectedLabels.labelsTitle
                .map { LabelNameCriteria(name: $0) }
                .reduce( MultiCriteria() , { result, new in
                    result.append(new)
                    return result
                })
            return CombineCriteria(criterias: [filter1, filter2, filter3])
        }
    }
    var inputText = "" {
        didSet {
            updateIssues()
        }
    }
    init() {
        NotificationCenter.default.addObserver(self, selector: #selector(issueDidChanged), name: .issueDidChanged, object: nil)
		NotificationCenter.default.addObserver(self, selector: #selector(filterDidchanged), name: .filterDidchanged, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(selectedLabelChanged), name: .selectedLabelChanged, object: nil)
        updateIssues()
    }
    
	@objc func filterDidchanged(_ notification: Notification) {
		guard let filters = notification.userInfo?["filters"] as? [IssueCriteria] else { return }
		let combineCriterias = CombineCriteria(criterias: filters)
		filter = combineCriterias
		updateIssues()
	}
	
    @objc func selectedLabelChanged() {
        updateIssues()
    }
    
    @objc func issueDidChanged() {
        updateIssues()
    }
    
	func updateIssues() {
        issueManager.get { [weak self] issues in
            guard let self = self else { return }
            self.issues = issues
            DispatchQueue.main.async {
                self.issueApplyToDatasource?(self.issues, self.combineFilter)
            }
        }
    }
}
