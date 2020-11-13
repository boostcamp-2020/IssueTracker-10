//
//  FilterDataSource.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/04.
//

import UIKit

class FilterDiffableDataSource {
	
	let tableView: UITableView
	var dataSource: UITableViewDiffableDataSource<Section, Filter>!
	
	init(with tableView: UITableView) {
		self.tableView = tableView
		configureDataSource()
	}
	
	struct Identifier {
		static let filterCell = "filterCell"
	}
	
	enum Section: Int {
		case state
		case option
		
		var header: String {
			switch self {
			case .state:
				return "이슈 상태를 선택해주세요"
			case .option:
				return "조건을 선택해주세요 (다중 선택 가능)"
			}
		}
	}
	
	func configureDataSource() {
		let cellProvider = { (tableView: UITableView, indexPath: IndexPath, filterContent: Filter) -> UITableViewCell? in
			let cell = tableView.dequeueReusableCell(withIdentifier: Identifier.filterCell, for: indexPath)
			var content = cell.defaultContentConfiguration()
			content.text = filterContent.description
			cell.contentConfiguration = content
			cell.isSelected = filterContent.isApply
			if cell.isSelected {
				tableView.selectRow(at: indexPath, animated: false, scrollPosition: .none)
			}
			return cell
		}		
		
		dataSource = UITableViewDiffableDataSource<Section, Filter>(tableView: tableView, cellProvider: cellProvider)
		
		let snapshot = initSnapshot()
		dataSource.apply(snapshot, animatingDifferences: false)
	}
	
	func initSnapshot() -> NSDiffableDataSourceSnapshot<Section, Filter> {
		let filterContents = Filters()
		filterContents.changeApplies()
		let max = filterContents.contents.count
		let state = Array(filterContents.contents[0..<2])
		let option = Array(filterContents.contents[2..<max])
		
		var snapshot = NSDiffableDataSourceSnapshot<Section, Filter>()
		snapshot.appendSections([.state])
		snapshot.appendItems(state)
		snapshot.appendSections([.option])
		snapshot.appendItems(option)
		return snapshot
	}
	
	func itemIdentifier(for indexPath: IndexPath) -> Filter? {
		return dataSource.itemIdentifier(for: indexPath)
	}
}
