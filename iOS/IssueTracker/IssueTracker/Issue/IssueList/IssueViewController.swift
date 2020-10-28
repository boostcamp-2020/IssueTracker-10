//
//  IssueViewController.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/10/27.
//

import UIKit

class IssueViewController: UIViewController {
	
	enum Section: CaseIterable {
		case main
	}
	
	struct Identifier {
		static let issueCell = "issueCell"
	}
	
	@IBOutlet weak var IssueCollectionView: UICollectionView!
    @IBOutlet weak var searchBar: UISearchBar!
    
    var dataSource: UICollectionViewDiffableDataSource<Section, Issue>!
	let issueManager = IssueManager()
	
	override func viewDidLoad() {
		super.viewDidLoad()
		IssueCollectionView.collectionViewLayout = createLayout()
		configureDataSource()
		performQuery(with: "")
    }
	
	func createLayout() -> UICollectionViewLayout {
		let itemSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
											 heightDimension: .fractionalHeight(1.0))
		let item = NSCollectionLayoutItem(layoutSize: itemSize)

		let groupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
											   heightDimension: .fractionalHeight(0.15))
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

extension IssueViewController {
	func configureDataSource() {
		let cellProvider = { (collectionView: UICollectionView, indexPath: IndexPath, issue: Issue) -> UICollectionViewCell? in
			let cell = collectionView.dequeueReusableCell(withReuseIdentifier: Identifier.issueCell, for: indexPath)
			if let issueCell = cell as? IssueCollectionViewCell {
				issueCell.configure(issue: issue)
				return cell
			}
			return nil
		}
		
		dataSource = UICollectionViewDiffableDataSource<Section, Issue>(collectionView: IssueCollectionView, cellProvider: cellProvider)
	}
	
	func performQuery(with filter: String?) {
		let issues = issueManager.issues

		var snapshot = NSDiffableDataSourceSnapshot<Section, Issue>()
		snapshot.appendSections([.main])
		snapshot.appendItems(issues)
		dataSource.apply(snapshot, animatingDifferences: true)
	}
}
