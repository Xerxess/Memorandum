# useSearchParams

```tsx
const params = useSearchParams()
```

URL | searchParams.get("a")
---------|----------
/dashboard?a=1| '1'
/dashboard?a=| ''
/dashboard?b=3 |null
/dashboard?a=1&a=2 |'1' - use getAll() to get all values

# searchParams.get(key)

# searchParams.has(key)
