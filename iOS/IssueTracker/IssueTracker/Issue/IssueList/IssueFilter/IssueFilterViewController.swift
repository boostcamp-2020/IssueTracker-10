//
//  IssueFilterViewController.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/10/29.
//

import UIKit

class IssueFilterViewController: UIViewController {
	
	@IBAction func doneButtonTouched(_ sender: Any) {
		self.dismiss(animated: true, completion: nil)
	}
	
	@IBAction func cancelButtonTouched(_ sender: Any) {
		self.dismiss(animated: true, completion: nil)
	}
	
	@IBOutlet weak var filterTableView: UITableView!
	
	var dataSource: FilterDiffableDataSource!
	
	override func viewDidLoad() {
		super.viewDidLoad()
		navigationController?.navigationBar.prefersLargeTitles = true
		filterTableView.delegate = self
		dataSource = FilterDiffableDataSource(with: filterTableView)
		filterTableView?.allowsMultipleSelection = true
		filterTableView.isScrollEnabled = false
	}
}

extension IssueFilterViewController: UITableViewDelegate {
	func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
		let sectionKind = FilterDiffableDataSource.Section(rawValue: section)
		let label = UILabel()
		label.textColor = .systemGray
		label.backgroundColor = .systemGray6
		label.textAlignment = .center
		label.baselineAdjustment = .alignBaselines
		label.text = sectionKind?.header
		return label
	}

	func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
		return 50
	}
	
	func tableView(_ tableView: UITableView, didDeselectRowAt indexPath: IndexPath) {
		guard let cell = tableView.cellForRow(at: indexPath) else { return }
		cell.isSelected = false
	}

	func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
		guard let cell = tableView.cellForRow(at: indexPath) else { return }
		cell.isSelected = true
		
		if indexPath.section == 0 {
			let totalRows = tableView.numberOfRows(inSection: 0)
			for row in 0..<totalRows {
				if indexPath.row == row { continue }
				tableView.deselectRow(at: IndexPath(row: row, section: 0) , animated: false)
			}
		}
	}
}
