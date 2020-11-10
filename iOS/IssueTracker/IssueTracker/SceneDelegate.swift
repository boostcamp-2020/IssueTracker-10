//
//  SceneDelegate.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/10/26.
//

import UIKit
import AuthenticationServices

class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?
	let signInHelper = SignInHelper()	

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
		if AppData.token == "" {
			configureSignIn()
		}
        guard let _ = (scene as? UIWindowScene) else { return }
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        if let url = URLContexts.first?.url {
            guard url.absoluteString.starts(with: "issuetracker://") else { return }
            if let code = url.absoluteString.split(separator: "=").last.map({ String($0) }) {
				signInHelper.requestAccessToken(code: code)
            }
        }
    }
	
	private func configureSignIn() {
		DispatchQueue.main.async {
			self.window?.rootViewController?.showSignInView()
		}
	}
}
