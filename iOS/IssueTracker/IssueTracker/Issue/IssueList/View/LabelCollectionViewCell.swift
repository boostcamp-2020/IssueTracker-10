//
//  LabelCollectionViewCell.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/03.
//

import UIKit

class LabelCollectionViewCell: UICollectionViewCell {

    let label = UILabel()
    var color: UIColor!
    var isclicked = false
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
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
        NotificationCenter.default.addObserver(self, selector: #selector(labelToggled), name: .labelDidToggled, object: nil)
    }
    
    @objc private func labelToggled(_ notification: Notification) {
        if let object = notification.object as? [String: Any] {
            guard let name = object["title"] as? String,
                  let clicked = object["clicked"] as? Bool,
                  name == label.text else { return }
            updateColor(flag: clicked)
        }
    }
    
    func configure(item: Label) {
        color = item.color.hexStringToUIColor()
        label.text = item.title
        self.layer.borderWidth = 1
        self.layer.borderColor = color.cgColor
        label.textColor = color
        backgroundColor = .white
        layer.cornerRadius = 12
        clipsToBounds = true
        isclicked = SelectedLabels.shared.contains(title: item.title)
        updateColor(flag: isclicked)
    }
    
    func toggle() {
        isclicked = !isclicked
        updateColor(flag: isclicked)
    }
    
    func updateColor(flag: Bool) {
        if flag {
            self.backgroundColor = color
            self.label.textColor = .white
            
        } else {
            self.backgroundColor = .white
            self.label.textColor = color
        }
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
    }
}
