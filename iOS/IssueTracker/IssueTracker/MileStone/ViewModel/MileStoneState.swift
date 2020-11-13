//
//  MileStoneState.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/11.
//

import Foundation

class MileStoneState {
	var mileStones: [Milestone] {
		didSet {
			mileStones = setFormattedDate(with: mileStones)
		}
	}
	
	init() {
		mileStones = []
	}
	
	func setFormattedDate(with mileStones: [Milestone]) -> [Milestone] {
		return mileStones.map { Milestone(id: $0.id, title: $0.title, description: $0.description, date: formattedDate(with: $0.date), open: $0.open, closed: $0.closed, state: $0.state) }
	}
	
	private func formattedDate(with dateString: String?) -> String? {
		guard let dateString = dateString else { return nil }
		let dateFormatter = DateFormatter()
		dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
		dateFormatter.locale = Locale(identifier: "ko_KR")
		guard let date = dateFormatter.date(from: dateString) else { return nil }
		
		let calendar = Calendar.current
		let components = calendar.dateComponents([.year, .month, .day], from: date)
		guard let year = components.year, let month = components.month, let day = components.day else { return nil }
		return "\(year)-\(month)-\(day)"
	}
}
