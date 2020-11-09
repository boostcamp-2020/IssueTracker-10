//
//  IssueViewController.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/10/27.
//

import UIKit
import hvNetwork

class IssueViewController: UIViewController {

    var dataSource: IssueDiffableDataSource!
	var viewModel = IssueListViewModel(reactor: IssueListReactor(),
                                        state: IssueListState())
    @IBOutlet weak var issueCollectionView: UICollectionView!
    @IBAction func editButtonTouched(_ sender: UIBarButtonItem) {
        viewModel.updateIsEditModeToggle()
    }
    
	override func viewDidLoad() {
		super.viewDidLoad()
        issueCollectionView.register(UINib(nibName: "IssueListViewCell", bundle: nil), forCellWithReuseIdentifier: "IssueCell")
        dataSource = IssueDiffableDataSource(collectionView: issueCollectionView)
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
    }
    
    func binding() {
        viewModel.updateClosure = { state in
            let issues = state.issues
            let filter = state.filter
            self.dataSource.performQuery(issues: issues, filter: filter)
            self.updateIsEdit(flag: state.isEditting)
        }
        viewModel.updateClosure?(viewModel.state)
        viewModel.requestGetIssueList()
    }
    
    func updateIsEdit(flag: Bool) {
        DispatchQueue.main.async { [weak self] in
            guard let self = self,
                  let editButton = self.navigationItem.rightBarButtonItem else { return }
            if flag {
                self.issueCollectionView.allowsMultipleSelection = flag
                editButton.title = "Cancel"
                self.editModeToolBar()
            } else {
                self.issueCollectionView.allowsMultipleSelection = flag
                editButton.title = "Edit"
                self.setDefaultToolBar()
                self.deselctAll()
            }
        }
    }
	
	@objc func deleteTapped() {
        viewModel.requestDelete(issues: selectedIssues())
        viewModel.updateIsEditModeToggle()
	}
	
	@objc func closeTapped() {
        viewModel.requestClose(issues: selectedIssues())
        viewModel.updateIsEditModeToggle()
	}

    func selectedIssues() -> [Issue] {
        let paths = issueCollectionView.indexPathsForSelectedItems?.sorted(by: >)
        guard let indexPaths = paths else { return [] }
        let issues = indexPaths.compactMap{ dataSource.itemIdentifier(for: $0) }
        return issues
    }
    
    func deselctAll() {
        let paths = getAllIndexPathsInSection(section: 0)
        paths.forEach {
            issueCollectionView.deselectItem(at: $0, animated: true)
            collectionView(issueCollectionView, didDeselectItemAt: $0)
        }
    }
    
	func getAllIndexPathsInSection(section : Int) -> [IndexPath] {
		let count = issueCollectionView.numberOfItems(inSection: section)
		return (0..<count).map { IndexPath(row: $0, section: section) }
	}
    
    // MARK: View Transition
    enum Option {
        case present
        case push
    }
    
    @objc func addTapped() {
        presentViewController(identifier: "IssueCreateViewController", type: CreateIssueNavigationViewController(), option: .present)
    }
    
    @objc func filterTapped() {
        presentViewController(identifier: "IssueFilterViewController", type: FilterIssueNavigationViewController(), option: .present)
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
}
