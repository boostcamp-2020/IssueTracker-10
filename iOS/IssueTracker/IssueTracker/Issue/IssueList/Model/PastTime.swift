//
//  PastTime.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/10.
//

import Foundation

class PastTime {
    
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
            return "\(Int(second)) seconds ago"
        case let minute where minute < m:
            return "\(Int(minute / s)) minutes ago"
        case let hour where hour < h:
            return "\(Int(hour / m)) hours ago"
        case let day where day < d:
            return "\(Int(day / h)) days ago"
        default:
            return ""
        }
    }
}
