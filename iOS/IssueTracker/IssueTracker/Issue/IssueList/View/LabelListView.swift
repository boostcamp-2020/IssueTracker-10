//
//  LabelListView.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/04.
//

import UIKit

class LabelListView: UIView {

    var collectionView: UICollectionView!
    var labels: [Label] = []
    let columnLayout = LeftAlignFlowLayout(
        minimumInteritemSpacing: 10,
        minimumLineSpacing: 10,
        sectionInset: UIEdgeInsets(top: 10, left: 10, bottom: 10, right: 10)
    )
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setup()
    }
    
    func setup() {
        collectionView = UICollectionView(frame: CGRect.zero, collectionViewLayout: columnLayout)
        collectionView.dataSource = self
        collectionView.delegate = self
        collectionView.translatesAutoresizingMaskIntoConstraints = false
        collectionView.register(LabelCollectionViewCell.self, forCellWithReuseIdentifier: "Cell")
        collectionView.collectionViewLayout = columnLayout
        collectionView.contentInsetAdjustmentBehavior = .always
        collectionView.isScrollEnabled = false
        collectionView.backgroundColor = .clear

        addSubview(collectionView)
        
        NSLayoutConstraint.activate([
            collectionView.topAnchor.constraint(equalTo: topAnchor),
            collectionView.bottomAnchor.constraint(equalTo: bottomAnchor),
            collectionView.leadingAnchor.constraint(equalTo: leadingAnchor),
            collectionView.trailingAnchor.constraint(equalTo: trailingAnchor),
        ])
    }
    func prepareForReuse() {
        labels = []
        collectionView.reloadData()
    }
}

extension LabelListView: UICollectionViewDataSource {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return labels.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "Cell", for: indexPath) as! LabelCollectionViewCell
        let item = labels[indexPath.row]
        cell.configure(item: item)
        return cell
    }
}

extension LabelListView: UICollectionViewDelegate {

    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        
        guard
            let cell = collectionView.cellForItem(at: indexPath) as? LabelCollectionViewCell,
            let text = cell.label.text else { return }
        cell.toggle()
        let object: [String : Any] = ["title": text, "clicked": cell.isclicked]
        NotificationCenter.default.post(name: .labelDidToggled, object: object)
    }
}
