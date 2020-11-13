//
//  CommentCreateReactor.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/11/11.
//

import Foundation

class CommentCreateReactor {
    
    var sideEffect: ((CommentCreateState)-> Void)?
    
    enum Action {
        case requestCommentCreate(Int, String)
    }
    
    func execute(action: Action, currentState: CommentCreateState) -> CommentCreateState {
        switch action {
        case .requestCommentCreate(let id, let text):
            CommentManager().create(id: id, content: text)
            return currentState
        }
    }
}
