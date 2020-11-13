//
//  ProfileViewController.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/02.
//

import UIKit

class ProfileViewController: UIViewController {
	
	@IBOutlet weak var avatarImageView: UIImageView!
	@IBOutlet weak var nameLabel: UILabel!
		
	override func viewDidLoad() {
		super.viewDidLoad()
		setRound(imageView: avatarImageView)
		configureProfile(user: AppData.user)
	}
	
	func setRound(imageView: UIImageView) {
		imageView.layer.cornerRadius = imageView.bounds.width / 2
		imageView.layer.masksToBounds = true
	}

	func configureProfile(user: User) {
		nameLabel.text = user.name
		avatarImageView.image = UIImage(named: "Icon")
		guard let url: URL = URL(string: user.avatorURL ?? "") else { return }
        ImageCache.shared.downloadImage(url: url) { (avatarImage: UIImage) in
			DispatchQueue.main.async {
				self.avatarImageView.image = avatarImage
			}
		}
	}
}
