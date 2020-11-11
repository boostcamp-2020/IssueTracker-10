//
//  MileStonePopUpViewController.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/11.
//

import UIKit

class MileStonePopUpViewController: UIViewController {
	
	let mileStoneManager = MileStoneManager()
	var mileStone: Milestone?
	
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
}
