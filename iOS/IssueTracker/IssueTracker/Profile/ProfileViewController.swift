//
//  ProfileViewController.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/02.
//

import UIKit

class ProfileViewController: UIViewController {
	
	let coderator = Coderator()
	
	@IBOutlet weak var nameLabel: UILabel!

	override func viewDidLoad() {
		super.viewDidLoad()
		configureProfile(user: coderator.load(key: .user) ?? User.basic)
	}

	func configureProfile(user: User) {
		DispatchQueue.main.async { [self] in
			nameLabel.text = user.name
		}
	}
}
