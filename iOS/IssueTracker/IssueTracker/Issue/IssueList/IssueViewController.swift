//
//  IssueViewController.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/10/27.
//

import UIKit

class IssueViewController: UIViewController {

	
	@IBOutlet weak var issueCollectionView: UICollectionView!
	@IBAction func editButtonTouched(_ sender: UIBarButtonItem) {
		setEditing(!isEditing, animated: true)		
		updateUserInterface()
	}
    var viewModel = IssueViewModel()
    var dataSource: IssueDiffableDataSource!

	override func viewDidLoad() {
		super.viewDidLoad()
		issueCollectionView.delegate = self
		issueCollectionView.collectionViewLayout = createLayout()
        dataSource = IssueDiffableDataSource(collectionView: issueCollectionView)
        dataSource.performQuery(issues: viewModel.issues, filter: nil)
        setupSearchController()
		makeToolBar()
        binding()
        viewModel.request()
    }
    
    func binding() {
        viewModel.issueDataSource = { [weak self] issues, filter in
            guard let self = self else { return }
            self.dataSource.performQuery(issues: issues, filter: filter)
        }
    }

    private func setupSearchController() {
        let searchController = UISearchController(searchResultsController: nil)
        searchController.obscuresBackgroundDuringPresentation = false
        searchController.searchBar.placeholder = "Search issues"
        searchController.searchResultsUpdater = self
        self.navigationItem.searchController = searchController
        self.navigationItem.searchController?.hidesNavigationBarDuringPresentation = true
        self.definesPresentationContext = true
    }
    
	func makeToolBar() {
		let close = UIBarButtonItem(title: "선택 이슈 닫기", style: .done , target: self, action: #selector(closeTapped))
		let spacer = UIBarButtonItem(barButtonSystemItem: .flexibleSpace, target: self, action: nil)
		toolbarItems = [spacer, close]
	}
	
	@objc func closeTapped() {
		closeIssues()
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
	
	func deleteIssues() {
		let paths = issueCollectionView.indexPathsForSelectedItems?.sorted(by: >)
        paths?.forEach{ viewModel.issueManager.delete(at: $0.row) }
	}
	
	func closeIssues() {
		let paths = issueCollectionView.indexPathsForSelectedItems?.sorted(by: >)
		guard let indexPaths = paths else { return }
        let identifiers = indexPaths.compactMap{ dataSource.itemIdentifier(for: $0) }
        identifiers.forEach{ viewModel.issueManager.close(with: $0) }
	}
	
	override func setEditing(_ editing: Bool, animated: Bool) {
		guard isEditing != editing else { return }
		super.setEditing(editing, animated: animated)
		issueCollectionView.allowsMultipleSelection = editing
	}
	
	func createLayout() -> UICollectionViewLayout {
		let itemSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
											 heightDimension: .fractionalHeight(1.0))
		let item = NSCollectionLayoutItem(layoutSize: itemSize)
		let groupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
											   heightDimension: .fractionalHeight(0.13))
		let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize, subitem: item, count: 1)
		let spacing = CGFloat(5)
		group.interItemSpacing = .fixed(spacing)

		let section = NSCollectionLayoutSection(group: group)
		section.interGroupSpacing = spacing
		section.contentInsets = NSDirectionalEdgeInsets(top: 0, leading: 10, bottom: 0, trailing: 10)

		let layout = UICollectionViewCompositionalLayout(section: section)
		return layout
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

extension IssueViewController: UISearchResultsUpdating {
    func updateSearchResults(for searchController: UISearchController) {
        guard let text = searchController.searchBar.text else { return }
        dataSource.performQuery(issues: viewModel.issues, filter: TitleCriteria(input: text))
    }
}
