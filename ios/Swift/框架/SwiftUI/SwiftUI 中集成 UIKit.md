<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [SwiftUI 中集成 UIKit](#swiftui-中集成-uikit)
  - [UIViewRepresentable - 集成UIKit视图](#uiviewrepresentable---集成uikit视图)
  - [UIViewControllerRepresentable - 集成UIKit控制器](#uiviewcontrollerrepresentable---集成uikit控制器)

<!-- /code_chunk_output -->

# SwiftUI 中集成 UIKit

- 何时在SwiftUI中使用UIKit
    1. 需要使用UIKit特有的功能（相机、WebView等）
    2. 现有的UIKit组件性能更好
    3. 第三方库只提供UIKit版本
    4. 需要更精细的控制

## UIViewRepresentable - 集成UIKit视图

https://developer.apple.com/documentation/swiftui/uiviewrepresentable

```swift
import SwiftUI
import UIKit

// 将UILabel集成到SwiftUI中
struct UILabelRepresentable: UIViewRepresentable {
    @Binding var text: String
    var font: UIFont
    var textColor: UIColor
    
    init(text: Binding<String>, font: UIFont = .systemFont(ofSize: 16), textColor: UIColor = .label) {
        self._text = text
        self.font = font
        self.textColor = textColor
    }
    
    // 创建UIView
    func makeUIView(context: Context) -> UILabel {
        let label = UILabel()
        label.font = font
        label.textColor = textColor
        label.numberOfLines = 0
        label.textAlignment = .left
        
        // 设置Auto Layout优先级
        label.setContentHuggingPriority(.defaultHigh, for: .vertical)
        label.setContentCompressionResistancePriority(.defaultHigh, for: .vertical)
        
        return label
    }
    
    // 更新UIView
    func updateUIView(_ uiView: UILabel, context: Context) {
        uiView.text = text
        uiView.font = font
        uiView.textColor = textColor
    }
    
    // 可选：处理尺寸变化
    func sizeThatFits(_ proposal: ProposedViewSize, uiView: UILabel, context: Context) -> CGSize? {
        let width = proposal.width ?? .infinity
        let size = uiView.sizeThatFits(CGSize(width: width, height: .greatestFiniteMagnitude))
        return size
    }
}

// 使用示例
struct UILabelDemo: View {
    @State private var labelText = "这是一个UILabel在SwiftUI中的示例"
    
    var body: some View {
        VStack(spacing: 20) {
            Text("UILabel集成示例")
                .font(.title)
            
            // SwiftUI原生Text对比
            Text(labelText)
                .font(.system(size: 16))
                .padding()
                .background(Color.blue.opacity(0.1))
                .cornerRadius(8)
                .overlay(
                    Text("SwiftUI Text")
                        .font(.caption)
                        .foregroundColor(.blue)
                        .padding(4)
                        .background(Color.white)
                        .cornerRadius(4),
                    alignment: .topLeading
                )
            
            // 集成的UILabel
            UILabelRepresentable(
                text: $labelText,
                font: .systemFont(ofSize: 16),
                textColor: .systemGreen
            )
            .padding()
            .background(Color.green.opacity(0.1))
            .cornerRadius(8)
            .overlay(
                Text("UIKit UILabel")
                    .font(.caption)
                    .foregroundColor(.green)
                    .padding(4)
                    .background(Color.white)
                    .cornerRadius(4),
                alignment: .topLeading
            )
            
            // 文本输入
            TextField("修改文本", text: $labelText)
                .textFieldStyle(RoundedBorderTextFieldStyle())
        }
        .padding()
    }
}
```

## UIViewControllerRepresentable - 集成UIKit控制器

https://developer.apple.com/documentation/swiftui/uiviewcontrollerrepresentable

> 相机控制器集成

```swift
import SwiftUI
import UIKit
import AVFoundation

struct CameraViewControllerRepresentable: UIViewControllerRepresentable {
    @Binding var selectedImage: UIImage?
    @Binding var isPresented: Bool

    class Coordinator: NSObject, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
        let parent: CameraViewControllerRepresentable
        
        init(parent: CameraViewControllerRepresentable) {
            self.parent = parent
        }
        
        func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
            if let selectedImage = info[.originalImage] as? UIImage {
                parent.selectedImage = selectedImage
            }
            parent.isPresented = false
        }
        
        func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
            parent.isPresented = false
        }
    }
    
    func makeCoordinator() -> Coordinator {
        return Coordinator(parent: self)
    }
    
    func makeUIViewController(context: Context) -> UIImagePickerController {
        let picker = UIImagePickerController()
        picker.delegate = context.coordinator
        picker.sourceType = .camera
        picker.allowsEditing = false
        return picker
    }
    
    func updateUIViewController(_ uiViewController: UIImagePickerController, context: Context) {
        // 通常不需要更新
    }
}

// 使用示例
struct CameraDemo: View {
    @State private var selectedImage: UIImage?
    @State private var showCamera = false

    var body: some View {
        VStack(spacing: 20) {
            Text("相机集成示例")
                .font(.title)
            
            if let image = selectedImage {
                Image(uiImage: image)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(maxHeight: 300)
                    .cornerRadius(12)
            } else {
                Rectangle()
                    .fill(Color.gray.opacity(0.3))
                    .frame(height: 200)
                    .cornerRadius(12)
                    .overlay(
                        Text("未选择图片")
                            .foregroundColor(.secondary)
                    )
            }
            
            Button("打开相机") {
                showCamera = true
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
        .sheet(isPresented: $showCamera) {
            CameraViewControllerRepresentable(
                selectedImage: $selectedImage,
                isPresented: $showCamera
            )
        }
    }
}

```
