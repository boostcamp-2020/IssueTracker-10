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
	
	@IBOutlet weak var popUpView: UIView!
	@IBOutlet weak var titleTextField: UITextField!
	@IBOutlet weak var descriptionTextField: UITextField!
	@IBOutlet weak var colorTextField: UITextField!
	
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
	
	override func viewDidLoad() {
		super.viewDidLoad()
		self.view.backgroundColor = UIColor.gray.withAlphaComponent(0.5)
		titleTextField.text = label?.title
		descriptionTextField.text = label?.description
		colorTextField.text = label?.color
	}
	
}
