//
//  Coderator.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/03.
//

import Foundation

class Coderator {
	
	enum Key: String {
		case user = "user"
	}
	
	func save<T:Encodable> (with user: T, key: Key) {
		guard let data = try? JSONEncoder().encode(user) else { return }
		UserDefaults.standard.set(data, forKey: key.rawValue)
	}
	
	func load<T:Decodable> (key: Key) -> T? {
		guard let data = UserDefaults.standard.object(forKey: key.rawValue) as? Data else { return nil }
		guard let user = try? JSONDecoder().decode(T.self, from: data) else { return nil }
		return user
	}
}
