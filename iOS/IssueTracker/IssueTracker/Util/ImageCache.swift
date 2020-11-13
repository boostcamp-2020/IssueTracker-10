//
//  ImageCache.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/11.
//

import UIKit

class ImageCache {

    let imageCache = NSCache<NSURL, UIImage>()
    static let shared = ImageCache()
    
    private init(){
        
    }
    
    func downloadImage(url: URL, callback: @escaping(_ itemImage: UIImage) -> Void) {
        if let imageFromCache = imageCache.object(forKey: url as NSURL) { callback(imageFromCache); return }
        var image: UIImage = #imageLiteral(resourceName: "Icon")
        DispatchQueue.global().async {
            guard let data = try? Data(contentsOf: url) else { callback(image); return }
            if let downloadedImage = UIImage(data: data) {
                image = downloadedImage
                self.imageCache.setObject(image, forKey: url as NSURL)
            }
            callback(image)
        }
    }
}
