//
//  UIView+addExternalBorder.swift
//  IssueTracker
//
//  Created by 강민석 on 2020/10/27.
//

import UIKit

extension UIView {

	struct Constants {
		static let ExternalBorderName = "externalBorder"
	}
	
	func addExternalBorder(content: String, borderWidth: CGFloat, whiteSpace: CGFloat = 0, borderColor: UIColor) {
		let externalBorder = CALayer()
		externalBorder.frame = CGRect(x: -(borderWidth + whiteSpace), y: -(borderWidth + whiteSpace), width: frame.size.width + (whiteSpace + borderWidth) * 2, height: frame.size.height + (whiteSpace + borderWidth) * 2)
		externalBorder.borderColor = borderColor.cgColor
		externalBorder.borderWidth = borderWidth
		externalBorder.cornerRadius = 4
		externalBorder.name = Constants.ExternalBorderName
		
		layer.insertSublayer(externalBorder, at: 0)
		print("\(content) \(externalBorder.frame)")
		layer.masksToBounds = false
	}

	func removeExternalBorders() {
		layer.sublayers?.filter() { $0.name == Constants.ExternalBorderName }.forEach() {
			$0.removeFromSuperlayer()
		}
	}

	func removeExternalBorder(externalBorder: CALayer) {
		guard externalBorder.name == Constants.ExternalBorderName else { return }
		externalBorder.removeFromSuperlayer()
	}

}
