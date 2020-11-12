//
//  CommentCreateViewModel.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/11.
//

import Foundation

class CommentCreateViewModel {
    
    let reactor: CommentCreateReactor
    var state: CommentCreateState
    var updateClosure: ((CommentCreateState) -> Void)?
        
    init(reactor: CommentCreateReactor, state: CommentCreateState) {
        self.reactor = reactor
        self.state = state
    }
    
    func requestCreateComment(id: Int, content: String) {
        reactor.execute(action: .requestCommentCreate(id, content), currentState: state)
    }
}
