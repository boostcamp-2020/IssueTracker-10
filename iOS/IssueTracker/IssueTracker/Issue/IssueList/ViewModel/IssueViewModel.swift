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
	var criteriaFromFilterView: IssueCriteria = EmptyCriteria()
    var combineFilter: IssueCriteria {
        get {
            let selected = self.criteriaFromFilterView
            let title = TitleCriteria(input: inputText)
            let labels = selectedLabels.labelsTitle.map { LabelNameCriteria(name: $0) }
            return AndCriteria(criterias: [selected, title, AndCriteria(criterias: labels)])
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
		let combineCriterias = AndCriteria(criterias: filters)
		criteriaFromFilterView = combineCriterias
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
