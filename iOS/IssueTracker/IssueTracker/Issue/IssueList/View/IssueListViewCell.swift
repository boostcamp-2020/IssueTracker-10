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
        self.layer.cornerRadius = 10
        containerView.layer.borderWidth = 2
        containerView.layer.borderColor =
            UIColor(red: 0.8, green: 0.8, blue: 0.8, alpha: 0.4).cgColor
        containerView.layer.cornerRadius = 10
        title.text = issue.title
        desc.text = "#\(issue.id) opened \(PastTime().agoTime(from: issue.createdAt)) by \(issue.user.username)"
        labelListView.labels = issue.labels

        if issue.state == 0 {
            infoImage.image = UIImage(systemName: "checkmark.circle")
            infoImage.tintColor = .systemRed
        }
    }
 
    override func prepareForReuse() {
        title.text = ""
        desc.text = ""
        infoImage.image = UIImage(systemName: "info.circle")
        infoImage.tintColor = .systemBlue
        labelListView.prepareForReuse()
    }
}
