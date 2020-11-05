//
//  IssueListViewCell.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/04.
//

import UIKit

class IssueListViewCell: UICollectionViewCell {

    @IBOutlet weak var infoImage: UIImageView!
    @IBOutlet weak var title: UILabel!
    @IBOutlet weak var desc: UILabel!
    @IBOutlet weak var containerView: UIView!
    @IBOutlet weak var labelListView: LabelListView!
    
    override func awakeFromNib() {
        super.awakeFromNib()
    }
    
    func configure(issue: Issue) {
        dropShadow()
        self.layer.cornerRadius = 10
        title.text = issue.title
        desc.text = "#\(issue.id) 2 days ago opened by \(issue.user.username)"
        labelListView.labels = issue.labels
        if issue.state == 0 {
            infoImage.image = UIImage(systemName: "checkmark.circle")
            infoImage.tintColor = .systemRed
        }
    }
    
    private func dropShadow() {
        containerView.layer.cornerRadius = 10
        containerView.layer.shadowColor = UIColor.systemGray.cgColor
        containerView.layer.shadowOpacity = 1
        containerView.layer.shadowOffset = .zero
        containerView.layer.shadowRadius = 1
        containerView.layer.shouldRasterize = true
    }

    override func prepareForReuse() {
        title.text = ""
        desc.text = ""
        infoImage.image = UIImage(systemName: "info.circle")
        infoImage.tintColor = .systemBlue
        labelListView.prepareForReuse()
    }
}
