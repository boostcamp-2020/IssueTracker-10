//
//  ViewController+showLoginView.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/02.
//

import Foundation

extension UIViewController {
	func showSignInView() {
		let signInStoryboard: UIStoryboard = UIStoryboard(name: "SignIn", bundle: nil)
		if let signInViewController: SignInViewController = signInStoryboard.instantiateViewController(withIdentifier: "SignInViewController") as? SignInViewController {
			signInViewController.modalPresentationStyle = .fullScreen
			
			self.present(signInViewController, animated: true, completion: nil)
		}
	}
}
