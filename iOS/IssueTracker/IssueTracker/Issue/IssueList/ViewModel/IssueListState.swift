//
//  IssueListState.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/07.
//

import Foundation

struct IssueListState {
    
    var isEditting: Bool
	var issueCount: Int
	var isShowSelectedAll: Bool
    var issues: [Issue]
    var selectedLabelTitle: SelectedLabelTitle
    var inputText: String
    var filter: IssueCriteria { AndCriteria(criterias: [searchFilter, labelFilter, checkedFilter]) }
    var filteredIssue: [Issue] { return filter.apply(issues: self.issues) }
    var checkedFilter: IssueCriteria
    private var searchFilter: IssueCriteria { return TitleCriteria(input: inputText) }
    private var labelFilter: IssueCriteria {
        return AndCriteria(criterias: selectedLabelTitle.labelsTitle.map { LabelNameCriteria(name: $0) })
    }
    
    init() {
        isEditting = false
        issues = [Issue.empty]
        selectedLabelTitle = SelectedLabelTitle()
        checkedFilter = EmptyCriteria()
        inputText = ""
		issueCount = 0
		isShowSelectedAll = true
    }
}
