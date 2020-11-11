//
//  IssueDetailViewController.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/10/27.
//

import UIKit

class IssueDetailViewController: UIViewController {

    @IBOutlet weak var collectionView: UICollectionView!
    var pullUPView: DetailPullUpView!
    var viewModel: IssueDetailViewModel!
    var issue: Issue!

    override func viewDidLoad() {
        super.viewDidLoad()
        viewModel = IssueDetailViewModel(reactor: IssueDetailReactor(),
                                         state: IssueDetailState(issue: issue))
        configureCollectionView()
        setupUI()
        binding() // after setupUI
    }
    
    func setupUI() {
        pullUPView = DetailPullUpView(frame: CGRect(x: 0, y: view.frame.height - 120, width: view.frame.width, height: 120), issue: issue)
        let pullupHeightcontraint = pullUPView.heightAnchor.constraint(equalToConstant: 120)
        pullupHeightcontraint.isActive = true
        pullUPView.heightConstraint = pullupHeightcontraint
        
        view.addSubview(pullUPView)
        
        pullUPView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            pullUPView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            pullUPView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            pullUPView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
    }
    
    func binding() {
        viewModel.updateClosure = { state in
            DispatchQueue.main.async {
                self.collectionView.reloadData()
                self.pullUPView.labelEdit.labels = state.issue.labels
            }
        }
        pullUPView.commentDidTouched = {
            let mainStoryboard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
            if let vc = mainStoryboard.instantiateViewController(withIdentifier: "CommentCreateViewController") as? CommentCreateViewController {
                vc.issueID = self.issue.id
                self.present(vc, animated: true, completion: nil)
            }
        }
        viewModel.requestIssueDetail(id: issue.id)
    }
}
