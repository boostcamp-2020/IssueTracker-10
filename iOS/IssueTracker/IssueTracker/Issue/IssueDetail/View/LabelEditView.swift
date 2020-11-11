//
//  LabelEditView.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/11.
//

import UIKit

class LabelEditView: UIView {

    override init(frame: CGRect) {
        super.init(frame: frame)
        commonInit()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        commonInit()
    }
    
    func commonInit() {
        backgroundColor = .systemGray2
        setupUI()
    }
    
    func setupUI() {
        let label = UILabel()
        label.text = "Label"
        let edit = UIButton()
        edit.setTitle("Edit", for: .normal)
        addSubview(label)
        addSubview(edit)
        
        label.anchor(top: topAnchor, paddingTop: 25,
                     bottom: nil, paddingBottom: 0,
                     leading: leadingAnchor, paddingLeft: 20,
                     trailing: nil, paddingRight: 0,
                     width: 50, height: 21)
        edit.anchor(top: topAnchor, paddingTop: 25,
                    bottom: nil, paddingBottom: 0,
                    leading: nil, paddingLeft: 0,
                    trailing: trailingAnchor, paddingRight: 20,
                    width: 50, height: 21)
    }

}
