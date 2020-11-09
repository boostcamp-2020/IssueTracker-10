//
//  IssueListViewCell.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/04.
//

import UIKit

class IssueListViewCell: UICollectionViewCell {

    @IBOutlet weak var infoImage: UIImageView!
    @IBOutlet weak var title: UILabel!
    @IBOutlet weak var desc: UILabel!
    @IBOutlet weak var containerView: UIView!
    @IBOutlet weak var labelListView: LabelListView!
    
    override func awakeFromNib() {
        super.awakeFromNib()
    }
    
    func configure(issue: Issue) {
        self.layer.cornerRadius = 10
        containerView.layer.borderWidth = 2
        containerView.layer.borderColor =
            UIColor(red: 0.8, green: 0.8, blue: 0.8, alpha: 0.4).cgColor
        containerView.layer.cornerRadius = 10
        title.text = issue.title
        desc.text = "#\(issue.id) \(agoTime(from: issue.createdAt)) opened by \(issue.user.username)"
        labelListView.labels = issue.labels
        if issue.state == 0 {
            infoImage.image = UIImage(systemName: "checkmark.circle")
            infoImage.tintColor = .systemRed
        }
    }
    
    func agoTime(from time: String) -> String {
        let formatter = DateFormatter()
        let format = "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
        formatter.dateFormat = format
        guard let date = formatter.date(from: time)?.toGlobalTime() else { return ""}
        let current = Date().toGlobalTime()
        let diffTime = timeDiffMeasure(current: current, from: date)
        return diffTime
    }
    
    func timeDiffMeasure(current: Date, from privious: Date) -> String {
        let s: Double = 60, m = s * s, h = m * 24, d = h * 365
        let diff = current.timeIntervalSince1970 - privious.timeIntervalSince1970
        switch diff {
        case let second where second < s:
            return "\(Int(second)) second ago"
        case let minute where minute < m:
            return "\(Int(minute / s)) minute ago"
        case let hour where hour < h:
            return "\(Int(hour / m)) hour ago"
        case let day where day < d:
            return "\(Int(day / h)) day ago"
        default:
            return ""
        }
    }

    override func prepareForReuse() {
        title.text = ""
        desc.text = ""
        infoImage.image = UIImage(systemName: "info.circle")
        infoImage.tintColor = .systemBlue
        labelListView.prepareForReuse()
    }
}
