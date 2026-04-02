//
//  PageViewController.swift
//  demo
//
//  Created by yang.chuan on 2026/3/29.
//

import UIKit

class PageViewController: BaseViewController {
    
    static func GetPageViewController() -> PageViewController {
        return PageViewController()
    }
    
    class MyUISearchController:UISearchController {
        override var searchBarPlacement: UINavigationItem.SearchBarPlacement {
            get {
                UINavigationItem.SearchBarPlacement.stacked
            }
        }
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .systemBackground
        title = "PageViewController"
        let vc = ViewController()
        
        
        let serach = MyUISearchController(searchResultsController:vc )
        serach.showsSearchResultsController = true
        serach.searchBar.showsScopeBar = true
        serach.searchBar.scopeButtonTitles = ["abc"]
//        serach.hidesNavigationBarDuringPresentation = false
        Task{
            vc.view.backgroundColor = .red
        }
        // 递归查找容器
        func findScopeContainer(in view: UIView) -> UIView? {
            if NSStringFromClass(type(of: view)).contains("ScopeContainerView") {
                return view
            }
            for subview in view.subviews {
                if let found = findScopeContainer(in: subview) {
                    return found
                }
            }
            return nil
        }
        
        if let scopeContainer = findScopeContainer(in: serach.searchBar) {
            // 1. 隐藏原有的 Scope 控制器（通常是 UISegmentedControl）
            scopeContainer.subviews.forEach { $0.isHidden = true }
            scopeContainer.superview?.bringSubviewToFront(scopeContainer)
            // 2. 插入自定义 FilterBar
            let filterBar = createFilterView()
            filterBar.frame = scopeContainer.bounds
            filterBar.autoresizingMask = [.flexibleWidth, .flexibleHeight]
            scopeContainer.addSubview(filterBar)
        }
       
        
        navigationItem.searchController = serach
        navigationItem.hidesSearchBarWhenScrolling = false
        navigationItem.largeTitleDisplayMode = .never
        navigationItem.backButtonTitle = "返回"
        // Do any additional setup after loading the view.
        
        let scrollView = UIScrollView()
        view.addSubview(scrollView)
        scrollView.snp.makeConstraints { make in
            make.edges.equalToSuperview()
        }
        
        let stackView = UIStackView()
        stackView.alignment = .center
        stackView.distribution = .fill
        stackView.axis = .vertical
        scrollView.addSubview(stackView)
        stackView.snp.makeConstraints { make in
            make.leading.trailing.equalTo(scrollView.frameLayoutGuide)
            make.top.bottom.equalTo(scrollView.contentLayoutGuide)
        }
        
        let view1 = UIView()
        view1.backgroundColor = .red
        stackView.addArrangedSubview(view1)
        view1.snp.makeConstraints { make in
            make.top.equalToSuperview()
            make.leading.trailing.equalToSuperview().inset(20)
            make.height.equalTo(view1.snp.width)
        }
        let view2 = UIView()
        view2.backgroundColor = .blue
        stackView.addArrangedSubview(view2)
        view2.snp.makeConstraints { make in
            make.top.equalTo(view1.snp.bottom).offset(20)
            make.leading.trailing.equalTo(view1)
            make.height.equalTo(view2.snp.width)
        }
        let view3 = UIView()
        view3.backgroundColor = .green
        stackView.addArrangedSubview(view3)
        view3.snp.makeConstraints { make in
            make.top.equalTo(view2.snp.bottom).offset(20)
            make.leading.trailing.equalTo(view1)
            make.height.equalTo(view3.snp.width)
            make.bottom.equalTo(stackView.snp.bottom).offset(20)
        }
    }
    
    // 模拟筛选栏（建议后续替换为 UICollectionView）
    private func createFilterView() -> UIScrollView {
        let scrollView = UIScrollView()
        scrollView.showsHorizontalScrollIndicator = false
        
        let stackView = UIStackView()
        stackView.axis = .horizontal
        stackView.spacing = 8
        stackView.alignment = .top
        stackView.isLayoutMarginsRelativeArrangement = false
        stackView.preservesSuperviewLayoutMargins = false
        
        // 模拟添加几个按钮
        let titles = ["打开", "标签", "作者", "受理人", "我请求的"]
        titles.forEach { title in
            let btn = UIButton(type: .system)
            btn.setTitle("\(title) ▿", for: .normal)
            btn.setTitleColor(.lightGray, for: .normal)
            btn.backgroundColor = UIColor(white: 0.2, alpha: 1.0)
            btn.layer.cornerRadius = 15
            btn.contentEdgeInsets = UIEdgeInsets(top: 5, left: 12, bottom: 5, right: 12)
            stackView.addArrangedSubview(btn)
            let tap = UITapGestureRecognizer(target: self, action: #selector(tap(_:)))
            btn.addGestureRecognizer(tap)
        }
        
        scrollView.addSubview(stackView)
        stackView.snp.makeConstraints { make in
            make.edges.equalToSuperview().inset(UIEdgeInsets(top: 0, left: 10, bottom: 0, right: 10))
            make.height.equalToSuperview()
        }
        
        return scrollView
    }
    
    @objc func tap(_ sender:UITapGestureRecognizer){
        navigationController?.pushViewController(PageViewController(), animated: true)
    }  



}
