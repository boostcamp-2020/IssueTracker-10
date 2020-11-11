//
//  IssueDetailViewModel.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/09.
//

import Foundation

class IssueDetailViewModel {
    
    let reactor: IssueDetailReactor
    var state: IssueDetailState
    var updateClosure: ((IssueDetailState) -> Void)?
        
    init(reactor: IssueDetailReactor, state: IssueDetailState) {
        self.reactor = reactor
        self.state = state
        reactor.sideEffect = { state in
            self.state = state
            self.updateClosure?(state)
        }
        setNotification()
    }
    
    func requestIssueDetail(id: Int) {
        state = reactor.execute(action: .requestIssueDetail(id), currentState: state)
        updateClosure?(state)
    }
    
    func requestIssueComment(id: Int) {
        state = reactor.execute(action: .requestIssueComment(id), currentState: state)
        updateClosure?(state)
    }
    
    private func setNotification() {
        NotificationCenter.default.addObserver(self, selector: #selector(updateCommentCreated), name: .commentDidChanged, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(updateLabelOfIssue), name: .removeLabelOfIssue, object: nil)
    }
    
    @objc private func updateCommentCreated(_ notification: Notification) {
        state = reactor.execute(action: .requestIssueComment(state.issue.id), currentState: state)
        updateClosure?(state)
    }
    
    @objc private func updateLabelOfIssue(_ notification: Notification) {
        guard let object = notification.object as? [String: Any],
              let issueId = object["issueId"] as? Int,
              let labelId = object["labelId"] as? Int else { return }
      
        state = reactor.execute(action: .requestRemoveLabelOfIssue(issueId, labelId), currentState: state)
        updateClosure?(state)
    }
}
