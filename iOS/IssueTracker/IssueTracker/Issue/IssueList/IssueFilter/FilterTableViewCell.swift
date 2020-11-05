//
//  FilterTableViewCell.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/04.
//

import UIKit

class FilterTableViewCell: UITableViewCell {
	
	override func awakeFromNib() {
		super.awakeFromNib()
	}
	
	override func setSelected(_ selected: Bool, animated: Bool) {
		super.setSelected(selected, animated: animated)
		accessoryType = selected ? .checkmark : .none
	}
}
