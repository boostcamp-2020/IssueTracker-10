//
//  PopupViewController.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/09.
//

import UIKit

class PopupViewController: UIViewController {
	
	let labelManager = LabelManager()
	var label: Label?
	var isKeyboardShown = false
	
	@IBOutlet weak var colorView: UIView!
	@IBOutlet weak var popUpView: UIView!
	@IBOutlet weak var titleTextField: UITextField!
	@IBOutlet weak var descriptionTextField: UITextField!
	@IBOutlet weak var colorTextField: UITextField!
	
	override func viewDidLoad() {
		super.viewDidLoad()
		self.view.backgroundColor = UIColor.gray.withAlphaComponent(0.5)
		colorView.layer.cornerRadius = 5
		colorView.backgroundColor = label?.color.hexStringToUIColor()
		titleTextField.text = label?.title
		descriptionTextField.text = label?.description
		colorTextField.text = label?.color
		registerForKeyboardNotifications()
	}
	
	@IBAction func randomColorButtonTouched(_ sender: Any) {
		let randomHexString = generateRandomHexString()
		colorTextField.text = randomHexString
		colorView.backgroundColor = randomHexString.hexStringToUIColor()
	}
	
	@IBAction func saveButtonTouched(_ sender: Any) {
		guard let title = titleTextField.text, title.isEmpty == false, let color = colorTextField.text, color.isEmpty == false else { return }
		
		if let label = label {
			var newLabel = label
			newLabel.title = title
			newLabel.description = descriptionTextField.text
			newLabel.color = color
			NotificationCenter.default.post(name: .labelDidChanged, object: self, userInfo: ["label":newLabel])
		}
		else {
			labelManager.create(title: title, content: descriptionTextField.text, color: color)
		}

		self.dismiss(animated: false, completion: nil)
	}
	@IBAction func closeButtonTouched(_ sender: Any) {
		self.dismiss(animated: false, completion: nil)
	}
	
	override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
		guard let touch = touches.first else { return }
		if isKeyboardShown {
			self.titleTextField.resignFirstResponder()
			self.descriptionTextField.resignFirstResponder()
			self.colorTextField.resignFirstResponder()
		}
		else {
			if touch.view != popUpView && touch.view != colorView {
				self.dismiss(animated: false, completion: nil)
			}
		}
	}
	
	private func generateRandomHexString() -> String {
		let randomRed:CGFloat = CGFloat(drand48())
		let randomGreen:CGFloat = CGFloat(drand48())
		let randomBlue:CGFloat = CGFloat(drand48())
		let rgb: Int = (Int)(randomRed * 255) << 16 | (Int)(randomGreen * 255) << 8 | (Int)(randomBlue * 255) << 0
		return String(format: "#%06x", rgb)
	}
	
	//MARK:- keyboard 관련
	func registerForKeyboardNotifications() {
		NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillShow(_:)), name: UIResponder.keyboardWillShowNotification, object: nil)
		NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide(_:)), name: UIResponder.keyboardWillHideNotification, object: nil)
	}
	
	@objc func keyboardWillShow(_ notification: Notification) {
		guard isKeyboardShown == false else { return }
		guard let keyboardSize = (notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue)?.cgRectValue else { return }
		let diff = (self.view.frame.height - popUpView.frame.height) / 2
		let height = keyboardSize.height - diff
		self.popUpView.frame.origin.y -= height
		isKeyboardShown = true
	}
	
	@objc func keyboardWillHide(_ notification: Notification) {
		guard isKeyboardShown == true else { return }
		guard let keyboardSize = (notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue)?.cgRectValue else { return }
		let diff = (self.view.frame.height - popUpView.frame.height) / 2
		let height = keyboardSize.height - diff
		self.popUpView.frame.origin.y += height
		isKeyboardShown = false
	}
}