//
//  CommentCreateViewController.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/11.
//

import UIKit

class CommentCreateViewController: UIViewController {

    @IBOutlet weak var textView: UITextView!
    var issueID: Int!
    let viewModel = CommentCreateViewModel(reactor: CommentCreateReactor(),
                                           state: CommentCreateState())
    
    override func viewDidLoad() {
        super.viewDidLoad()
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
        if textView.text == "comment" || textView.text == "" {
            return
        }
        viewModel.requestCreateComment(id: issueID, content: textView.text)
        self.dismiss(animated: true, completion: nil)
    }
}
extension CommentCreateViewController: UITextViewDelegate {
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
