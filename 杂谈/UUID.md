# UUID

通用唯一识别码（英语：Universally Unique Identifier，缩写：UUID）是用于计算机体系中以识别信息的一个 128 位标识符，通常表现为一串 32 位十六进制数字。

* UUID 版本 1 (v1)UUID 是根据时间和节点 ID（通常是MAC地址）生成。
* UUID 版本 2 (v2)UUID是根据标识符（通常是组或用户ID）、时间和节点ID生成。
* UUID 版本 3 (v3)确定性UUID 通过散列（hashing）名字空间（namespace）标识符和名称生成。
* UUID 版本 4 (v4)使用随机性或伪随机性生成。
* UUID 版本 5 (v5)确定性UUID 通过散列（hashing）名字空间（namespace）标识符和名称生成。

UUID 的 16 个 8 位字节表示为 32 个十六进制（基数16）数字，显示在由连字符分隔 '-' 的五个组中，"8-4-4-4-12" 总共 36 个字符（32 个字母数字字符和 4 个连字符）。例如：

```ts
123e4567-e89b-12d3-a456-426655440000
xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
```
