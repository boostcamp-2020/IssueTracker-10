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
	
	@IBOutlet weak var colorView: UIView!
	@IBOutlet weak var popUpView: UIView!
	@IBOutlet weak var titleTextField: UITextField!
	@IBOutlet weak var descriptionTextField: UITextField!
	@IBOutlet weak var colorTextField: UITextField!
	
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
	
	override func viewDidLoad() {
		super.viewDidLoad()
		self.view.backgroundColor = UIColor.gray.withAlphaComponent(0.5)
		colorView.layer.cornerRadius = 5
		colorView.backgroundColor = label?.color.hexStringToUIColor()
		titleTextField.text = label?.title
		descriptionTextField.text = label?.description
		colorTextField.text = label?.color
	}
	
	override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
		guard let touch = touches.first else { return }
		if touch.view != popUpView {
			self.dismiss(animated: false, completion: nil)
		}
	}
	
	private func generateRandomHexString() -> String {
		let randomRed:CGFloat = CGFloat(drand48())
		let randomGreen:CGFloat = CGFloat(drand48())
		let randomBlue:CGFloat = CGFloat(drand48())
		let rgb: Int = (Int)(randomRed * 255) << 16 | (Int)(randomGreen * 255) << 8 | (Int)(randomBlue * 255) << 0
		return String(format: "#%06x", rgb)
	}
	
}
