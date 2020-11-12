//
//  DetailAnimator.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/12.
//

import UIKit

class Animator: NSObject, UIViewControllerAnimatedTransitioning {

    static let duration: TimeInterval = 1.25

    private let type: PresentationType
    private let firstViewController: IssueDetailViewController
    private let secondViewController: LabelAppendViewController
    
    init?(type: PresentationType, first: IssueDetailViewController, second: LabelAppendViewController) {
        self.type = type
        self.firstViewController = first
        self.secondViewController = second
    }


    func transitionDuration(using transitionContext: UIViewControllerContextTransitioning?) -> TimeInterval {
        return Self.duration
    }
    
    func animateTransition(using transitionContext: UIViewControllerContextTransitioning) {
        
        let containerView = transitionContext.containerView

        guard let toView = secondViewController.view
            else {
                transitionContext.completeTransition(false)
                return
        }

        toView.alpha = 0
        containerView.addSubview(toView)

        let temp = secondViewController.containerView
        temp.backgroundColor = .white
        containerView.addSubview(temp)
        
        UIView.animate(withDuration: Self.duration, animations: {
            temp.transform = CGAffineTransform(scaleX: 0.8, y: 0.8)
        },
        
        completion: { _ in
            temp.removeFromSuperview()
            toView.alpha = 1
            temp.transform = .identity
            transitionContext.completeTransition(true)
        })
    }
}

enum PresentationType {

    case present
    case dismiss

    var isPresenting: Bool {
        return self == .present
    }
}

