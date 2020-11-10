//
//  HomeViewController.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/10/29.
//

import UIKit

class HomeViewController: UIViewController {
	
	let contents: [Content] = [
		Content(title: "Issue", imageName: "info.circle"),
		Content(title: "Label", imageName: "tag")
	]
		
    override func viewDidLoad() {
        super.viewDidLoad()
    }
	
	func presentViewController<T:UIViewController> (identifier: String, type: T) {
		let mainStoryboard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
		if let viewController: T = mainStoryboard.instantiateViewController(withIdentifier: identifier) as? T {
			self.navigationController?.pushViewController(viewController, animated: true)
		}
	}
}

extension HomeViewController: UITableViewDelegate {
	func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
		if indexPath.row == 0 {
			presentViewController(identifier: "IssueViewController", type: IssueViewController())
		}
		else {
			presentViewController(identifier: "LabelViewController", type: LabelViewController())
		}
	}
}

extension HomeViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
		return contents.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "HomeCell", for: indexPath)
        var content = cell.defaultContentConfiguration()
		content.text = contents[indexPath.row].title
        content.image = UIImage(systemName: contents[indexPath.row].imageName)
        cell.contentConfiguration = content
        return cell
    }
}

struct Content {
	let title: String
	let imageName: String
}
