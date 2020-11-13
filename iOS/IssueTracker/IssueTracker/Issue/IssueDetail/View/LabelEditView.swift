//
//  LabelEditView.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/11.
//

import UIKit

protocol LabelEditViewDelegate {
    func labelEditView(_ labelEditView: LabelEditView, didSelectedPlus: Bool)
}

class LabelEditView: UIView {
    
    var collectionView: UICollectionView!
    var dataSource: UICollectionViewDiffableDataSource<Section, Label>!
    enum Section {
        case main
    }
    let columnLayout = LeftAlignFlowLayout(
        minimumInteritemSpacing: 10,
        minimumLineSpacing: 10,
        sectionInset: UIEdgeInsets(top: 10, left: 10, bottom: 10, right: 10)
    )
    var delegate: LabelEditViewDelegate?
    var issue: Issue?
    var isEdit = false
    var addLabel = Label(id: -1, title: "  +  ", color: "#19426b")
    var labels: [Label] = [] {
        didSet {
            updateDataSource(labels: self.labels + [addLabel])
        }
    }
    
    init(issue: Issue?) {
        super.init(frame: CGRect.zero)
        self.issue = issue
        self.labels = issue?.labels ?? []
        commonInit()
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        commonInit()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        commonInit()
    }
    
    func commonInit() {
        let label = UILabel()
        label.text = "Label"
        label.font = UIFont.systemFont(ofSize: 17, weight: .medium)

        collectionView = UICollectionView(frame: CGRect.zero, collectionViewLayout: columnLayout)
        collectionView.delegate = self
        collectionView.translatesAutoresizingMaskIntoConstraints = false
        collectionView.register(LabelEditCollectionViewCell.self, forCellWithReuseIdentifier: "Cell")
        collectionView.collectionViewLayout = columnLayout
        collectionView.contentInsetAdjustmentBehavior = .always
        collectionView.isScrollEnabled = false
        collectionView.backgroundColor = .clear
        setupDatasource()
        addSubview(collectionView)
        addSubview(label)
        
        label.anchor(top: topAnchor, paddingTop: 10,
                     bottom: nil, paddingBottom: 0,
                     leading: leadingAnchor, paddingLeft: 10,
                     trailing: nil, paddingRight: 0,
                     width: 50, height: 21)

        collectionView.anchor(top: label.bottomAnchor, paddingTop: 10, bottom: bottomAnchor, paddingBottom: 0, leading: leadingAnchor, paddingLeft: 0, trailing: trailingAnchor, paddingRight: 0, width: 0, height: 0)
        
        NotificationCenter.default.addObserver(self, selector: #selector(editLabelBegin), name: .EditLabelBegin, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(editLabelEnd), name: .EditLabelEnd, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(updateIssueDetail), name: .issueDidChanged, object: nil)
    }
    
    func setupDatasource() {
        let cellProvider = { (collectionView: UICollectionView, indexPath: IndexPath, label: Label) -> UICollectionViewCell? in
            guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "Cell", for: indexPath) as? LabelEditCollectionViewCell
            else { return LabelEditCollectionViewCell() }
            
            if self.isEdit {
                cell.editLabelBegin()
            }
        
            let item = label
            cell.configure(item: item)
        
            return cell
        }
        dataSource = UICollectionViewDiffableDataSource<Section, Label>(collectionView: collectionView, cellProvider: cellProvider)
    }
    
    func updateDataSource(labels: [Label]) {
        DispatchQueue.main.async {
            var snapshot = NSDiffableDataSourceSnapshot<Section, Label>()
            snapshot.appendSections([.main])
            snapshot.appendItems(labels)
            self.dataSource.apply(snapshot, animatingDifferences: true)
        }
    }
    
    @objc func updateIssueDetail() {
        guard let id = issue?.id else { return }
        IssueManager().getIssueDetail(id: id, completion: { issueDetail in
            self.labels = issueDetail.labels
        })
    }
    
    @objc func editLabelBegin() {
        isEdit = true
    }
    
    @objc func editLabelEnd() {
        isEdit = false
    }
}

extension LabelEditView: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        
        if !isEdit && indexPath.row == labels.count {
            delegate?.labelEditView(self, didSelectedPlus: true)
        }
        if isEdit && indexPath.row != labels.count {
            let object: [String : Int?] = ["issueId": issue?.id, "labelId": labels[indexPath.row].id]
            NotificationCenter.default.post(name: .removeLabelOfIssue, object: object)
        }
    }
}
