//
//  MileStoneViewController.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/11.
//

import UIKit

class MileStoneViewController: UIViewController {
	
	override func viewDidLoad() {
		super.viewDidLoad()
		navigationController?.navigationBar.prefersLargeTitles = true
		navigationController?.setToolbarHidden(false, animated: false)		
	}
	
	override func viewWillDisappear(_ animated: Bool) {
		navigationController?.setToolbarHidden(true, animated: false)
	}
}
