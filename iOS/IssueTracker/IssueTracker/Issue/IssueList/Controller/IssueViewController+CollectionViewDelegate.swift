//
//  IssueViewController+CollectionViewDelegate.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/03.
//

import UIKit

extension IssueViewController: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, shouldBeginMultipleSelectionInteractionAt indexPath: IndexPath) -> Bool {
        return true
    }
    
    func collectionView(_ collectionView: UICollectionView, didBeginMultipleSelectionInteractionAt indexPath: IndexPath) {
        self.setEditing(true, animated: true)
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        guard isEditing == true else {
            presentViewController(identifier: "IssueDetailViewController", type: IssueDetailViewController(), option: .push)
            return
        }
        
        let cell = collectionView.cellForItem(at: indexPath)
        if cell?.isSelected == true {
            cell?.backgroundColor = UIColor.systemGray6
        }
		else {
			cell?.backgroundColor = nil
		}
    }
    
    func collectionView(_ collectionView: UICollectionView, didDeselectItemAt indexPath: IndexPath) {
        let cell = collectionView.cellForItem(at: indexPath)
        cell?.backgroundColor = nil
    }
}
