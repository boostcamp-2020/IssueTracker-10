//
//  HomeViewController.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/10/29.
//

import UIKit

class HomeViewController: UIViewController {
		
    override func viewDidLoad() {
        super.viewDidLoad()
    }
}

extension HomeViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "HomeCell", for: indexPath)
        var content = cell.defaultContentConfiguration()
        content.text = "Issue"
        content.image = UIImage(systemName: "info.circle")
        cell.contentConfiguration = content
        return cell
    }
}
