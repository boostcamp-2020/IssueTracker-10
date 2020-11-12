//
//  IssueDetailDataSource.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/12.
//

import UIKit

class IssueDetailDataSource {
	
	var dataSource: UICollectionViewDiffableDataSource<Section, IssueComment>!
	let collectionView: UICollectionView
	let issue: Issue
	
	init(collectionView: UICollectionView, issue: Issue) {
		self.collectionView = collectionView
		self.issue = issue
		configureDataSource()
	}
	
	enum Section: CaseIterable {
		case main
	}
	
	struct Identifier {
		static let detailCell = "DetailCell"
		static let detailHeader = "DetailHeader"
		static let detailFooter = "DetailFooter"
	}
	
	func configureDataSource() {
		let cellProvider = { (collectionView: UICollectionView, indexPath: IndexPath, comment: IssueComment) -> UICollectionViewCell? in
			let cell = collectionView.dequeueReusableCell(withReuseIdentifier: Identifier.detailCell, for: indexPath)
			if let commmentCell = cell as? IssueDetailCell {
				commmentCell.configure(comment: comment)
				return commmentCell
			}
			return nil
		}
		
		dataSource = UICollectionViewDiffableDataSource<Section, IssueComment>(collectionView: collectionView, cellProvider: cellProvider)
		
		dataSource.supplementaryViewProvider = { (view, kind, indexPath) -> UICollectionReusableView? in
			if kind == UICollectionView.elementKindSectionHeader {
				if let headerView = self.collectionView.dequeueReusableSupplementaryView(ofKind: kind, withReuseIdentifier: Identifier.detailHeader, for: indexPath) as? CollectionHeaderView {
					headerView.configure(issue: self.issue)
					return headerView
				}
			}
			else if kind == UICollectionView.elementKindSectionFooter {
				if let footerView = self.collectionView.dequeueReusableSupplementaryView(ofKind: kind, withReuseIdentifier: Identifier.detailFooter, for: indexPath) as? CollectionFooterView {
					return footerView
				}
			}
			return UICollectionReusableView()
		}
	}
	
	func updateDataSource(comments: [IssueComment]) {
		DispatchQueue.main.async {
			var snapshot = NSDiffableDataSourceSnapshot<Section, IssueComment>()
			snapshot.appendSections([.main])
			snapshot.appendItems(comments)
			self.dataSource.apply(snapshot, animatingDifferences: true)
		}
	}
	
	func itemIdentifier(for indexPath: IndexPath) -> IssueComment? {
		return dataSource.itemIdentifier(for: indexPath)
	}
}
