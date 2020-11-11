//
//  MileStoneViewModel.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/11.
//

import Foundation

class MileStoneViewModel {
	
	let reactor: MileStoneReactor
	var state: MileStoneState
	var updateClosure: ((MileStoneState) -> Void)?
	
	init(reactor: MileStoneReactor, state: MileStoneState) {
		self.reactor = reactor
		self.state = state
		reactor.sideEffect = { state in
			self.state = state
			self.updateClosure?(state)
		}
	}
	
	private func setNotification() {
		NotificationCenter.default.addObserver(self, selector: #selector(createMileStone), name: .mileStoneDidCreated, object: nil)
	}
	
	func requestGetMileStoneList() {
		state = reactor.execute(action: .requestGetMileStoneList, currentState: state)
		updateClosure?(state)
	}
	
	@objc func createMileStone() {
		requestGetMileStoneList()
	}
}
