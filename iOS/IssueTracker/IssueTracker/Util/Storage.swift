//
//  Storage.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/11/03.
//

import Foundation

@propertyWrapper
struct Storage<T: Codable> {
	private let key: String
	private let defaultValue: T
	
	init(key: String, defaultValue: T) {
		self.key = key
		self.defaultValue = defaultValue
	}
	
	var wrappedValue: T {
		get {
			guard let data = UserDefaults.standard.object(forKey: key) as? Data else { return defaultValue }
			guard let value = try? JSONDecoder().decode(T.self, from: data) else { return defaultValue}
			return value
		}
		set {
			let data = try? JSONEncoder().encode(newValue)
			UserDefaults.standard.set(data, forKey: key)
		}
	}
}
