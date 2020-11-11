//
//  LabelPopupViewController.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/09.
//

import UIKit

class LabelPopupViewController: UIViewController {
	
	let labelManager = LabelManager()
	var label: Label?
	var isKeyboardShown = false
	var textFieldOrder: [UITextField] = []
	
	@IBOutlet weak var popUpViewCenterYConstraint: NSLayoutConstraint!
	@IBOutlet weak var colorView: UIView!
	@IBOutlet weak var popUpView: UIView!
	@IBOutlet weak var titleTextField: UITextField!
	@IBOutlet weak var descriptionTextField: UITextField!
	@IBOutlet weak var colorTextField: UITextField!
	@IBOutlet weak var saveButton: UIButton!
	
	override func viewDidLoad() {
		super.viewDidLoad()
		self.view.backgroundColor = UIColor.gray.withAlphaComponent(0.5)
		popUpView.layer.cornerRadius = 5
		colorView.layer.cornerRadius = 5
		colorView.backgroundColor = label?.color.hexStringToUIColor()
		titleTextField.text = label?.title
		descriptionTextField.text = label?.description
		colorTextField.text = label?.color
		registerForKeyboardNotifications()
		textFieldOrder = [titleTextField, descriptionTextField, colorTextField]
		setTextFieldDelegate()
	}
	
	override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
		guard let touch = touches.first else { return }
		if isKeyboardShown {
			textFieldOrder.forEach { $0.resignFirstResponder() }
		}
		else {
			if touch.view != popUpView && touch.view != colorView {
				self.dismiss(animated: false, completion: nil)
			}
		}
	}
	
	@IBAction func randomColorButtonTouched(_ sender: Any) {
		let randomHexString = generateRandomHexString()
		colorTextField.text = randomHexString
		colorView.backgroundColor = randomHexString.hexStringToUIColor()
	}
	
	@IBAction func saveButtonTouched(_ sender: UIButton) {
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
		let bottomSpace = (self.view.frame.height - popUpView.frame.height) / 2
		let diff = keyboardSize.height - bottomSpace + 100
		
		UIView.animate(withDuration: 1, animations: { () -> Void in
			self.popUpViewCenterYConstraint.constant -= diff
			self.view.layoutIfNeeded()
		}, completion: {_ in
			self.isKeyboardShown = true
		})
	}
	
	@objc func keyboardWillHide(_ notification: Notification) {
		guard isKeyboardShown == true else { return }
		guard let keyboardSize = (notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue)?.cgRectValue else { return }
		let bottomSpace = (self.view.frame.height - popUpView.frame.height) / 2
		let diff = keyboardSize.height - bottomSpace + 100
		
		UIView.animate(withDuration: 1, animations: { () -> Void in
			self.popUpViewCenterYConstraint.constant += diff
			self.view.layoutIfNeeded()
		}, completion: {_ in
			self.isKeyboardShown = false
		})
	}
}

extension LabelPopupViewController: UITextFieldDelegate {
	func setTextFieldDelegate() {
		textFieldOrder.forEach { $0.delegate = self }
	}
	
	func textFieldShouldReturn(_ textField: UITextField) -> Bool {
		if textField == textFieldOrder.last {
			saveButtonTouched(saveButton)
		}
		else {
			guard let now = textFieldOrder.firstIndex(where: {$0 == textField}) else { return false }
			let next = textFieldOrder[now + 1]
			next.becomeFirstResponder()
		}
		return true
	}
}
