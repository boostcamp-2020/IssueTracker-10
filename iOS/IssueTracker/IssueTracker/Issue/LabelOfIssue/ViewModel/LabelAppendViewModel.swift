//
//  LabelAppendViewModel.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/12.
//

import Foundation

class LabelAppendViewModel {
    
    let reactor: LabelAppendReactor
    var state: LabelAppendState
    var updateClosure: ((LabelAppendState) -> Void)?
        
    init(reactor: LabelAppendReactor, state: LabelAppendState) {
        self.reactor = reactor
        self.state = state
        reactor.sideEffect = { state in
            self.state = state
            self.updateClosure?(state)
        }
        setNotification()
    }
    
    func requestGetAllLabel() {
        state = reactor.execute(action: .requestLabelAll, currentState: state)
        updateClosure?(state)
    }
    
    func requestAppendLabel(issueId: Int, labelId: Int) {
        state = reactor.execute(action: .requestAppendLabel(issueId, labelId), currentState: state)
        updateClosure?(state)
    }
    
    private func setNotification() {
        NotificationCenter.default.addObserver(self, selector: #selector(updateIssueCreated), name: .issueDidChanged, object: nil)
    }
    
    @objc func updateIssueCreated() {
        state = reactor.execute(action: .requestIssueDetail(state.issueId), currentState: state)
        updateClosure?(state)
    }
}
