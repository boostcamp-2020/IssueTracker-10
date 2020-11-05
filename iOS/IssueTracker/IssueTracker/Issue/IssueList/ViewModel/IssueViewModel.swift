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
    
    var inputText = "" {
        didSet {
            issueApplyToDatasource?(issues, TitleCriteria(input: inputText))
        }
    }
    init() {
        NotificationCenter.default.addObserver(self, selector: #selector(issueDidChanged), name: .issueDidChanged, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(selectedLabelChanged), name: .selectedLabelChanged, object: nil)
        updateIssues()
    }
    
    @objc func selectedLabelChanged() {
        let filter = selectedLabels.labelsTitle
            .map { LabelNameCriteria(name: $0) }
            .reduce( MultiCriteria() , { result, new in
                result.append(new)
                return result
            })
        issueApplyToDatasource?(issues, filter)
    }
    
    @objc func issueDidChanged() {
        updateIssues()
    }
    
    func updateIssues() {
        issueManager.get { [weak self] issues in
            var temp = issues
     
            for i in 0..<temp.count {
                var left = Int.random(in: 0..<tempLabels.count)
                var right = Int.random(in: 0..<tempLabels.count)
                if left > right {
                    swap(&left, &right)
                }
                temp[i].labels += Array(tempLabels[left..<right])
            }
            
            self?.issues = temp
            DispatchQueue.main.async {
                self?.issueApplyToDatasource?(temp, nil)
            }
        }
    }
}
