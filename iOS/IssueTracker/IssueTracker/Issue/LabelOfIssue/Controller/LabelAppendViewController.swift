//
//  LabelOfIssueCreateViewController.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/12.
//

import UIKit

class LabelAppendViewController: UIViewController {
   
    let containerView = UIView()
    var issue: Issue!
    var totalLabel: [Label] = []
    var filteredLabel: [Label] {
        get { totalLabel.filter{ !issue.labels.contains($0) } }
    }
    var collectionView: UICollectionView!

    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = UIColor.gray.withAlphaComponent(0.5)
        setupUI()
        LabelManager().get(completion: { labels in
            self.totalLabel = labels
            DispatchQueue.main.async {
                self.collectionView.reloadData()
            }
        })
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
}
