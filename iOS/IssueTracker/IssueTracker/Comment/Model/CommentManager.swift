//
//  CommentManager.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/11.
//

import Foundation
import hvNetwork

class CommentManager {
    
    init() {
    }
    
    func create(id: Int, content: String) {
        let headers = ["Authorization": Constant.token]
        let parameters = ["content": content] as Parameters
        hvNet.request("http://49.50.163.58:3000/api/issue/\(id)/comment", method: .post, parameter: parameters, headers: headers).response { (result: HVDataResponse<Data?>) in
            switch result {
            case .success:
                NotificationCenter.default.post(name: .commentDidChanged, object: nil)
            case.failure(let error):
                print(error.localizedDescription)
            }
        }
    }
}

extension CommentManager {
    enum Constant {
        static let token = AppData.token
    }
}
