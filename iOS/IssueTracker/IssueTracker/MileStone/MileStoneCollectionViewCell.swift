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
	
	func configure(mileStone: Milestone) {
		titleLabel.text = mileStone.title
		descriptionLabel.text = mileStone.description
	}
}
