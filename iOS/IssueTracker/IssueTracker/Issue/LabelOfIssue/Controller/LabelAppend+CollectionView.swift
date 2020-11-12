//
//  LabelOfIssue+CollectionView.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/12.
//

import UIKit

extension LabelAppendViewController: UICollectionViewDataSource {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return viewModel.state.filteredLabel.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
    
        guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "Cell", for: indexPath) as? LabelAppendCollectionViewCell else { return UICollectionViewCell() }
        cell.configure(label: viewModel.state.filteredLabel[indexPath.row])
        return cell
    }
}

extension LabelAppendViewController: UICollectionViewDelegate {
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let issueId = viewModel.state.issueId
        let labelId = viewModel.state.filteredLabel[indexPath.row].id
        viewModel.requestAppendLabel(issueId: issueId, labelId: labelId)
    }
}

extension LabelAppendViewController: UICollectionViewDelegateFlowLayout {
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: collectionView.frame.width * 0.8, height: 60)
    }
}
