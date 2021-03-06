//
//  IssueViewController+UI.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/03.
//

import UIKit

extension IssueViewController {
    func setupUI() {
        setupSearchController()
        setDefaultToolBar()
		configureRefreshControl()
    }
    
    func setupSearchController() {
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
	
	func editModeToolBar() {
		let close = UIBarButtonItem(title: "Close", style: .done , target: self, action: #selector(closeTapped))
		close.tintColor = UIColor(named: "GithubMainColor")
		let delete = UIBarButtonItem(title: "Delete", style: .done , target: self, action: #selector(deleteTapped))
		delete.tintColor = UIColor.systemRed
		let spacer = UIBarButtonItem(barButtonSystemItem: .flexibleSpace, target: self, action: nil)
		toolbarItems = [delete, spacer, close]
	}
	
	func makeSelectButton() {
		let selectAllButton = UIBarButtonItem(title: "Select All", style: .plain , target: self, action: #selector(selectAllButtonTouched))
		selectAllButton.tintColor = UIColor(named: "GithubMainColor")
		self.navigationItem.setLeftBarButton(selectAllButton, animated: false)
	}
	
	func makeDeselectButton() {
		let deselectAllButton = UIBarButtonItem(title: "Deselect All", style: .plain, target: self, action: #selector(deselectAllButtonTouched))
		deselectAllButton.tintColor = UIColor(named: "GithubMainColor")
		self.navigationItem.setLeftBarButton(deselectAllButton, animated: false)
	}
	
	func configureRefreshControl () {
		issueCollectionView.refreshControl = UIRefreshControl()
		issueCollectionView.refreshControl?.addTarget(self, action: #selector(handleRefreshControl), for: .valueChanged)
	}
	
	@objc func handleRefreshControl() {
		NotificationCenter.default.post(name: .refreshIssue, object: self)
		
		DispatchQueue.main.async {
			self.issueCollectionView.refreshControl?.endRefreshing()
		}
	}
}
