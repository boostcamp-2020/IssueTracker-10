//
//  CollectionHeaderView.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/03.
//

import UIKit

class CollectionHeaderView: UICollectionReusableView {
    
    @IBOutlet weak var title: UILabel!
    @IBOutlet weak var number: UILabel!
    @IBOutlet weak var desc: UILabel!
    @IBOutlet weak var stateView: StateView!
    
    override func awakeFromNib() {
        super.awakeFromNib()
    }
    
    func configure(issue: Issue) {
        title.text = issue.title
        number.text = "#\(issue.id)"
        desc.text = "by \(issue.user.username) \(PastTime().agoTime(from: issue.createdAt))"
        if issue.state == 1 {
            stateView.openView()
        } else {
            stateView.closeView()
        }
    }
}
