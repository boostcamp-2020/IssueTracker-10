//
//  IssueDataSource.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/10/29.
//

import UIKit

class IssueDiffableDataSource {

    var dataSource: UICollectionViewDiffableDataSource<Section, Issue>!
    let collectionView: UICollectionView
    
    init(collectionView: UICollectionView) {
        self.collectionView = collectionView
        configureDataSource()
    }
    
    enum Section: CaseIterable {
        case main
    }
    
    struct Identifier {
        static let issueCell = "IssueCell"
    }
    
    func configureDataSource() {
        let cellProvider = { (collectionView: UICollectionView, indexPath: IndexPath, issue: Issue) -> UICollectionViewCell? in
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: Identifier.issueCell, for: indexPath)
            if let issueCell = cell as? IssueListViewCell {
                issueCell.configure(issue: issue)
                return issueCell
            }
            return nil
        }
        
        dataSource = UICollectionViewDiffableDataSource<Section, Issue>(collectionView: collectionView, cellProvider: cellProvider)
    }
    
    func performQuery(issues: [Issue], filter: IssueCriteria?) {
        
        var data = issues
        if let filter = filter {
            data = filter.apply(issues: issues)
        }
        updateDataSource(issues: data)
    }
    
    func updateDataSource(issues: [Issue]) {
        DispatchQueue.main.async {
            var snapshot = NSDiffableDataSourceSnapshot<Section, Issue>()
            snapshot.appendSections([.main])
            snapshot.appendItems(issues)
            self.dataSource.apply(snapshot, animatingDifferences: true)
        }
    }
    
    func itemIdentifier(for indexPath: IndexPath) -> Issue? {
        return dataSource.itemIdentifier(for: indexPath)
    }
}
