//
//  Constant.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/05.
//

import Foundation

struct Constant {
    struct Github {
        static let accessTokenURL = "https://github.com/login/oauth/access_token"
        static let userAPIURL = "https://api.github.com/user"
        static func authorizeURL(id: String) -> String {
            return "https://github.com/login/oauth/authorize?client_id=\(id)"
        }
    }
}
