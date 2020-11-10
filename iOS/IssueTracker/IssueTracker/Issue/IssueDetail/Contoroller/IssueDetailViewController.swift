//
//  IssueDetailViewController.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/10/27.
//

import UIKit

class IssueDetailViewController: UIViewController {

    @IBOutlet weak var collectionView: UICollectionView!

    var issue: Issue!
    var viewModel: IssueDetailViewModel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        viewModel = IssueDetailViewModel(reactor: IssueDetailReactor(),
                                         state: IssueDetailState(issue: issue))
        configureCollectionView()
        binding()
    }
    
    func binding() {
        viewModel.updateClosure = { state in
            DispatchQueue.main.async {
                self.collectionView.reloadData()
            }
        }
        viewModel.requestIssueDetail(id: issue.id)
    }
}
