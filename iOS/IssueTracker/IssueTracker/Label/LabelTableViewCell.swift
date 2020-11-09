//
//  LabelTableViewCell.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/09.
//

import UIKit

class LabelTableViewCell: UITableViewCell {
	
	@IBOutlet weak var detailLabel: UILabel!
	@IBOutlet weak var titleLabel: UILabel!
	
	override func awakeFromNib() {
		super.awakeFromNib()
	}
	
	override func setSelected(_ selected: Bool, animated: Bool) {
		super.setSelected(selected, animated: animated)
	}
	
	func configure(title: String, detail: String) {
		titleLabel.text = title
		detailLabel.text = detail
	}
}
