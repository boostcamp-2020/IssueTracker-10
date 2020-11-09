//
//  LabelDataSource.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/09.
//

import UIKit

class LabelDiffableDataSource {
	let tableView: UITableView
	var dataSource: UITableViewDiffableDataSource<Section, Label>!
	
	init(with tableView: UITableView) {
		self.tableView = tableView
		configureDataSource()
	}
	
	struct Identifier {
		static let labelCell = "labelCell"
	}
	
	enum Section: CaseIterable {
		case main
	}
	
	func configureDataSource() {
		let cellProvider = { (tableView: UITableView, indexPath: IndexPath, label: Label) -> UITableViewCell? in
			let cell = tableView.dequeueReusableCell(withIdentifier: Identifier.labelCell, for: indexPath)
			if let labelCell = cell as? LabelTableViewCell {
				labelCell.configure(title: label.title, detail: label.description ?? "No description", color: label.color)
				return labelCell
			}
			return cell
		}
		
		dataSource = UITableViewDiffableDataSource<Section, Label>(tableView: tableView, cellProvider: cellProvider)
	}
	
	func updateDataSource(labels: [Label]) {
		DispatchQueue.main.async {
			var snapshot = NSDiffableDataSourceSnapshot<Section, Label>()
			snapshot.appendSections([.main])
			snapshot.appendItems(labels)
			self.dataSource.apply(snapshot, animatingDifferences: false)
		}
	}
	
	func itemIdentifier(for indexPath: IndexPath) -> Label? {
		return dataSource.itemIdentifier(for: indexPath)
	}
}
