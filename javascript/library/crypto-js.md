# crypto-js

## DES 加密/解密

* DES算法的入口参数有三个：Key、Data、Mode。其中Key為8个字节共64位，是DES算法的工作密钥；Data也為8个字节64位，是要被加密或被解密的数据；
* 明文长度不超个8位

```js
//DES加密
export function encryptDes(message, key) {
    var keyHex = cryptoJs.enc.Utf8.parse(key)
    /* 这里的模式参数需要和后端匹配 mode.ECB，mode.CBC*/
    var encrypted = cryptoJs.DES.encrypt(message, keyHex, { 
    	mode: cryptoJs.mode.ECB, 
    	padding: cryptoJs.pad.Pkcs7 
    });
    // encrypted.toString() 直接toString() 得到的是array
    return encrypted.ciphertext.toString(); // 获取到的是base64字符串 
}
```

```js
//DES解密
export function decryptDes(message, key) {
    var keyHex = cryptoJs.enc.Utf8.parse(key)
    var decrypted = cryptoJs.DES.decrypt(
        {
            ciphertext: cryptoJs.enc.Hex.parse(message)
        },
        keyHex,
        {
            mode: cryptoJs.mode.ECB,
            padding: cryptoJs.pad.Pkcs7
        }
    )
    return decrypted.toString(cryptoJs.enc.Utf8)
}
```
