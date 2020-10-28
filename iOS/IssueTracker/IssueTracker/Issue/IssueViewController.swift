//
//  IssueViewController.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/10/27.
//

import UIKit

class IssueViewController: UIViewController {

    @IBOutlet weak var searchBar: UISearchBar!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
}

extension IssueViewController: UISearchBarDelegate {
    
    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        // inputText
    }

    func searchBarShouldEndEditing(_ searchBar: UISearchBar) -> Bool {
        navigationController?.setNavigationBarHidden(false, animated: false)
        return true
    }
    
    func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
        view.endEditing(true)
    }
}
