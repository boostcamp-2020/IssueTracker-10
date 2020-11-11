//
//  IssueDetailViewController.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/10/27.
//

import UIKit

class IssueDetailViewController: UIViewController {

    @IBOutlet weak var collectionView: UICollectionView!
    @IBOutlet weak var pullUPView: DetailPullUpView!
    
    var issue: Issue!
    var viewModel: IssueDetailViewModel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        viewModel = IssueDetailViewModel(reactor: IssueDetailReactor(),
                                         state: IssueDetailState(issue: issue))
        configureCollectionView()
        binding()
        pullUPView.commentDidTouched = {
            let mainStoryboard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
            if let vc = mainStoryboard.instantiateViewController(withIdentifier: "CommentCreateViewController") as? CommentNavigationViewController {
                self.present(vc, animated: true, completion: nil)
            }
        }
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
