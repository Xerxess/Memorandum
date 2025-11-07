# Demo2 vs Demo3 比较文档

两个演示都是透明背景烟花拖尾效果，但实现方式和视觉效果有显著差异。

---

## 一、HTML 结构

### 背景颜色
| 项目 | Demo2 | Demo3 |
|------|-------|-------|
| 背景色 | `#0b0c10` (更深的灰蓝色) | `#111` (纯黑色) |

### 说明文本
| 项目 | Demo2 | Demo3 |
|------|-------|-------|
| 提示文本 | "点击 / 拖动释放烟花（Canvas 透明无残影）" | "点击 / 拖动释放烟花（Canvas 透明）" |

---

## 二、常量配置对比

| 常量 | Demo2 | Demo3 | 说明 |
|------|-------|-------|------|
| FIREWORK_INTERVAL | 850ms | 900ms | 自动烟花发射间隔，Demo3 更长 |
| ROCKET_TRAIL | 40 | -（用 PARTICLE_TRAIL） | 火箭拖尾长度，Demo3 统一使用 PARTICLE_TRAIL |
| PARTICLE_TRAIL | 40 | 18 | 粒子拖尾长度，Demo3 显著减短 |
| PARTICLES_PER_BURST | 55 | 40 | 每次爆炸粒子数，Demo2 更多 |
| GRAVITY | 0.08 | 0.06 | 重力加速度，Demo2 更强 |
| FRICTION | 0.981 | 0.992 | 摩擦系数，Demo3 摩擦更小（粒子保持速度更久） |
| TRAIL_FADE | - | 0.88 | 新增：拖尾褪色系数，越接近 1 拖尾越短 |

**核心差异**：Demo3 的拖尾更短，粒子运动更平缓。

---

## 三、Rocket 类差异

### 构造函数
```javascript
// Demo2
constructor(x, targetY, hue) {
  const h = canvas.height / DPR;
  this.y = h;
  // ...
}

// Demo3
constructor(x, targetY, hue) {
  this.y = canvas.height / DPR;
  // ...
}
```
**差异**：Demo3 更简洁，代码风格改进。

### 初始速度
| 项目 | vx | vy |
|------|-----|------|
| Demo2 | `(Math.random() - 0.5) * 0.7` | `-6 - Math.random() * 1.5` |
| Demo3 | `(Math.random() - 0.5) * 1.2` | `-5 - Math.random() * 2` |

**分析**：Demo3 火箭水平偏移更大，初速度范围不同。

### update() 方法

#### 拖尾历史管理
- Demo2: `if (this.history.length > ROCKET_TRAIL)` → 使用专有的 ROCKET_TRAIL
- Demo3: `if (this.history.length > PARTICLE_TRAIL)` → 复用粒子的 PARTICLE_TRAIL

#### 重力应用
- Demo2: `this.vy += GRAVITY * 0.4 * dt;` → 0.032
- Demo3: `this.vy += (GRAVITY * 0.3) * dt;` → 0.018

**影响**：Demo3 火箭上升高度更高。

### draw() 方法

#### 遍历方式
```javascript
// Demo2 - forEach
this.history.forEach((p, i) => {
  const alpha = (i + 1) / this.history.length;  // 从 1/length 开始
  // ...
});

// Demo3 - for 循环
for (let i = 0; i < this.history.length; i++) {
  const alpha = i / this.history.length;  // 从 0 开始
  // ...
}
```

**差异**：Demo2 拖尾起点更亮，Demo3 起点透明度更低。

---

## 四、Particle 类差异

### 构造函数 - decay 参数
| 项目 | 公式 | 范围 |
|------|------|------|
| Demo2 | `Math.random() * 0.02 + 0.01` | 0.01 ~ 0.03 |
| Demo3 | `Math.random() * 0.015 + 0.012` | 0.012 ~ 0.027 |

**影响**：Demo3 粒子消失速度稍慢。

### update() 方法

#### 方法签名与参数处理
```javascript
// Demo2
update(dt) {
  this.x += this.vx * dt;
  this.y += this.vy * dt;
  this.vy += GRAVITY * dt;
  this.alpha -= this.decay * dt;
}

// Demo3
update() {
  // 不接收 delta 参数
  this.x += this.vx;
  this.y += this.vy;
  this.vy += GRAVITY;
  this.alpha -= this.decay;
}
```

**关键差异**：
- Demo2 使用 delta 时间制（帧率独立）
- Demo3 使用固定时间步（假设固定帧率）

#### 调用方式
```javascript
// Demo2
particles = particles.filter(p => p.update(delta * 0.06));

// Demo3
particles = particles.filter(p => p.update());
```

### draw() 方法

#### 遍历与渲染
```javascript
// Demo2
this.history.forEach((p, i) => {
  const progress = (i + 1) / this.history.length;
  ctx.lineWidth = 1 + progress * 1.6;  // 0.6 ~ 2.6
});

// Demo3
for (let i = 0; i < this.history.length; i++) {
  const progress = i / this.history.length;
  ctx.lineWidth = 1.5 + progress * 2;  // 1.5 ~ 3.5
}
```

**影响**：Demo3 拖尾线宽更粗，渐变效果更明显。

---

## 五、关键创新：fadeCanvas() 函数

### Demo3 新增函数
```javascript
function fadeCanvas() {
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = `rgba(0,0,0,${1 - TRAIL_FADE})`;
  ctx.fillRect(0, 0, canvas.width / DPR, canvas.height / DPR);
  ctx.globalCompositeOperation = 'source-over';
}
```

### 作用
- **Demo2**：使用 `clearRect` 完全清除画布
- **Demo3**：使用 `destination-out` 模式逐帧褪色，实现持久拖尾效果

### 视觉效果
- Demo2：每帧清除所有内容，拖尾断裂
- Demo3：逐帧褪色，拖尾连贯平滑

---

## 六、render() 和 update() 调用

### render() 函数
```javascript
// Demo2
function render() {
  ctx.clearRect(0, 0, canvas.width / DPR, canvas.height / DPR);
  rockets.forEach(r => r.draw());
  particles.forEach(p => p.draw());
}

// Demo3
function render() {
  fadeCanvas();  // 替代 clearRect
  rockets.forEach(r => r.draw());
  particles.forEach(p => p.draw());
}
```

### update() 函数中的粒子更新
```javascript
// Demo2
particles = particles.filter(p => p.update(delta * 0.06));

// Demo3
particles = particles.filter(p => p.update());
```

---

## 七、总体对比总结

| 特性 | Demo2 | Demo3 |
|------|-------|-------|
| 拖尾机制 | 完全清除 | 逐帧褪色 |
| 拖尾长度 | 较长（40） | 较短（18） |
| 粒子数量 | 更多（55） | 较少（40） |
| 时间制 | Delta 时间制（帧率独立） | 固定时间步 |
| 火箭速度 | 保守 | 激进 |
| 拖尾呈现 | 断裂清晰 | 连贯平滑 |
| 性能 | 中等 | 较好（简化更新计算） |
| 视觉风格 | 无残影（更清晰） | 持久拖尾（更梦幻） |

---

## 八、应用场景建议

### 选择 Demo2 如果：
- 需要清晰的烟花效果
- 追求无残影的视觉体验
- 优先帧率独立的行为

### 选择 Demo3 如果：
- 喜欢梦幻的拖尾效果
- 追求连贯平滑的动画
- 性能要求较高（更新计算更少）
- 更短的拖尾配置，视觉更清爽

---

## 九、代码质量评分

| 维度 | Demo2 | Demo3 |
|------|-------|-------|
| 代码简洁性 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 视觉效果 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 性能 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 帧率独立 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
