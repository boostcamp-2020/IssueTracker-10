//
//  PopupViewController.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/09.
//

import UIKit

class PopupViewController: UIViewController {
	
	@IBOutlet weak var popUpView: UIView!
	@IBOutlet weak var titleTextField: UITextField!
	@IBOutlet weak var descriptionTextField: UITextField!
	@IBOutlet weak var colorTextField: UITextField!
	
	@IBAction func saveButtonTouched(_ sender: Any) {
		//title, color는 필수
		guard titleTextField.text?.isEmpty == false && colorTextField.text?.isEmpty == false else { return }
		
		self.dismiss(animated: true, completion: nil)
	}
	@IBAction func closeButtonTouched(_ sender: Any) {
		self.dismiss(animated: true, completion: nil)
	}
	
	override func viewDidLoad() {
		super.viewDidLoad()
		self.view.backgroundColor = UIColor.gray.withAlphaComponent(0.5)
	}
	
}
