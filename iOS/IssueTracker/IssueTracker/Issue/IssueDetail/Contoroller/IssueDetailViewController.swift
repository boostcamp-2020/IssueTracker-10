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
	var dataSource: IssueDetailDataSource!
    var viewModel: IssueDetailViewModel!
    var issue: Issue!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.transitioningDelegate = self
		configureCollectionView()
		viewModel = IssueDetailViewModel(reactor: IssueDetailReactor(),
										 state: IssueDetailState(issue: issue))
		dataSource = IssueDetailDataSource(collectionView: collectionView, issue: issue)
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
			self.dataSource.updateDataSource(comments: state.comments)
			self.pullUPView.labelEdit.labels = state.issue.labels
        }
        pullUPView.commentDidTouched = {
            self.presentCreateViewController(issue: self.issue)
        }
        viewModel.requestIssueDetail(id: issue.id)
        pullUPView.labelEdit.delegate = self
    }
    
    func presentCreateViewController(issue: Issue) {
        let mainStoryboard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
        guard let vc = mainStoryboard.instantiateViewController(withIdentifier: "CommentCreateViewController")
                as? CommentCreateViewController else { return }
        vc.issueID = issue.id
        self.present(vc, animated: true, completion: nil)
    }
}
