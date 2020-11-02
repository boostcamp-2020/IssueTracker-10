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
		authorizationButton.addTarget(self, action: #selector(handleAuthorizationAppleIDButtonPress), for: .touchUpInside)
		self.loginProviderStackView.addArrangedSubview(authorizationButton)
	}
	
	// 버튼이 눌리면, apple ID로 인증요청
	@objc func handleAuthorizationAppleIDButtonPress() {
		let appleIDProvider = ASAuthorizationAppleIDProvider()
		let request = appleIDProvider.createRequest()
		request.requestedScopes = [.fullName, .email]
		
		let authorizationController = ASAuthorizationController(authorizationRequests: [request])
		authorizationController.delegate = self
		authorizationController.presentationContextProvider = self
		authorizationController.performRequests()
	}
}

extension SignInViewController: ASAuthorizationControllerDelegate {
	//애플 아이디로 성공시, 여기서 계정을 만들 수 있다.
		func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
			if let appleIDCredential = authorization.credential as? ASAuthorizationAppleIDCredential {
				let userId: String = appleIDCredential.user
				let userFirstName: String = appleIDCredential.fullName?.givenName ?? ""
				let userLastName: String = appleIDCredential.fullName?.familyName ?? ""
				let userEmail: String = appleIDCredential.email ?? ""
				let userName: String = userLastName + userFirstName
				
				// userId로 이전에 로그인을 한적이 있는지 체크가능
				self.saveUserInKeychain(userId)
				
				let provider = ASAuthorizationAppleIDProvider()
				provider.getCredentialState(forUserID: userId) { (credentialState, error) in
					switch credentialState {
					case .authorized:
						print("Authorized")
						print("\(userName)")
						print("\(userEmail)")
						self.finishSignIn()
					case .notFound:
						print("Not Found")
					case .revoked:
						print("Revoked")
					default: break
					}
				}
			}
		}
		
		private func saveUserInKeychain(_ userIdentifier: String) {
			do {
				try KeychainItem(account: "userIdentifier").saveItem(userIdentifier)
			} catch {
				print("Unable to save userIdentifier to keychain.")
			}
		}
		
		private func finishSignIn() {
			DispatchQueue.main.async {
				self.dismiss(animated: true, completion: nil)
			}
		}
}

extension SignInViewController: ASAuthorizationControllerPresentationContextProviding {
	func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
		return self.view.window ?? ASPresentationAnchor()
	}
}
