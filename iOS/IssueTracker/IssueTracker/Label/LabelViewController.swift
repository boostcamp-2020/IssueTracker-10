//
//  LabelViewController.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/10/27.
//

import UIKit

class LabelViewController: UIViewController {
	
	@IBOutlet weak var labelTableView: UITableView!
	var dataSource: LabelDiffableDataSource!
	
	override func viewDidLoad() {
		super.viewDidLoad()
		navigationController?.navigationBar.prefersLargeTitles = true
		navigationController?.setToolbarHidden(false, animated: false)
		labelTableView.delegate = self
		dataSource = LabelDiffableDataSource(with: labelTableView)
	}
}


extension LabelViewController: UITableViewDelegate {
	func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
		return 80
	}
}
