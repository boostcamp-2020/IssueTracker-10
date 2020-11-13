//
//  MileStoneCollectionViewCell.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/11.
//

import UIKit

class MileStoneCollectionViewCell: UICollectionViewCell {
	
	@IBOutlet weak var titleLabel: UILabel!
	@IBOutlet weak var descriptionLabel: UILabel!
	@IBOutlet weak var dateLabel: UILabel!
	@IBOutlet weak var progressLabel: UILabel!
	@IBOutlet weak var openCountLabel: UILabel!
	@IBOutlet weak var closeCountLabel: UILabel!
	
	func configure(mileStone: Milestone) {
		titleLabel.text = mileStone.title
		layoutIfNeeded()
		titleLabel.addExternalBorder(content: mileStone.title, borderWidth: 1, whiteSpace: 3, borderColor: UIColor(named: "YearColor"))		
		descriptionLabel.text = mileStone.description
		dateLabel.text = prettyPrintedDate(with: mileStone.date)
		openCountLabel.text = "\(mileStone.open ?? 0) opened"
		closeCountLabel.text = "\(mileStone.closed ?? 0) closed"
		progressLabel.text = "\(calculateProgress(open: mileStone.open, close: mileStone.closed))%"
	}
	
	private func calculateProgress(open: Int?, close: Int?) -> Int {
		guard let open = open, let close = close, (open + close) != 0 else { return 0}
		let percentage: Double = Double(close) / Double(open + close) * 100
		return Int(floor(percentage))
	}
	
	private func prettyPrintedDate(with dateString: String?) -> String? {
		guard let dateString = dateString else { return nil }
		let dateFormatter = DateFormatter()
		dateFormatter.dateFormat = "yyyy-MM-dd"
		dateFormatter.locale = Locale(identifier: "ko_KR")
		guard let date = dateFormatter.date(from: dateString) else { return nil }
		
		let calendar = Calendar.current
		let components = calendar.dateComponents([.year, .month, .day], from: date)
		guard let year = components.year, let month = components.month, let day = components.day else { return nil }
		return "\(year)년\(month)월\(day)일 까지"
	}
	
	override func prepareForReuse() {
		titleLabel.text = nil
		descriptionLabel.text = nil
		dateLabel.text = nil
		progressLabel.text = nil
		openCountLabel.text = nil
		closeCountLabel.text = nil
		titleLabel.removeExternalBorders()
	}
}
