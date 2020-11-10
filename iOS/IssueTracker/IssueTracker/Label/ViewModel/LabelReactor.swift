//
//  LabelReactor.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/09.
//

import Foundation

class LabelReactor {
	
	var sideEffect: ((LabelState)-> Void)?
	
	enum Action {
		case requestGetLabelList
		case requestUpdateLabel(Label)
	}
	
	func execute(action: Action, currentState: LabelState) -> LabelState {
		switch action {
		case .requestGetLabelList:
			LabelManager().get { (labels: [Label]) in
				var state = currentState
				state.labels = labels
				self.sideEffect?(state)
			}
			return currentState
		case .requestUpdateLabel(let label):
			LabelManager().update(with: label) {
				let _ = self.execute(action: .requestGetLabelList, currentState: currentState)
			}
			return currentState
		}
	}
}
