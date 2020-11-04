//
//  LabelCollectionViewCell.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/03.
//

import UIKit

class LabelCollectionViewCell: UICollectionViewCell {

    let label = UILabel()

    override init(frame: CGRect) {
        super.init(frame: frame)

        contentView.backgroundColor = .orange
        label.preferredMaxLayoutWidth = 120
        label.numberOfLines = 1

        contentView.addSubview(label)
        label.translatesAutoresizingMaskIntoConstraints = false
        contentView.layoutMarginsGuide.topAnchor.constraint(equalTo: label.topAnchor).isActive = true
        contentView.layoutMarginsGuide.leadingAnchor.constraint(equalTo: label.leadingAnchor).isActive = true
        contentView.layoutMarginsGuide.trailingAnchor.constraint(equalTo: label.trailingAnchor).isActive = true
        contentView.layoutMarginsGuide.bottomAnchor.constraint(equalTo: label.bottomAnchor).isActive = true
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
