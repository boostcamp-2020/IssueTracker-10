//
//  Environment.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/05.
//

import Foundation

public enum Environment {

    enum Keys {
      enum Plist {
        static let clientId = "CLIENT_ID"
        static let clientSecret = "CLIENT_SECRET"
		static let masterToken = "MASTER_TOKEN"
      }
    }
    
    private static let infoDictionary: [String: Any] = {
        guard let dict = Bundle.main.infoDictionary else {
            fatalError("Plist file not found")
        }
        return dict
    }()
    
    static let clientId: String = {
        guard let id = Environment.infoDictionary[Keys.Plist.clientId] as? String else {
            fatalError("API Key not set in plist for this environment")
        }
        return id
    }()
    static let clientSecret: String = {
        guard let secret = Environment.infoDictionary[Keys.Plist.clientSecret] as? String else {
            fatalError("API Key not set in plist for this environment")
        }
        return secret
    }()
	static let masterToken: String = {
		guard let token = Environment.infoDictionary[Keys.Plist.masterToken] as? String else {
			fatalError("API Key not set in plist for this environment")
		}
		return token
	}()
}
