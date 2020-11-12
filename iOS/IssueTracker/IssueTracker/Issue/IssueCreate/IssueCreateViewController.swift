//
//  IssueCreateViewController.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/10/27.
//

import UIKit

class IssueCreateViewController: UIViewController {


    @IBOutlet weak var titleTextFeild: UITextField!
    @IBOutlet weak var textView: UITextView!
    let manager = IssueManager()

    override func viewDidLoad() {
        super.viewDidLoad()
        navigationController?.navigationBar.prefersLargeTitles = true
        placeholderSetting()
    }
    func placeholderSetting() {
        textView.text = "comment"
        textView.layer.cornerRadius = 10
        textView.textColor = UIColor.lightGray
        textView.layer.borderWidth = 2
        textView.layer.borderColor =
            UIColor(red: 0.8, green: 0.8, blue: 0.8, alpha: 0.4).cgColor
    }
    
    @IBAction func closeButtonTouched(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
    @IBAction func doneButtonTouched(_ sender: Any) {
        guard let title = titleTextFeild.text, title != "" else {
            titleTextFeild.shake()
            return }
        manager.create(title: title, content: textView.text)
        self.dismiss(animated: true, completion: nil)
    }
}

extension IssueCreateViewController: UITextViewDelegate {
    
    func textViewDidBeginEditing(_ textView: UITextView) {
        if textView.textColor == UIColor.lightGray {
            textView.text = nil
            textView.textColor = UIColor.black
        }
    }
    
    func textViewDidEndEditing(_ textView: UITextView) {
        if textView.text.isEmpty {
            textView.text = "comment"
            textView.textColor = UIColor.lightGray
        }
    }
}
