//
//  IssueDetailViewController+.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/12.
//

import UIKit

extension IssueDetailViewController: LabelEditViewDelegate {
    func labelEditView(_ labelEditView: LabelEditView, didSelectedPlus: Bool) {
        let VC = LabelOfIssueCreateViewController()
        VC.modalPresentationStyle = .overCurrentContext
        VC.transitioningDelegate = self
        VC.issue = self.issue
        self.present(VC, animated: false, completion: {})
    }
}


extension IssueDetailViewController: UIViewControllerTransitioningDelegate {
    func animationController(forPresented presented: UIViewController, presenting: UIViewController, source: UIViewController) -> UIViewControllerAnimatedTransitioning? {
        return nil
    }

    func animationController(forDismissed dismissed: UIViewController) -> UIViewControllerAnimatedTransitioning? {
        return nil
    }
}
