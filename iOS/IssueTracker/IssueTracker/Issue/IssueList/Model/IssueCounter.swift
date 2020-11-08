//
//  IssueCounter.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/07.
//

import Foundation

class IssueCounter: CustomStringConvertible {
	var description: String {
		if count == 0 {
			return "Issue"
		}
		else {
			return "\(count)개 선택중"
		}
	}
	
	private var count: Int
	
	init() {
		count = 0
	}
	
	func count(_ input: Int) {
		self.count = input
	}
	
	func increase() {
		count += 1
	}
	
	func decrease() {
		count -= 1
	}
}
