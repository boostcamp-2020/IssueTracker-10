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
		descriptionLabel.text = mileStone.description
		dateLabel.text = mileStone.date
		openCountLabel.text = "\(mileStone.open ?? 0)"
		closeCountLabel.text = "\(mileStone.closed ?? 0)"
		progressLabel.text = "\(calculateProgress(open: mileStone.open, close: mileStone.closed))%"
	}
	
	private func calculateProgress(open: Int?, close: Int?) -> Int {
		guard let open = open, let close = close else { return 0}
		let percentage: Double = Double(close / (open + close))
		return Int(ceil(percentage * 100))
	}
}
