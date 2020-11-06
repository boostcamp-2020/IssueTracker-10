//
//  UIColor+isDark.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/04.
//

import UIKit

extension UIColor {
    var isDark: Bool {
        var red: CGFloat = 0
        var green: CGFloat = 0
        var blue: CGFloat = 0
        var alpha: CGFloat = 0
        
        getRed(&red, green: &green, blue: &blue, alpha: &alpha)
        return ((red + green + blue) * 255) < (255 * 3) / 2
    }
}
