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
		}
	}
}
