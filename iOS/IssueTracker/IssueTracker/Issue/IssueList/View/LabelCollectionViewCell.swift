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

        label.font = UIFont.systemFont(ofSize: 13, weight: .semibold)
        label.preferredMaxLayoutWidth = 120
        label.numberOfLines = 1
        label.translatesAutoresizingMaskIntoConstraints = false

        contentView.addSubview(label)
        
        NSLayoutConstraint.activate([
            contentView.layoutMarginsGuide.topAnchor.constraint(equalTo: label.topAnchor),
            contentView.layoutMarginsGuide.leadingAnchor.constraint(equalTo: label.leadingAnchor),
            contentView.layoutMarginsGuide.trailingAnchor.constraint(equalTo: label.trailingAnchor),
            contentView.layoutMarginsGuide.bottomAnchor.constraint(equalTo: label.bottomAnchor),
            label.widthAnchor.constraint(lessThanOrEqualToConstant: 190)
        ])
        
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(item: Label) {
        let color = item.color.hexStringToUIColor()
        label.text = item.title
        backgroundColor = color
        layer.cornerRadius = 12
        label.textColor = color.isDark ? .white : .black
        clipsToBounds = true
    }
}
