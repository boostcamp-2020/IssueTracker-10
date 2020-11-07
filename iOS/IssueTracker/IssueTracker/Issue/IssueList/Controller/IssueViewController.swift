//
//  IssueViewController.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/10/27.
//

import UIKit
import hvNetwork

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
        issueCollectionView.register(UINib(nibName: "IssueListViewCell", bundle: nil), forCellWithReuseIdentifier: "IssueCell")
        dataSource = IssueDiffableDataSource(collectionView: issueCollectionView)
        dataSource.performQuery(issues: viewModel.issues, filter: nil)
        setupUI()
        binding()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        navigationController?.setToolbarHidden(false, animated: false)

    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        navigationController?.setToolbarHidden(true, animated: false)
		AppData.applies = Filters.defaultApplies
    }
    
    func binding() {
        viewModel.issueApplyToDatasource = { [weak self] issues, filter in
            guard let self = self else { return }
            self.dataSource.performQuery(issues: issues, filter: filter)
        }
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
		presentViewController(identifier: "IssueFilterViewController", type: FilterIssueNavigationViewController(), option: .present)
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
		if isEditing == false {
			deselctAll()
		}
	}
	
	func getAllIndexPathsInSection(section : Int) -> [IndexPath] {
		let count = issueCollectionView.numberOfItems(inSection: section)
		return (0..<count).map { IndexPath(row: $0, section: section) }
	}
	
	func deselctAll() {
		let paths = getAllIndexPathsInSection(section: 0)
		paths.forEach {
			issueCollectionView.deselectItem(at: $0, animated: true)
			collectionView(issueCollectionView, didDeselectItemAt: $0)
		}
	}
	
	func deleteIssues() {
		selectedIssues().forEach{ viewModel.issueManager.delete(with: $0) }
	}
	
	func closeIssues() {
        viewModel.issueManager.close(with: selectedIssues())
	}
	
	func selectedIssues() -> [Issue] {
		let paths = issueCollectionView.indexPathsForSelectedItems?.sorted(by: >)
		guard let indexPaths = paths else { return [] }
		let identifiers = indexPaths.compactMap{ dataSource.itemIdentifier(for: $0) }
		return identifiers
	}
	
    func presentViewController<T:UIViewController> (identifier: String, type: T, option: Option) {
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
}
