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
	
	func configure(label: Label) {
		let labelColor = label.color.hexStringToUIColor()
		titleLabel.font = UIFont.systemFont(ofSize: 13, weight: .semibold)
		titleLabel.text = label.title
		layoutIfNeeded()
		titleLabel.textColor = labelColor
		titleLabel.addExternalBorder(content: label.title, borderWidth: 1, whiteSpace: 3, borderColor: labelColor)
		detailLabel.text = (label.description ?? "").isEmpty ? "No description" : label.description
	}
	
	override func prepareForReuse() {
		titleLabel.removeExternalBorders()
	}
}
