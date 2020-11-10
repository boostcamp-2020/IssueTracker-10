//
//  OpenStateView.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/10.
//

import UIKit

class StateView: UIView {
    
    let icon = UIImageView()
    let state = UILabel()
    var iconLeadingConstraint: NSLayoutConstraint!

    override init(frame: CGRect) {
        super.init(frame: frame)
        commonInit()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        commonInit()
    }
    
    func commonInit() {
        self.layer.cornerRadius = 10
        icon.tintColor = .white
        state.textColor = .white
        icon.image = UIImage(systemName: "info.circle")
        state.text = "Closed"
        state.font = UIFont.systemFont(ofSize: 14, weight: .semibold)
        addSubview(icon)
        addSubview(state)
        
        icon.translatesAutoresizingMaskIntoConstraints = false
        state.translatesAutoresizingMaskIntoConstraints = false
        iconLeadingConstraint = icon.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 4)

        NSLayoutConstraint.activate([
            iconLeadingConstraint,
            icon.centerYAnchor.constraint(equalTo: centerYAnchor),
            icon.widthAnchor.constraint(equalToConstant: 20),
            icon.heightAnchor.constraint(equalToConstant: 20),
            state.centerYAnchor.constraint(equalTo: centerYAnchor),
            state.leadingAnchor.constraint(equalTo: icon.trailingAnchor, constant: 2),
            state.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -6),
            state.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -4),
        ])
    }
    
    func openView() {
        iconLeadingConstraint.constant = 10
        icon.image = UIImage(systemName: "info.circle")
        state.text = "Open"
        self.backgroundColor = UIColor(named: "OpenColor")
    }
    
    func closeView() {
        self.backgroundColor = UIColor(named: "CloseColor")
    }
}
