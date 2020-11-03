//
//  IssueCollectionViewCell.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/10/27.
//

import UIKit

class IssueCollectionViewCell: UICollectionViewCell {
	@IBOutlet weak var title: UILabel!
	@IBOutlet weak var milestone: UILabel!
    @IBOutlet weak var collectionView: UICollectionView!
    
    let columnLayout = FlowLayout(
        minimumInteritemSpacing: 10,
        minimumLineSpacing: 10,
        sectionInset: UIEdgeInsets(top: 10, left: 10, bottom: 10, right: 10)
    )
    var labels: [String] = []
    
	override func prepareForReuse() {
		super.prepareForReuse()
		title.text = nil
		milestone.text = nil
		milestone.removeExternalBorders()
	}
	
    override func awakeFromNib() {
        collectionView.register(LabelCollectionViewCell.self, forCellWithReuseIdentifier: "Cell")
        collectionView.collectionViewLayout = columnLayout
        collectionView.contentInsetAdjustmentBehavior = .always
        collectionView.dataSource = self
        labels = ["web","ios","document","hehehehelwowo"]
    }
    
	func configure(issue: Issue) {
		setTitle(with: issue.title)
		setMilestone(with: "\(issue.milestoneId)")
	}
	
	private func setTitle(with name: String) {
		title.text = name
	}
	
	private func setMilestone(with name: String) {
		milestone.text = name
		layoutIfNeeded() // layer는 자동으로 안바뀌는 듯 하다		
		milestone.addExternalBorder(content: name, borderWidth: 2, whiteSpace: 2, borderColor: UIColor.systemGray2)
	}
}

extension IssueCollectionViewCell: UICollectionViewDataSource {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return labels.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "Cell", for: indexPath) as! LabelCollectionViewCell
        cell.label.text = labels[indexPath.row]
        cell.layer.cornerRadius = cell.frame.height / 4
        cell.clipsToBounds = true
        return cell
    }
}
