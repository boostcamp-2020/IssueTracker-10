//
//  MileStonePopUpViewController.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/11.
//

import UIKit

class MileStonePopUpViewController: UIViewController {
	
	@IBOutlet weak var popUpView: UIView!
	@IBOutlet weak var titleTextField: UITextField!
	@IBOutlet weak var dateTextField: UITextField!
	@IBOutlet weak var descriptionTextField: UITextField!
	
	override func viewDidLoad() {
		super.viewDidLoad()
		self.view.backgroundColor = UIColor.gray.withAlphaComponent(0.5)
		popUpView.layer.cornerRadius = 5
	}
	
	@IBAction func closeButtonTouched(_ sender: Any) {
		self.dismiss(animated: false, completion: nil)
	}
	@IBAction func saveButtonTouched(_ sender: Any) {
		self.dismiss(animated: false, completion: nil)
	}
}
