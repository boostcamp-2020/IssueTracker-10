//
//  FilterCancelView.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/10/27.
//

import UIKit

class FilterCancelView: UIView {
    
    private let cancel = UIButton()
    private let filter = UIButton()

    private var isCancelHidden = false

    override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setup()
    }
    
    func setup() {

        cancel.translatesAutoresizingMaskIntoConstraints = false
        cancel.setTitle("Cancel", for: .normal)
        cancel.setTitleColor(.systemIndigo, for: .normal)
        cancel.titleLabel?.font = .systemFont(ofSize: 16)
        cancel.isHidden = isCancelHidden

        filter.translatesAutoresizingMaskIntoConstraints = false
        filter.setImage(UIImage(systemName: "line.horizontal.3.decrease.circle"), for: .normal)
        filter.contentVerticalAlignment = .fill
        filter.contentHorizontalAlignment = .fill
        filter.tintColor = .systemIndigo
        filter.imageEdgeInsets = UIEdgeInsets(top: 5, left: 5, bottom: 5, right: 5)
        filter.isHidden = !isCancelHidden
        
        addSubview(filter)
        addSubview(cancel)
        
        NSLayoutConstraint.activate([
            cancel.topAnchor.constraint(equalTo: topAnchor, constant: 0),
            cancel.bottomAnchor.constraint(equalTo: bottomAnchor, constant: 0),
            cancel.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -5),
            cancel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 0),

            filter.topAnchor.constraint(equalTo: topAnchor, constant: 7),
            filter.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -7),
            filter.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -14),
            filter.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 0),
        ])
        
        cancel.addTarget(self, action: #selector(toggle), for: .touchDown)
        filter.addTarget(self, action: #selector(toggle), for: .touchDown)
    }
    
    @objc func toggle() {
        isCancelHidden = !isCancelHidden
        cancel.isHidden = isCancelHidden
        filter.isHidden = !isCancelHidden
    }
    
}
