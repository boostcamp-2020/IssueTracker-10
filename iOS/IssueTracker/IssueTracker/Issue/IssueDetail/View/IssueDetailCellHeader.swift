//
//  IssueDetailCellHeader.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/03.
//

import UIKit

class IssueDetailCellHeader: UIView {

    let profileImage = UIImageView(frame: CGRect(x: 20, y: 25, width: 40, height: 40))
    let author = UILabel(frame: CGRect(x: 70, y: 25, width: 120, height: 20))
    let time = UILabel(frame: CGRect(x: 70, y: 45, width: 120, height: 20))

    override init(frame: CGRect) {
        super.init(frame: frame)
        commonInit()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        commonInit()
    }
    
    func commonInit() {
        profileImage.layer.cornerRadius = 5
        profileImage.clipsToBounds = true
        profileImage.image = UIImage(named: "Icon")
        author.font = UIFont.systemFont(ofSize: 16, weight: .semibold)
        time.font = UIFont.systemFont(ofSize: 15, weight: .light)
        time.textColor = .systemGray
        addSubview(profileImage)
        addSubview(author)
        addSubview(time)
    }
    
    func configure(comment: IssueComment) {
        author.text = comment.user.username
        
        time.text = "\(PastTime().agoTime(from: comment.createdAt))"
        guard let url = URL(string: comment.user.avatar ?? "") else { return }
        ImageCache.shared.downloadImage(url: url) { (avatarImage: UIImage) in
            DispatchQueue.main.async {
                self.profileImage.image = avatarImage
            }
        }
    }
}
