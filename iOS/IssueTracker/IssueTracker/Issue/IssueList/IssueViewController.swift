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
	@IBAction func editButtonTouched(_ sender: UIBarButtonItem) {
		setEditing(!isEditing, animated: true)		
		updateUserInterface()
	}
    
    var dataSource: UICollectionViewDiffableDataSource<Section, Issue>!
	let issueManager = IssueManager()
	
	override func viewDidLoad() {
		super.viewDidLoad()
		IssueCollectionView.delegate = self
		IssueCollectionView.collectionViewLayout = createLayout()
		configureDataSource()
		performQuery(with: "")
		
		makeToolBar()
    }
	
	func makeToolBar() {
		let close = UIBarButtonItem(title: "선택 이슈 닫기", style: .done , target: self, action: #selector(closeTapped))
		let spacer = UIBarButtonItem(barButtonSystemItem: .flexibleSpace, target: self, action: nil)
		toolbarItems = [spacer, close]
	}
	
	@objc func closeTapped() {
		closeIssues(animated: true)
		isEditing.toggle()
		updateUserInterface()
	}
	
	func toolBar(isShown: Bool) {
		navigationController?.setToolbarHidden(!isShown, animated: false)
		tabBarController?.tabBar.isHidden = isShown
	}
	
	func updateUserInterface() {
		guard let editButton = navigationItem.rightBarButtonItem else { return }
		editButton.title = isEditing ? "Cancel" : "Edit"
		
		toolBar(isShown: isEditing)
	}
	
	func deleteIssues(animiated: Bool) {
		let paths = IssueCollectionView.indexPathsForSelectedItems?.sorted(by: >)
		paths?.forEach{ issueManager.delete(at: $0.row) }
		
		updateDataSource(issues: issueManager.opened())
	}
	
	func closeIssues(animated: Bool) {
		let paths = IssueCollectionView.indexPathsForSelectedItems?.sorted(by: >)
		guard let indexPaths = paths else { return }
		let identifiers = indexPaths.compactMap{ dataSource.itemIdentifier(for: $0) }
		identifiers.forEach{ issueManager.close(with: $0) }
		
		updateDataSource(issues: issueManager.opened())
	}
	
	func updateDataSource(issues: [Issue]) {
		var snapshot = NSDiffableDataSourceSnapshot<Section, Issue>()
		snapshot.appendSections([.main])
		snapshot.appendItems(issues)
		dataSource.apply(snapshot, animatingDifferences: true)
	}
	
	override func setEditing(_ editing: Bool, animated: Bool) {
		guard isEditing != editing else { return }
		super.setEditing(editing, animated: animated)
		IssueCollectionView.allowsMultipleSelection = editing
	}
	
	func createLayout() -> UICollectionViewLayout {
		let itemSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
											 heightDimension: .fractionalHeight(1.0))
		let item = NSCollectionLayoutItem(layoutSize: itemSize)

		let groupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
											   heightDimension: .fractionalHeight(0.15))
		let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize, subitem: item, count: 1)
		let spacing = CGFloat(0)
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
		let issues = issueManager.opened()
		updateDataSource(issues: issues)
	}
}

extension IssueViewController: UICollectionViewDelegate {
	func collectionView(_ collectionView: UICollectionView, shouldBeginMultipleSelectionInteractionAt indexPath: IndexPath) -> Bool {
		return true
	}
	
	func collectionView(_ collectionView: UICollectionView, didBeginMultipleSelectionInteractionAt indexPath: IndexPath) {
		self.setEditing(true, animated: true)
	}
	
	func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
		guard isEditing == true else { /* 디테일뷰로 이동하기 */ return }
		
		let cell = collectionView.cellForItem(at: indexPath)
		if cell?.isSelected == true {
			cell?.backgroundColor = UIColor.systemGray6
		}
	}
	
	func collectionView(_ collectionView: UICollectionView, didDeselectItemAt indexPath: IndexPath) {
		guard isEditing == true else { return }
		let cell = collectionView.cellForItem(at: indexPath)
		cell?.backgroundColor = nil
	}
}
