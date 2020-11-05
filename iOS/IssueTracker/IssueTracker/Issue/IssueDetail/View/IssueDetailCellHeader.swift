//
//  IssueDetailCellHeader.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/03.
//

import UIKit

class IssueDetailCellHeader: UIView {

    let profileImage = UIImageView(frame: CGRect(x: 10, y: 10, width: 50, height: 50))
    let author = UILabel(frame: CGRect(x: 70, y: 15, width: 120, height: 20))
    let time = UILabel(frame: CGRect(x: 70, y: 35, width: 120, height: 20))
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        configure()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        configure()
    }
    
    func configure() {
        author.text = "hoonv"
        time.text = "16 minutes ago"
        profileImage.image = UIImage(named: "DefaultProfile")
        author.font = UIFont.systemFont(ofSize: 17, weight: .semibold)
        time.textColor = .systemGray
        addSubview(profileImage)
        addSubview(author)
        addSubview(time)
    }
}
