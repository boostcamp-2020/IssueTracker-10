//
//  IssueCollectionViewCell.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/10/27.
//

import UIKit

class IssueCollectionViewCell: UICollectionViewCell {
	@IBOutlet weak var title: UILabel!
	@IBOutlet weak var firstComment: UILabel!
	@IBOutlet weak var milestone: UILabel!
	@IBOutlet weak var issueLabel: UILabel!
	
	override func prepareForReuse() {
		super.prepareForReuse()
		title.text = nil
		firstComment.text = nil
		issueLabel.text = nil
		milestone.text = nil
		issueLabel.removeExternalBorders()
		milestone.removeExternalBorders()
	}
	
	func configure(issue: Issue) {
		setTitle(with: issue.title)
		setDescription(with: issue.description)
        setLabels(issue: issue)
		setMilestone(with: "\(issue.milestoneId)")
	}
	
	private func setTitle(with name: String) {
		title.text = name
	}
	
	private func setDescription(with description: String) {
		firstComment.text = description
	}
	
    private func setLabels(issue: Issue) {
        issue.labels.forEach { setLabel(with: $0, backgroundColor: .systemOrange) }
    }
    
	private func setLabel(with name: String, backgroundColor: UIColor) {
		issueLabel.text = name
		layoutIfNeeded() // layer는 자동으로 안바뀌는 듯 하다
		issueLabel.backgroundColor = backgroundColor
		issueLabel.addExternalBorder(content: name, borderWidth: 4, borderColor: backgroundColor)
	}
	
	private func setMilestone(with name: String) {
		milestone.text = name
		layoutIfNeeded() // layer는 자동으로 안바뀌는 듯 하다		
		milestone.addExternalBorder(content: name, borderWidth: 2, whiteSpace: 2, borderColor: UIColor.systemGray2)
	}
}
