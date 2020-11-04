//
//  IssueViewController+FlowLayout.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/03.
//

import UIKit

extension IssueViewController: UICollectionViewDelegateFlowLayout {
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        let maxLine: CGFloat = 2
        let totalWidth = viewModel.issues[indexPath.row].labels.map {
            $0.title.widthOfString(usingFont: UIFont.systemFont(ofSize: 13, weight: .semibold))
            }
            .map { $0 + CGFloat(40) }
            .reduce(0) { $0 + $1 }
        
        let lines = min(maxLine, ceil(totalWidth / view.frame.width))
        
        return CGSize(width: view.frame.width * 0.9, height: 100 + 36 * lines)
    }
}
