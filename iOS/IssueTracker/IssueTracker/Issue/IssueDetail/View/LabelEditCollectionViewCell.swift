//
//  LabelEditCollectionViewCell.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/12.
//

import UIKit

class LabelEditCollectionViewCell: UICollectionViewCell {

    let label = UILabel()
    var color: UIColor!
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setup()
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
    }
    
    func setup() {
        NotificationCenter.default.addObserver(self, selector: #selector(editLabelBegin), name: .EditLabelBegin, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(editLabelEnd), name: .EditLabelEnd, object: nil)

        label.font = UIFont.systemFont(ofSize: 16, weight: .semibold)
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

        let longPressRecognizer = UILongPressGestureRecognizer(target: self, action: #selector(longPressed))
        addGestureRecognizer(longPressRecognizer)
    }

    @objc func longPressed(sender: UILongPressGestureRecognizer) {
        NotificationCenter.default.post(name: .EditLabelBegin, object: nil)
    }

    func configure(item: Label) {
        color = item.color.hexStringToUIColor()
        label.text = item.title
        self.layer.borderWidth = 1
        self.layer.borderColor = color.cgColor
        label.textColor = color
        backgroundColor = UIColor(named: "LabelCellColor")
        layer.cornerRadius = 12
        clipsToBounds = true
    }

    @objc func editLabelBegin() {
        self.rotate()
    }
    
    @objc func editLabelEnd() {
        layer.removeAllAnimations()
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
    }
}
