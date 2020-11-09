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
	
	func configure(title: String, detail: String, color: String) {
		let labelColor = color.hexStringToUIColor()
		titleLabel.font = UIFont.systemFont(ofSize: 13, weight: .semibold)
		titleLabel.text = title
		layoutIfNeeded()
		titleLabel.textColor = labelColor
		titleLabel.addExternalBorder(content: title, borderWidth: 1, whiteSpace: 3, borderColor: labelColor)
		detailLabel.text = detail
	}
	
	override func prepareForReuse() {
		titleLabel.removeExternalBorders()
	}
}
