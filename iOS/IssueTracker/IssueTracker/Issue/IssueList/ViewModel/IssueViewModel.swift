//
//  IssueViewModel2.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/07.
//

import Foundation

class IssueListViewModel {
    
    let reactor: IssueListReactor
    var state: IssueListState
    var updateClosure: ((IssueListState) -> Void)?
        
    init(reactor: IssueListReactor, state: IssueListState) {
        self.reactor = reactor
        self.state = state
        reactor.sideEffect = { state in
            self.state = state
            self.updateClosure?(state)
        }
        setNotification()
    }
    
    func update(searchInput text: String) {
        state = reactor.execute(action: .searchIssueTitle(text), currentState: state)
        updateClosure?(state)
    }
    
    func requestGetIssueList() {
        state = reactor.execute(action: .requestGetIssueList, currentState: state)
        updateClosure?(state)
    }
    
    func requestDelete(issues: [Issue]) {
        state = reactor.execute(action: .requestIssueDelete(issues), currentState: state)
        updateClosure?(state)
    }
    
    func requestClose(issues: [Issue]) {
        state = reactor.execute(action: .requestIssueClose(issues), currentState: state)
        updateClosure?(state)
    }
    
    func updateIsEditModeToggle() {
        state = reactor.execute(action: .toggleIsEditMode, currentState: state)
        updateClosure?(state)
    }
	
	func updateIssueCount(count: Int) {
		state = reactor.execute(action: .changeIssueCount(count), currentState: state)
		updateClosure?(state)
	}
	
	func updateSelectedAllMode() {
		state = reactor.execute(action: .updateShowSelectedAll, currentState: state)
		updateClosure?(state)
	}
    
    private func setNotification() {
        NotificationCenter.default.addObserver(self, selector: #selector(updateSelectedLabel), name: .labelDidToggled, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(updateSelectedFilter), name: .filterDidchanged, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(updateIssueCreated), name: .issueDidChanged, object: nil)
    }
    
    @objc private func updateIssueCreated(_ notification: Notification) {
        state = reactor.execute(action: .requestGetIssueList, currentState: state)
        updateClosure?(state)
    }
    
    @objc private func updateSelectedFilter(_ notification: Notification) {
        guard let filters = notification.userInfo?["filters"] as? [IssueCriteria] else { return }
        let combine = AndCriteria(criterias: filters)
        state = reactor.execute(action: .checkedFilter(combine), currentState: state)
        updateClosure?(state)        
    }
    
    @objc private func updateSelectedLabel(_ notification: Notification) {
        guard let object = notification.object as? [String: Any],
              let name = object["title"] as? String,
              let clicked = object["clicked"] as? Bool else { return }
        state = reactor.execute(action: .clickLabel(name, clicked), currentState: state)
        updateClosure?(state)
    }
}
