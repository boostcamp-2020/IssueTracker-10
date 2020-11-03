//
//  IssueViewController.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/10/27.
//

import UIKit

class IssueViewController: UIViewController {
	
	enum Option {
		case present
		case push
	}
	
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
		setDefaultToolBar()
		showToolBar()
        binding()
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
    
	func setDefaultToolBar() {
		let add = UIBarButtonItem(image: UIImage(systemName: "square.and.pencil"), style: .done, target: self, action: #selector(addTapped))
		add.tintColor = UIColor(named: "GithubMainColor")
		let spacer = UIBarButtonItem(barButtonSystemItem: .flexibleSpace, target: self, action: nil)
		let filter = UIBarButtonItem(image: UIImage(systemName: "line.horizontal.3.decrease.circle"), style: .done, target: self, action: #selector(filterTapped))
		filter.tintColor = UIColor(named: "GithubMainColor")
		toolbarItems = [filter, spacer, add]
	}
	
	func showToolBar() {
		navigationController?.setToolbarHidden(false, animated: false)
	}
	
	func editModeToolBar() {
		let close = UIBarButtonItem(title: "Close", style: .done , target: self, action: #selector(closeTapped))
		close.tintColor = UIColor(named: "GithubMainColor")
		let delete = UIBarButtonItem(title: "Delete", style: .done , target: self, action: #selector(deleteTapped))
		delete.tintColor = UIColor.systemRed
		let spacer = UIBarButtonItem(barButtonSystemItem: .flexibleSpace, target: self, action: nil)
		toolbarItems = [delete, spacer, close]
	}
	
	@objc func addTapped() {
		presentViewController(identifier: "IssueCreateViewController", type: CreateIssueNavigationViewController(), option: .present)
	}
	
	@objc func filterTapped() {
		presentViewController(identifier: "IssueFilterViewController", type: IssueFilterViewController(), option: .present)
	}
	
	@objc func deleteTapped() {
		deleteIssues()
		isEditing.toggle()
		updateUserInterface()
	}
	
	@objc func closeTapped() {
		closeIssues()
		isEditing.toggle()
		updateUserInterface()
	}
	
	func updateUserInterface() {
		guard let editButton = navigationItem.rightBarButtonItem else { return }
		editButton.title = isEditing ? "Cancel" : "Edit"
		isEditing ? editModeToolBar() : setDefaultToolBar()
	}
	
	func deleteIssues() {
		selectedIssues().forEach{ viewModel.issueManager.delete(with: $0) }
	}
	
	func closeIssues() {
		selectedIssues().forEach{ viewModel.issueManager.close(with: $0) }
	}
	
	func selectedIssues() -> [Issue] {
		let paths = issueCollectionView.indexPathsForSelectedItems?.sorted(by: >)
		guard let indexPaths = paths else { return [] }
		let identifiers = indexPaths.compactMap{ dataSource.itemIdentifier(for: $0) }
		return identifiers
	}
	
	private func presentViewController<T:UIViewController> (identifier: String, type: T, option: Option) {
		let mainStoryboard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
		if let viewController: T = mainStoryboard.instantiateViewController(withIdentifier: identifier) as? T {
			switch option {
			case .present:
				self.present(viewController, animated: true, completion: nil)
			case .push:
				self.navigationController?.pushViewController(viewController, animated: true)
			}
		}
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
											   heightDimension: .fractionalHeight(0.2))
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
		guard isEditing == true else {
			presentViewController(identifier: "IssueDetailViewController", type: IssueDetailViewController(), option: .push)
			return
		}
		
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
