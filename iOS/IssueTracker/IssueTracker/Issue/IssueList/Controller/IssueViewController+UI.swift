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
}
