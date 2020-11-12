//
//  IssueDetailCell.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/03.
//

import UIKit

class IssueDetailCell: UICollectionViewCell {

    @IBOutlet weak var header: IssueDetailCellHeader!
    @IBOutlet weak var content: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        header.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            header.widthAnchor.constraint(equalToConstant: UIScreen.main.bounds.size.width)
        ])
        self.backgroundColor = .systemBackground
    }

    func configure(comment: IssueComment) {
        content.text = comment.content
        header.configure(comment: comment)
    }
    
    override func prepareForReuse() {
        content.text = ""
        header.prepareforResue()
    }
}
