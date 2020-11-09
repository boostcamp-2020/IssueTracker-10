//
//  IssueListReactor.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/07.
//

import Foundation

class IssueListReactor {
    
    var sideEffect: ((IssueListState)-> Void)?
    
    enum Action {
        case toggleIsEditMode
        case searchIssueTitle(String)
        case clickLabel(String,Bool)
        case requestGetIssueList
        case requestIssueDelete([Issue])
        case requestIssueClose([Issue])
        case checkedFilter(IssueCriteria)
    }
    
    func execute(action: Action, currentState: IssueListState) -> IssueListState {
        switch action {
        case .toggleIsEditMode:
            var state = currentState
            state.isEditting.toggle()
            return state
        case .searchIssueTitle(let text):
            var state = currentState
            state.inputText = text
            return state
        case .clickLabel(let name, let clicked):
            var state = currentState
            let selectedLabel = state.selectedLabelTitle
            selectedLabel.update(name: name, clicked: clicked)
            state.selectedLabelTitle = selectedLabel
            for i in 0..<state.issues.count {
                state.issues[i].setLabelState(name: name, isChecked: clicked)
            }
            return state
        case.checkedFilter(let filter):
            var state = currentState
            state.checkedFilter = filter
            return state
        case .requestGetIssueList:
            IssueManager().get { issues in
                var state = currentState
                state.issues = issues
                self.sideEffect?(state)
            }
            return currentState
        case .requestIssueDelete(let issues):
            var state = currentState
            state.isEditting.toggle()
            IssueManager().delete(with: issues) {
                let _ = self.execute(action: .requestGetIssueList, currentState: state)
            }
            return state
        case .requestIssueClose(let issues):
            var state = currentState
            state.isEditting.toggle()
            IssueManager().close(with: issues) {
                let _ = self.execute(action: .requestGetIssueList, currentState: state)
            }
            return state
        }
    }
}
