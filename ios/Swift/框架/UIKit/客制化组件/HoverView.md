
# HoverView

UIView 高亮

* 继承UIView
* touchesBegan 高亮
* touchesMoved 移动判断界限是否取消高亮
* touchesEnded 取消高亮
* touchesCancelled 取消高亮

```swift
//
//  HoverView.swift
//  
import UIKit

class HoverView: UIView {
    
    // MARK: - Properties
    
    private var normalBackgroundColor: UIColor = .white
    private var highlightedBackgroundColor: UIColor = .lightGray
    
    var isHighlightable: Bool = true
    
    var highlightedAlpha: CGFloat = 0.7
    
    private var touchStartPoint: CGPoint?
    private let maxMoveDistance: CGFloat = 10
    
    var isHighlighted: Bool = false {
        didSet {
            updateAppearance()
        }
    }
    
    var onTap: (() -> Void)?
    
    // MARK: - Initialization
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }
    
    private func setupView() {
        isUserInteractionEnabled = true
        backgroundColor = normalBackgroundColor
    }
    
    // MARK: - Appearance
    
    func setBackgroundColor(_ color: UIColor, for state: UIControl.State) {
        switch state {
        case .normal:
            normalBackgroundColor = color
        case .highlighted:
            highlightedBackgroundColor = color
        default:
            break
        }
        updateAppearance()
    }
    
    private func updateAppearance() {
        UIView.animate(withDuration: 0.1) {
            self.backgroundColor = self.isHighlighted ? self.highlightedBackgroundColor : self.normalBackgroundColor           
        }
    }
    
    override func point(inside point: CGPoint, with event: UIEvent?) -> Bool {
       
        // 扩大/缩小点击区域
        let expandedBounds = bounds.insetBy(dx: -20, dy: -20)
        return expandedBounds.contains(point)
    }
    
    // MARK: - Touch Handling
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        guard isHighlightable, let touch = touches.first else { return }
        touchStartPoint = touch.location(in: self)
        isHighlighted = true
    }
    
    override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) {
        guard isHighlightable, let touch = touches.first, let startPoint = touchStartPoint else { return }
        let currentPoint = touch.location(in: self)
        if self.bounds.insetBy(dx: -20, dy: -20).contains(currentPoint) {
            return  isHighlighted = true
        }
        return isHighlighted = false
    }
    
    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        guard isHighlightable, let touch = touches.first else { return }
        let endPoint = touch.location(in: self)
        
        isHighlighted = false
        touchStartPoint = nil
        
        if bounds.insetBy(dx: -20, dy: -20).contains(endPoint) {
            onTap?()
        }
    }
    
    override func touchesCancelled(_ touches: Set<UITouch>, with event: UIEvent?) {
        isHighlighted = false
        touchStartPoint = nil
    }
}

```
