

## 测试的基本规则

- 文件名：必须以 _test.go 结尾。
- 函数名：必须以 Test 开头，接收参数 *testing.T。
- 包位置：通常与被测源码在同一个目录下。


```go
// math_test.go
package math

import "testing"

func TestAdd(t *testing.T) {
    got := Add(1, 1)
    if got != 2 {
        t.Errorf("Add(1, 1) = %d; want 2", got)
    }
}