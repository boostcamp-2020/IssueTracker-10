//
//  IssueFilterViewController.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/10/29.
//

import UIKit

class IssueFilterViewController: UIViewController {
	
	@IBAction func doneButtonTouched(_ sender: Any) {
		let paths = filterTableView.indexPathsForSelectedRows
		guard let indexPaths = paths else { return }
		
		var filters = indexPaths.compactMap{ dataSource.itemIdentifier(for: $0)?.criteria }
		if filters.contains(where: { $0 is OpenCriteria }) && filters.contains(where: { $0 is CloseCriteria }) {
			filters = filters.filter {
				if ($0 is OpenCriteria || $0 is CloseCriteria) {
					return false
				}
				return true
			}
		}
		NotificationCenter.default.post(name: .filterDidchanged, object: self, userInfo: ["filters":filters])
		
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
		let headerView = UIView()
		headerView.backgroundColor = .systemGray6
		
		let label = UILabel()
		let sectionKind = FilterDiffableDataSource.Section(rawValue: section)
		label.text = sectionKind?.header
		label.textColor = .systemGray
		label.font = label.font.withSize(13)
		
		headerView.addSubview(label)
		label.translatesAutoresizingMaskIntoConstraints = false
		NSLayoutConstraint.activate([
			headerView.leadingAnchor.constraint(equalTo: label.leadingAnchor, constant: -20),
			headerView.bottomAnchor.constraint(equalTo: label.bottomAnchor, constant: 4)
		])
		return headerView
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
	}
}

extension Notification.Name {
	static let filterDidchanged = Notification.Name("filterDidchanged")
}
