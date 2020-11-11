//
//  MileStonePopUpViewController.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/11.
//

import UIKit

class MileStonePopUpViewController: UIViewController {
	@IBOutlet weak var popUpViewCenterYConstraint: NSLayoutConstraint!
	
	let mileStoneManager = MileStoneManager()
	var mileStone: Milestone?
	var isKeyboardShown = false
	
	@IBOutlet weak var popUpView: UIView!
	@IBOutlet weak var titleTextField: UITextField!
	@IBOutlet weak var dateTextField: UITextField!
	@IBOutlet weak var descriptionTextField: UITextField!
	
	override func viewDidLoad() {
		super.viewDidLoad()
		self.view.backgroundColor = UIColor.gray.withAlphaComponent(0.5)
		popUpView.layer.cornerRadius = 5
		titleTextField.text = mileStone?.title
		descriptionTextField.text = mileStone?.description
		dateTextField.text = mileStone?.date
		registerForKeyboardNotifications()
	}
	
	override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
		guard let touch = touches.first else { return }
		if isKeyboardShown {
			self.titleTextField.resignFirstResponder()
			self.descriptionTextField.resignFirstResponder()
			self.dateTextField.resignFirstResponder()
		}
		else {
			if touch.view != popUpView {
				self.dismiss(animated: false, completion: nil)
			}
		}
	}
	
	@IBAction func closeButtonTouched(_ sender: Any) {
		self.dismiss(animated: false, completion: nil)
	}
	
	@IBAction func saveButtonTouched(_ sender: Any) {
		guard let title = titleTextField.text, title.isEmpty == false else { return }
		guard let date = dateTextField.text, validateDate(with: date) == true else {
			showAlert()
			return
		}
		
		if let mileStone = mileStone {
			var newMileStone = mileStone
			newMileStone.title = title
			newMileStone.description = descriptionTextField.text
			newMileStone.date = date.isEmpty ? nil : date
			NotificationCenter.default.post(name: .mileStoneDidChanged, object: self, userInfo: ["mileStone":newMileStone])
		}
		else {
			mileStoneManager.create(title: title, description: descriptionTextField.text, date: date.isEmpty ? nil : date)
		}
		self.dismiss(animated: false, completion: nil)
	}
	
	func validateDate(with dateString: String) -> Bool {
		guard dateString.isEmpty == false else { return true }
		let dateFormatter = DateFormatter()
		let format = "yyyy-MM-dd"
		dateFormatter.dateFormat = format
		if dateFormatter.date(from: dateString) == nil {
			return false
		}
		return true
	}
	
	func showAlert() {
		var alert = UIAlertController()
		alert = UIAlertController(title: "날짜형식오류", message: "yyyy-mm-dd에 맞게 작성해주십시오(생략가능)", preferredStyle: UIAlertController.Style.alert)
		let defaultAction = UIAlertAction(title: "OK", style: UIAlertAction.Style.destructive , handler: nil)
		alert.addAction(defaultAction)
		present(alert, animated: false, completion: nil)
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
