//
//  LabelAppendReactor.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/12.
//

import Foundation

class LabelAppendReactor {

    var sideEffect: ((LabelAppendState)-> Void)?
    
    enum Action {
        case requestLabelAll
        case requestAppendLabel(Int, Int)
        case requestIssueDetail(Int)
    }
    
    func execute(action: Action, currentState: LabelAppendState) -> LabelAppendState {
        switch action {
        case .requestLabelAll:
            LabelManager().get(completion: { labels in
                var state = currentState
                state.totalLabels = labels
                self.sideEffect?(state)
            })
            return currentState
        case .requestAppendLabel(let issueId, let labelId):
            IssueManager().appendLabelOfIssue(issueId: issueId, labelId: labelId, completion: {
                NotificationCenter.default.post(name: .issueDidChanged, object: nil)
            })
            return currentState
        case .requestIssueDetail(let id):
            IssueManager().getIssueDetail(id: id, completion: { issueDetail in
                var state = currentState
                state.issueDetail = issueDetail
                self.sideEffect?(state)
            })
            return currentState
        }
    }
}
