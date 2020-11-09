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
				labelCell.configure(title: label.title, detail: label.description)
				return labelCell
			}
			return cell
		}
		
		dataSource = UITableViewDiffableDataSource<Section, Label>(tableView: tableView, cellProvider: cellProvider)
	}
	
	func updateDataSource(labels: [Label]) {
		var snapshot = NSDiffableDataSourceSnapshot<Section, Label>()
		snapshot.appendSections([.main])
		snapshot.appendItems(labels)
		dataSource.apply(snapshot, animatingDifferences: true)
	}
	
	func itemIdentifier(for indexPath: IndexPath) -> Label? {
		return dataSource.itemIdentifier(for: indexPath)
	}
}
