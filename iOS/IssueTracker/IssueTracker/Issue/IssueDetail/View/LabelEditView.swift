//
//  LabelEditView.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/11.
//

import UIKit

class LabelEditView: UIView {
    
    var collectionView: UICollectionView!
    let columnLayout = LeftAlignFlowLayout(
        minimumInteritemSpacing: 10,
        minimumLineSpacing: 10,
        sectionInset: UIEdgeInsets(top: 10, left: 10, bottom: 10, right: 10)
    )
    var issue: Issue?
    var isEdit = false
    let editButton = UIButton()
    var labels: [Label] = [] {
        didSet {
            collectionView.reloadData()
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
        
        editButton.setTitle("Edit", for: .normal)
        editButton.setTitleColor(.black, for: .normal)
        editButton.setTitleColor(.systemGray, for: .highlighted)
        editButton.titleLabel?.font = UIFont.systemFont(ofSize: 17, weight: .medium)
        editButton.addTarget(self, action: #selector(editButtonTouch), for: .touchDown)
        
        collectionView = UICollectionView(frame: CGRect.zero, collectionViewLayout: columnLayout)
        collectionView.dataSource = self
        collectionView.delegate = self
        collectionView.translatesAutoresizingMaskIntoConstraints = false
        collectionView.register(LabelEditCollectionViewCell.self, forCellWithReuseIdentifier: "Cell")
        collectionView.collectionViewLayout = columnLayout
        collectionView.contentInsetAdjustmentBehavior = .always
        collectionView.isScrollEnabled = false
        collectionView.backgroundColor = .clear

        addSubview(collectionView)
        addSubview(label)
        addSubview(editButton)
        
        label.anchor(top: topAnchor, paddingTop: 10,
                     bottom: nil, paddingBottom: 0,
                     leading: leadingAnchor, paddingLeft: 10,
                     trailing: nil, paddingRight: 0,
                     width: 50, height: 21)
        editButton.anchor(top: topAnchor, paddingTop: 10,
                    bottom: nil, paddingBottom: 0,
                    leading: nil, paddingLeft: 0,
                    trailing: trailingAnchor, paddingRight: 10,
                    width: 50, height: 21)
        
        collectionView.anchor(top: label.bottomAnchor, paddingTop: 10, bottom: bottomAnchor, paddingBottom: 0, leading: leadingAnchor, paddingLeft: 0, trailing: trailingAnchor, paddingRight: 0, width: 0, height: 0)
    }

    @objc func editButtonTouch() {
        isEdit.toggle()
        if isEdit {
            NotificationCenter.default.post(name: .EditLabelBegin, object: nil)
            editButton.setTitle("done", for: .normal)
        } else {
            NotificationCenter.default.post(name: .EditLabelEnd, object: nil)
            editButton.setTitle("Edit", for: .normal)
        }
    }
}

extension LabelEditView: UICollectionViewDelegate, UICollectionViewDataSource {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return labels.count + 1
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {

        guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "Cell", for: indexPath) as? LabelEditCollectionViewCell
        else { return LabelEditCollectionViewCell() }
        
        if indexPath.row == labels.count {
            cell.configure(item: Label(id: -1, title: "  +  ", color: "#cccccc"))
            cell.backgroundColor = .black
            return cell
        }
        
        let item = labels[indexPath.row]
        cell.configure(item: item)
        if isEdit {
            cell.editLabelBegin()
        }
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        if indexPath.row == labels.count {
            print("plus")
        }
        
        if isEdit {
            let object: [String : Int?] = ["issueId": issue?.id, "labelId": labels[indexPath.row].id]
            NotificationCenter.default.post(name: .removeLabelOfIssue, object: object)
        }
    }
}
