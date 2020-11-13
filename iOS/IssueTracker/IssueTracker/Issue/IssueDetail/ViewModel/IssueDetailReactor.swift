//
//  IssueDetailReactor.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/09.
//

import Foundation

class IssueDetailReactor {
    
    var sideEffect: ((IssueDetailState)-> Void)?

    enum Action {
        case requestIssueDetail(Int)
        case requestIssueComment(Int)
        case requestRemoveLabelOfIssue(Int, Int)
    }
    
    @discardableResult
    func execute(action: Action, currentState: IssueDetailState) -> IssueDetailState {
        switch action {
        case .requestIssueDetail(let id):
            IssueManager().getIssueDetail(id: id) { issue in
                var state = currentState
                state.issue = issue
                let _ = self.execute(action: .requestIssueComment(id), currentState: state)
            }
            return currentState
        case .requestIssueComment(let id):
            IssueManager().getIssueComment(id: id) { comments in
                var state = currentState
                state.comments = comments
                self.sideEffect?(state)
            }
            return currentState
        case .requestRemoveLabelOfIssue(let issueId, let labelId):
            IssueManager().removeLabelOfIssue(issueId: issueId, labelId: labelId) {
                let id = currentState.issue.id
                NotificationCenter.default.post(name: .removeLabelOfIssueDone, object: nil)
                self.execute(action: .requestIssueDetail(id), currentState: currentState)
            }
            return currentState
        }
    }

    
}
