//
//  Environment.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/05.
//

import Foundation

public enum Environment {

    private static let infoDictionary: [String: Any] = {
        guard let dict = Bundle.main.infoDictionary else {
            fatalError("Plist file not found")
        }
        return dict
    }()
    
    static let clientId: String = {
        guard let id = Environment.infoDictionary["CLIENT_ID"] as? String else {
            fatalError("API Key not set in plist for this environment")
        }
        return id
    }()
    static let clientSecret: String = {
        guard let secret = Environment.infoDictionary["CLIENT_SECRET"] as? String else {
            fatalError("API Key not set in plist for this environment")
        }
        return secret
    }()
}
