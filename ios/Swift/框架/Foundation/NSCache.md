<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [NSCache](#nscache)

<!-- /code_chunk_output -->


# NSCache

https://blog.devgenius.io/caching-with-nscache-in-ios-2e97be8d6b53
https://gist.github.com/IronLeash/7d4a5583a85d60cb36d2e35e53427c42

* NSCache 类包含各种自动逐出策略，确保缓存不会使用过多的系统内存。如果其他应用程序需要内存，这些策略会从缓存中删除一些项目，从而最大限度地减少其内存占用。 `一定要做好取不到数据这种情况的处理`

```swift
import Foundation
import UIKit

class ImageStore {
    let cache = NSCache<NSString, UIImage>()
    static let shared = ImageStore()
    func setImage(_ key: String, image: UIImage) {
        cache.setObject(image, forKey: key as NSString)
    }
    func getImage(_ key: String) -> UIImage? {
        if let image = cache.object(forKey: key as NSString) {
            return image
        }
        return nil
    }
}

let key = UUID().uuidString
// 放入NSCache
ImageStore.shared.setImage(key, image: UIImage(named: "image"))
// 取图片
if let image = ImageStore.shared.getImage(key) {
    
}
```
