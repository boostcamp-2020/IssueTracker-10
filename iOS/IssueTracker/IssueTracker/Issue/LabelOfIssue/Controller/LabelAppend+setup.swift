//
//  LabelOfIssue+UI.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/12.
//

import UIKit

extension LabelAppendViewController {
    func setupUI() {
        containerView.layer.cornerRadius = 50
        containerView.backgroundColor = .white
        containerView.translatesAutoresizingMaskIntoConstraints = false
        
        collectionView = UICollectionView(frame: .zero, collectionViewLayout: UICollectionViewFlowLayout())
        collectionView.register(UINib(nibName: "LabelAppendCollectionViewCell", bundle: nil), forCellWithReuseIdentifier: "Cell")
        collectionView.delegate = self
        collectionView.backgroundColor = .clear
        
        containerView.addSubview(collectionView)
        view.addSubview(containerView)
        
        NSLayoutConstraint.activate([
            containerView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            containerView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            containerView.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8),
            containerView.heightAnchor.constraint(equalTo: containerView.widthAnchor)
        ])

        collectionView.anchor(top: containerView.topAnchor, paddingTop: 10, bottom: containerView.bottomAnchor, paddingBottom: 10, leading: containerView.leadingAnchor, paddingLeft: 10, trailing: containerView.trailingAnchor, paddingRight: 10, width: 0, height: 0)
    }
    
    enum Section {
        case main
    }
    
    func setupDatasource() {
        let cellProvider = { (collectionView: UICollectionView, indexPath: IndexPath, label: Label) -> UICollectionViewCell? in
            guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "Cell", for: indexPath) as? LabelAppendCollectionViewCell else { return UICollectionViewCell() }
            cell.configure(label: label)
            return cell
        }
        dataSource = UICollectionViewDiffableDataSource<Section, Label>(collectionView: collectionView, cellProvider: cellProvider)
    }
}
