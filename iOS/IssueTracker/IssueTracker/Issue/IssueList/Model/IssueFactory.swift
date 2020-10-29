//
//  IssueFactory.swift
//  IssueTracker
//
//  Created by 채훈기 on 2020/10/29.
//

import Foundation

class IssueFactory {
    
    
    private init() {
        
    }
    
    private static var titles = ["first제목이 미친듯이 길면 안되나보네 그러면 이거는",
                   "seconde Title",
                   "레이블 목록 보기 구현",
                   "iOS는 뭘 할까요",
                   "Web은 뭘 할까요",
                   "스크롤을위해1",
                   "스크롤을위해2",
                   "스크롤을위해3",
                   ]
    
    private static var desc = ["firstDescription",
                "secondDescription\n이건좀 길지 않나요 점점점으로 표시가 될까요 알아맞춰보세요 딩동댕동",
                "레이블 전체목록을 볼 수 있어야 한다.\n2줄까지 보입니다.\n이건 안보여",
                "DiffableDataSource\n너무 어려워요",
                "No description\nNo descriptoin",
                "hello world",
                "import foundaion",
                "DiffableDataSource\n너무 어려워요",
    ]
    
    private static var labels = [["ios"],["web"],["web"],["web"],["web"],["web"],["web"],["web"]]
            
    
    static func make(count: Int) -> [Issue] {
        guard count > 0 || count < 9 else { return [] }
        return (0..<count).map { Issue(id: $0,
                                       title: titles[$0],
                                       author: $0,
                                       state: 0,
                                       milestoneId: 1000,
                                       createdAt: Date(),
                                       updatedAt: Date(),
                                       description: desc[$0],
                                       labels: labels[$0])}
    }
}
