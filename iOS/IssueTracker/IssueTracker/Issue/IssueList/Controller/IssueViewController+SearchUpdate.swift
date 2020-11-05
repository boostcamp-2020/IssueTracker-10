//
//  IssueViewController+SearchUpdate.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/03.
//

import UIKit

extension IssueViewController: UISearchResultsUpdating {
    func updateSearchResults(for searchController: UISearchController) {
        guard let text = searchController.searchBar.text else { return }
        viewModel.inputText = text
    }
}
