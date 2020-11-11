//
//  MileStoneViewController.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/11.
//

import UIKit

class MileStoneViewController: UIViewController {
	
	@IBOutlet weak var mileStoneCollectionView: UICollectionView!
	
	var dataSource: MileStoneDiffableDataSource!
	
	override func viewDidLoad() {
		super.viewDidLoad()
		navigationController?.navigationBar.prefersLargeTitles = true
		navigationController?.setToolbarHidden(false, animated: false)
		dataSource = MileStoneDiffableDataSource(with: mileStoneCollectionView)
		mileStoneCollectionView.collectionViewLayout = createLayout()
	}
	
	override func viewWillDisappear(_ animated: Bool) {
		navigationController?.setToolbarHidden(true, animated: false)
	}
	
	func createLayout() -> UICollectionViewLayout {
		let itemSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
											 heightDimension: .fractionalHeight(1.0))
		let item = NSCollectionLayoutItem(layoutSize: itemSize)

		let groupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
											  heightDimension: .absolute(75))
		let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize, subitem: item, count: 1)
		let spacing = CGFloat(10)
		group.interItemSpacing = .fixed(spacing)

		let section = NSCollectionLayoutSection(group: group)
		section.interGroupSpacing = spacing
		section.contentInsets = NSDirectionalEdgeInsets(top: 0, leading: 10, bottom: 0, trailing: 10)

		let layout = UICollectionViewCompositionalLayout(section: section)
		return layout
	}
}
