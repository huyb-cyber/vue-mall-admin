# Vue 电商后台管理系统

## 项目介绍
一个基于 Vue.js + Element UI 的电商后台管理系统，实现了商品管理、权限控制等核心功能。本项目采用前后端分离架构，使用 RESTful API 进行数据交互。

## 技术栈
- 前端框架：Vue 2.6
- 状态管理：Vuex
- 路由管理：Vue Router
- UI 框架：Element UI
- HTTP 客户端：Axios
- 样式预处理：SCSS
- 项目构建：Webpack
- 代码规范：ESLint
- 图标处理：SVG Sprite
- 数据模拟：Mock.js

## 主要功能
- [x] 用户登录/登出
- [x] 商品管理
  - 商品分类
  - 品牌管理
  - SKU 管理
  - 商品属性管理
- [x] 权限管理
  - 基于 RBAC 的权限控制
  - 动态路由
  - 按钮级权限

## 项目特点
1. **完善的权限系统**
   - 基于 RBAC 模型的权限管理
   - 支持动态路由和按钮级权限控制
   - 权限验证和路由守卫

2. **组件化开发**
   - 封装了通用的业务组件
   - 高度可复用的页面组件
   - 统一的组件开发规范

3. **性能优化**
   - 路由懒加载
   - 合理的组件抽象
   - Webpack 打包优化

## 项目运行

```bash
# 克隆项目
git clone https://github.com/huyb-cyber/vue-.git

# 进入项目目录
cd vue-admin-system

# 安装依赖
npm install

# 启动服务
npm run dev
```

## 项目构建

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 目录结构
```
├── build                      # 构建相关
├── mock                       # 项目mock 模拟数据
├── public                     # 静态资源
│   │── favicon.ico           # favicon图标
│   └── index.html            # html模板
├── src                       # 源代码
│   ├── api                   # 所有请求
│   ├── assets                # 主题 字体等静态资源
│   ├── components            # 全局公用组件
│   ├── layout                # 全局 layout
│   ├── router                # 路由
│   ├── store                 # 全局 store管理
│   ├── styles                # 全局样式
│   ├── utils                 # 全局公用方法
│   ├── views                 # views 所有页面
│   ├── App.vue               # 入口页面
│   ├── main.js               # 入口文件
│   └── permission.js         # 权限管理
├── .env.xxx                  # 环境变量配置
├── .eslintrc.js             # eslint 配置项
├── .gitignore               # git 忽略项
├── babel.config.js          # babel-loader 配置
├── package.json             # package.json
└── vue.config.js            # vue-cli 配置
```

## 环境要求
- Node.js >= 8.9
- npm >= 3.0.0

## 浏览器支持
| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge | last 2 versions | last 2 versions | last 2 versions |


## 作者
- huyb-cyber

## License
[MIT](https://github.com/huyb-cyber/vue-/blob/master/LICENSE)