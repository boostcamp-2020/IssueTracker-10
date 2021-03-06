//
//  LabelViewController.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/10/27.
//

import UIKit

class LabelViewController: UIViewController {
	
	@IBOutlet weak var labelTableView: UITableView!
	
	var dataSource: LabelDiffableDataSource!
	let viewModel = LabelViewModel(reactor: LabelReactor(), state: LabelState())
	
	override func viewDidLoad() {
		super.viewDidLoad()
		navigationController?.navigationBar.prefersLargeTitles = true
		navigationController?.setToolbarHidden(false, animated: false)
		labelTableView.delegate = self
		dataSource = LabelDiffableDataSource(with: labelTableView)
		configureRefreshControl()
		binding()
	}
	
	func binding() {
		viewModel.updateClosure = { state in
			let labels = state.labels
			self.dataSource.updateDataSource(labels: labels)
		}
		viewModel.updateClosure?(viewModel.state)
		viewModel.requestGetLabelList()
	}
	
	override func viewWillDisappear(_ animated: Bool) {
		navigationController?.setToolbarHidden(true, animated: false)
	}
	
	func viewController<T:UIViewController> (identifier: String, type: T) -> T? {
		let mainStoryboard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
		if let viewController: T = mainStoryboard.instantiateViewController(withIdentifier: identifier) as? T {
			return viewController
		}
		return nil
	}
	
	func configureRefreshControl () {
		labelTableView.refreshControl = UIRefreshControl()
		labelTableView.refreshControl?.addTarget(self, action: #selector(handleRefreshControl), for: .valueChanged)
	}
	
	@objc func handleRefreshControl() {
		NotificationCenter.default.post(name: .labelDidCreated, object: self)
		
		DispatchQueue.main.async {
			self.labelTableView.refreshControl?.endRefreshing()
		}
	}
}


extension LabelViewController: UITableViewDelegate {
	func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
		return 75
	}
	
	func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
		let label = dataSource.itemIdentifier(for: indexPath)
		guard let viewController = viewController(identifier: "LabelPopupViewController", type: LabelPopupViewController()) else { return }
		viewController.label = label
		self.present(viewController, animated: false, completion: nil)
	}
}
