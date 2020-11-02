//
//  SignInViewController.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/02.
//

import UIKit
import AuthenticationServices

class SignInViewController: UIViewController {
	@IBOutlet weak var loginProviderStackView: UIStackView!
	
	override func viewDidLoad() {
		super.viewDidLoad()
		setupProviderLoginView()
	}
	
	//버튼 만들기
	func setupProviderLoginView() {
		let authorizationButton = ASAuthorizationAppleIDButton()
		self.loginProviderStackView.addArrangedSubview(authorizationButton)
	}
}

extension SignInViewController: ASAuthorizationControllerDelegate {
	
}

extension SignInViewController: ASAuthorizationControllerPresentationContextProviding {
	func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
		return self.view.window ?? ASPresentationAnchor()
	}
}
