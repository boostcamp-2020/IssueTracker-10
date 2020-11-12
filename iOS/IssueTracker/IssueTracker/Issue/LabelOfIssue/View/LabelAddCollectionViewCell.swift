//
//  LabelAddCollectionViewCell.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/12.
//

import UIKit

class LabelAddCollectionViewCell: UICollectionViewCell {

    @IBOutlet weak var title: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        let holl = UIView(frame: CGRect(x: 10, y: 10, width: 14, height: 14))
        holl.backgroundColor = .white
        holl.layer.cornerRadius = 7
        addSubview(holl)
    }
    
    func configure(label: Label) {
        let color = label.color.hexStringToUIColor().withAlphaComponent(0.95)
        backgroundColor = color
        layer.cornerRadius = 15
        title.text = label.title
        title.textColor = color.isDark ? .white : .black
    }

}
