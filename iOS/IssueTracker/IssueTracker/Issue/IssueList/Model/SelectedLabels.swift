//
//  SelectedLabels.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/05.
//

import Foundation

class SelectedLabelTitle {
    
    var labelsTitle: Set<String>
    
    init() {
        labelsTitle = []
    }
    
    func update(name: String, clicked: Bool ) {
        if clicked {
            labelsTitle.insert(name)
        } else {
            labelsTitle.remove(name)
        }
    }
}
