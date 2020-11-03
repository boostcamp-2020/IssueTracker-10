//
//  IssueViewController+FlowLayout.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/03.
//

import UIKit

extension IssueViewController: UICollectionViewDelegateFlowLayout {
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: view.frame.width, height: 170)
    }
    
    
}
