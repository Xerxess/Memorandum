
# Height and Width

## 固定尺寸

- React Native 中的所有尺寸都是无单位的，并且表示与密度无关的像素。

```tsx
<View
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'powderblue',
        }}
      />
```

## 柔性尺寸

使用 flex ，可以让组件根据可用空间动态地扩展和收缩。

```tsx
<View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'powderblue'}} />
      <View style={{flex: 2, backgroundColor: 'skyblue'}} />
      <View style={{flex: 3, backgroundColor: 'steelblue'}} />
    </View>
```

## 百分比尺寸

```tsx
<View
        style={{
          height: '15%',
          backgroundColor: 'powderblue',
        }}
      />
```