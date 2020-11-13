//
//  SelectedLabels.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/05.
//

import Foundation

class SelectedLabels {
    
    static let shared = SelectedLabels()
    var labelsTitle: [String] = [] {
        didSet {
            NotificationCenter.default.post(name: .selectedLabelChanged, object: nil)
        }
    }
    
    private init() {
        NotificationCenter.default.addObserver(self, selector: #selector(labelToggled), name: .labelDidToggled, object: nil)
    }
    
    @objc private func labelToggled(_ notification: Notification) {
        if let object = notification.object as? [String: Any] {
            guard let name = object["title"] as? String,
                  let clicked = object["clicked"] as? Bool else { return }
            
            if clicked {
                if !labelsTitle.contains(name){
                    labelsTitle.append(name)
                }
            } else {
                guard let idx = labelsTitle.firstIndex(of: name) else { return }
                labelsTitle.remove(at: idx)
            }
        }
    }
    
    func contains(title: String) -> Bool {
        return labelsTitle.contains(title)
    }
}
