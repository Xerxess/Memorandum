

# Style

使用 React Native，你可以用 JavaScript 来设置应用程序的样式。所有核心组件都接受一个名为 `style` 的 style 。样式名称和值通常与 Web 上的 CSS 工作方式一致，只是名称采用驼峰式命名，例如 ` backgroundColor 而不是 background-color 。

```ts
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const LotsOfStyles = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.red}>just red</Text>
      <Text style={styles.bigBlue}>just bigBlue</Text>
      <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
      <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});
```