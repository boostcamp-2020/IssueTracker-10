//
//  LabelDataSource.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/09.
//

import UIKit

class LabelDiffableDataSource {
	let tableView: UITableView
	var dataSource: DataSource!
	
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
				labelCell.configure(label: label)
				return labelCell
			}
			return cell
		}
		
		dataSource = DataSource(tableView: tableView, cellProvider: cellProvider)
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
	
	class DataSource: UITableViewDiffableDataSource<Section, Label> {
		override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
			return true
		}

		override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
			if editingStyle == .delete {
				if let identifierToDelete = itemIdentifier(for: indexPath) {
					var snapshot = self.snapshot()
					snapshot.deleteItems([identifierToDelete])
					apply(snapshot)
					NotificationCenter.default.post(name: .labelDidDeleted, object: self, userInfo: ["label":identifierToDelete])
				}
			}
		}
	}
}
