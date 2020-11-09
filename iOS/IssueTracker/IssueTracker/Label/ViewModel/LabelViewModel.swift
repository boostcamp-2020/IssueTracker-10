//
//  LabelViewModel.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/09.
//

import Foundation

class LabelViewModel {
	let reactor: LabelReactor
	var state: LabelState
	var updateClosure: ((LabelState) -> Void)?
	
	init(reactor: LabelReactor, state: LabelState) {
		self.reactor = reactor
		self.state = state
		reactor.sideEffect = { state in
			self.state = state
			self.updateClosure?(state)
		}
	}
	
	func requestGetLabelList() {
		state = reactor.execute(action: .requestGetLabelList, currentState: state)
		updateClosure?(state)
	}
}
