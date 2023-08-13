# useParams

```tsx
const params = useParams()
```

Route | URL | useParams()
---------|----------|---------
app/shop/page.js |/shop |null
app/shop/[slug]/page.js |/shop/1 |{ slug: '1' }
app/shop/[tag]/[item]/page.js| /shop/1/2 |{ tag: '1', item: '2' }
app/shop/[...slug]/page.js |/shop/1/2 |{ slug: ['1', '2'] }
  