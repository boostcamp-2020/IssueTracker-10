//
//  MileStoneReactor.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/11.
//

import Foundation

class MileStoneReactor {
	
	var sideEffect: ((MileStoneState)-> Void)?
	
	enum Action {
		case requestGetMileStoneList
		case requestUpdateMileStone(Milestone)
	}
	
	func execute(action: Action, currentState: MileStoneState) -> MileStoneState {
		switch action {
		case .requestGetMileStoneList:
			MileStoneManager().get { (mileStones: [Milestone]) in
				var state = currentState
				state.mileStones = mileStones
				self.sideEffect?(state)
			}
			return currentState
		case .requestUpdateMileStone(let mileStone):
			MileStoneManager().update(with: mileStone) {
				let _ = self.execute(action: .requestGetMileStoneList, currentState: currentState)
			}
			return currentState
		}
	}
}
