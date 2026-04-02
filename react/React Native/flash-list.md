

# flash-list

- 快速高效的 React Native 列表
- 可直接替代 React Native 的 <FlatList> 组件。

```cmd
npm install @shopify/flash-list
```

## demo

```tsx
import { Button, Pressable, RefreshControl, Text, View } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';
import { useStore } from './stores';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Divider } from './Component/Divider';
import { useCallback, useState } from 'react';

type DataItem = {
  title: string;
};
const DATA: DataItem[] = [
  {
    title: 'First Item',
  },
  {
    title: 'Second Item',
  },
  {
    title: 'First Item',
  },
  {
    title: 'Second Item',
  },
  {
    title: 'First Item',
  },
  {
    title: 'Second Item',
  },
  {
    title: 'First Item',
  },
  {
    title: 'Second Item',
  },
  {
    title: 'First Item',
  },
  {
    title: 'Second Item',
  },
  {
    title: 'First Item',
  },
  {
    title: 'Second Item',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const safeArea = useSafeAreaInsets();
  const { setTheme, theme } = useStore();
  const [refreshing, setRefreshing] = useState(false);
  const headerComponent = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          paddingTop: safeArea.top,
          paddingBottom: 20,
        }}
      >
        <Text>Home Screen</Text>
        <Button
          title="更改主题"
          onPress={() => {
            setTheme(theme === 'dark' ? 'light' : 'dark');
          }}
        />
        <Link screen="Profile" params={{}}>
          Go to Details
        </Link>
      </View>
    );
  };
  const renderItem = ({ item }: { item: DataItem }) => {
    return (
      <Pressable
        onPress={() => {
          console.log(item);
        }}
        style={({ pressed }) => [
          {
            overflow: 'hidden',
            borderWidth: 1,
            borderRadius: 10,
            height: 90,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 4,
          },
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#ddd',
          },
        ]}
      >
        <View style={{}}>
          <Text>{item.title}</Text>
        </View>
      </Pressable>
    );
  };

  const footerComponent = () => {
    return (
      <View
        style={{
          borderColor: '#ddd',
          borderRadius: 8,
          borderWidth: 1,
          height: 90,
          padding: 10,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: 'red',
          }}
        >
          渲染在所有项目的底部
        </Text>
      </View>
    );
  };

  const onRefresh = useCallback(() => {
    console.log('abc');
    setRefreshing(true);
    // 模拟异步请求数据
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <FlashList
      style={{
        backgroundColor: '#eee',
      }}
      contentContainerStyle={{
        paddingHorizontal: 4,
        minHeight: '100%',
      }}
      // 渲染在每个项目之间，但不在顶部或底部。 React.ComponentType<any>
      ItemSeparatorComponent={Divider}
      // 渲染在所有项目的顶部。
      ListHeaderComponent={headerComponent}
      // Required 数据是给定类型的项的普通数组
      data={DATA}
      // 从 data 中获取一项并将其渲染到列表中
      // item （ Object ）：正在渲染的 data 项。
      // index （ number ）： data 数组中与此项对应的索引。
      // target （ string ）：FlashList 可能出于多种原因渲染您的项目。
      //
      // extraData （ Object ）- 这是传递给 FlashList extraData 属性。
      renderItem={renderItem}
      // 当列表为空时渲染。
      ListEmptyComponent={<Text>当列表为空时渲染</Text>}
      // 渲染在所有项目的底部。
      ListFooterComponent={footerComponent}
      // masonry={true}
      numColumns={2}
      // initialScrollIndex={2}
      // //
      // initialScrollIndexParams={{
      //   viewOffset: 90,
      // }}
      // progressViewOffset={safeArea.top}
      // refreshing={refreshing}
      // onRefresh={onRefresh}

      // 或者自定义外观
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#9Bd35A', '#689F38']} // Android 颜色
          progressViewOffset={safeArea.top}
          tintColor="#204ad3" // iOS 转圈颜色
        />
      }
      onLoad={() => {
        console.log('onLoad');
      }}
      showsVerticalScrollIndicator={true}
      indicatorStyle="black"
    />
  );
}

```