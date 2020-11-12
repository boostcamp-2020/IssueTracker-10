//
//  MileStoneViewController.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/11.
//

import UIKit

class MileStoneViewController: UIViewController {
	
	@IBOutlet weak var mileStoneCollectionView: UICollectionView!
	
	var dataSource: MileStoneDiffableDataSource!
	let viewModel = MileStoneViewModel(reactor: MileStoneReactor(), state: MileStoneState())
	
	override func viewDidLoad() {
		super.viewDidLoad()
		navigationController?.navigationBar.prefersLargeTitles = true
		navigationController?.setToolbarHidden(false, animated: false)
		dataSource = MileStoneDiffableDataSource(with: mileStoneCollectionView)
		mileStoneCollectionView.collectionViewLayout = createLayout()
		mileStoneCollectionView.delegate = self
		configureRefreshControl()
		binding()
	}
	
	override func viewWillDisappear(_ animated: Bool) {
		navigationController?.setToolbarHidden(true, animated: false)
	}
	
	func binding() {
		viewModel.updateClosure = { state in
			let mileStones = state.mileStones
			self.dataSource.updateDataSource(mileStones: mileStones)
		}
		viewModel.updateClosure?(viewModel.state)
		viewModel.requestGetMileStoneList()
	}
	
	func createLayout() -> UICollectionViewLayout {
		let itemSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
											 heightDimension: .fractionalHeight(1.0))
		let item = NSCollectionLayoutItem(layoutSize: itemSize)

		let groupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
											  heightDimension: .absolute(70))
		let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize, subitem: item, count: 1)
		let spacing = CGFloat(10)
		group.interItemSpacing = .fixed(spacing)

		let section = NSCollectionLayoutSection(group: group)
		section.interGroupSpacing = spacing
		section.contentInsets = NSDirectionalEdgeInsets(top: 0, leading: 20, bottom: 0, trailing: 10)

		let layout = UICollectionViewCompositionalLayout(section: section)
		return layout
	}
	
	func viewController<T:UIViewController> (identifier: String, type: T) -> T? {
		let mainStoryboard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
		if let viewController: T = mainStoryboard.instantiateViewController(withIdentifier: identifier) as? T {
			return viewController
		}
		return nil
	}
	
	func configureRefreshControl () {
		mileStoneCollectionView.refreshControl = UIRefreshControl()
		mileStoneCollectionView.refreshControl?.addTarget(self, action: #selector(handleRefreshControl), for: .valueChanged)
	}
	
	@objc func handleRefreshControl() {
		NotificationCenter.default.post(name: .mileStoneDidCreated, object: self)
		
		DispatchQueue.main.async {
			self.mileStoneCollectionView.refreshControl?.endRefreshing()
		}
	}
}

extension MileStoneViewController: UICollectionViewDelegate {
	func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
		let mileStone = dataSource.itemIdentifier(for: indexPath)
		guard let viewController = viewController(identifier: "MileStonePopUpViewController", type: MileStonePopUpViewController()) else { return }
		viewController.mileStone = mileStone
		self.present(viewController, animated: false, completion: nil)
	}
}
