//
//  HomeViewController.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/10/29.
//

import UIKit

class HomeViewController: UIViewController {
	
	var user: User? = nil
	
    override func viewDidLoad() {
        super.viewDidLoad()
		registerNotificationCenter()
    }
	
	private func registerNotificationCenter() {
		NotificationCenter.default.addObserver(self, selector: #selector(saveUserInfo), name: .loginSuccess, object: nil)
	}
	
	@objc func saveUserInfo(_ notification: Notification) {
		guard let userName = notification.userInfo?["name"] as? String else { return }
		user = User(name: userName)
	}
	
	override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
		guard let profileViewController = segue.destination as? ProfileViewController else { return }
		guard let user = user else { return }
		profileViewController.configureProfile(user: user)
	}
}

extension HomeViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 5
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "HomeCell", for: indexPath)
        return cell
    }
}
