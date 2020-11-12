//
//  MileStoneDataSource.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/11.
//

import UIKit

class MileStoneDiffableDataSource {
	
	let collectionView: UICollectionView
	var dataSource: UICollectionViewDiffableDataSource<Section, Milestone>!
	
	init(with collectionView: UICollectionView) {
		self.collectionView = collectionView
		configureDataSource()
	}
	
	struct Identifier {
		static let mileStoneCell = "mileStoneCell"
	}
	
	enum Section: CaseIterable {
		case main
	}
	
	func configureDataSource() {
		let cellProvider = { (collectionView: UICollectionView, indexPath: IndexPath, mileStone: Milestone) -> UICollectionViewCell? in
			let cell = collectionView.dequeueReusableCell(withReuseIdentifier: Identifier.mileStoneCell, for: indexPath)
			if let mileStoneCell = cell as? MileStoneCollectionViewCell {
				mileStoneCell.configure(mileStone: mileStone)
				return mileStoneCell
			}
			return nil
		}
		
		dataSource = UICollectionViewDiffableDataSource<Section, Milestone>(collectionView: collectionView, cellProvider: cellProvider)
	}
	
	func updateDataSource(mileStones: [Milestone]) {
		DispatchQueue.main.async {
			var snapshot = NSDiffableDataSourceSnapshot<Section, Milestone>()
			snapshot.appendSections([.main])
			snapshot.appendItems(mileStones)
			self.dataSource.apply(snapshot, animatingDifferences: true)
		}
	}
	
	func itemIdentifier(for indexPath: IndexPath) -> Milestone? {
		return dataSource.itemIdentifier(for: indexPath)
	}
}
