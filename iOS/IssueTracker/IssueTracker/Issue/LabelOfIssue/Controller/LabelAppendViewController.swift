//
//  LabelOfIssueCreateViewController.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/12.
//

import UIKit

class LabelAppendViewController: UIViewController {
   
    let containerView = UIView()
    var issueDetail: IssueDetail!
    var collectionView: UICollectionView!
    var viewModel = LabelAppendViewModel(reactor: LabelAppendReactor(), state: LabelAppendState())
    var dataSource: UICollectionViewDiffableDataSource<Section, Label>!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = UIColor.gray.withAlphaComponent(0.5)
        setupUI()
        viewModel.state.issueDetail = issueDetail
        viewModel.requestGetAllLabel()
        binding()
        setupDatasource()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        self.containerView.transform = CGAffineTransform(scaleX: 0.8, y: 0.8)
        UIView.animate(withDuration: 0.16, animations: {
            self.containerView.transform = .identity
        })
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        guard let touch = touches.first else { return }
        if touch.view != containerView {
            self.dismiss(animated: false, completion: nil)
        }
    }
    
    func binding() {
        viewModel.updateClosure = { state in
            self.updateDataSource(labels: state.filteredLabel)
        }
    }
    
    func updateDataSource(labels: [Label]) {
        DispatchQueue.main.async {
            var snapshot = NSDiffableDataSourceSnapshot<Section, Label>()
            snapshot.appendSections([.main])
            snapshot.appendItems(labels)
            self.dataSource.apply(snapshot, animatingDifferences: true)
        }
    }
}
