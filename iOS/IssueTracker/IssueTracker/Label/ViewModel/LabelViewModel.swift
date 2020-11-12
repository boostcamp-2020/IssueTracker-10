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
		setNotification()
	}
	
	private func setNotification() {
		NotificationCenter.default.addObserver(self, selector: #selector(createLabel), name: .labelDidCreated, object: nil)
		NotificationCenter.default.addObserver(self, selector: #selector(updateLabel), name: .labelDidChanged, object: nil)
		NotificationCenter.default.addObserver(self, selector: #selector(requestDeleteLabel), name: .labelDidDeleted, object: nil)
	}
	
	@objc private func createLabel(_ notification: Notification) {
		requestGetLabelList()
	}
	
	func requestGetLabelList() {
		state = reactor.execute(action: .requestGetLabelList, currentState: state)
		updateClosure?(state)
	}
	
	@objc func requestDeleteLabel(_ notification: Notification) {
		guard let label = notification.userInfo?["label"] as? Label else { return }
		state = reactor.execute(action: .requestDeleteLabel(label), currentState: state)
	}
	
	@objc func updateLabel(_ notification: Notification) {
		guard let label = notification.userInfo?["label"] as? Label else { return }
		state = reactor.execute(action: .requestUpdateLabel(label), currentState: state)
		updateClosure?(state)
	}
}
