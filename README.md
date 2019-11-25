# 使用 TypeScript 自定义 Webpack 多页应用

```Js

/**
 * 白色名称为目录结构
 * 红色名称文件名
 * public 公共目录
 * views 视图层
 */

./
├── public
│   ├── assets
│   ├── config
│   ├── styles
│   │   ├── common.styl
│   │   └── env.styl
│   ├── types
│   └── utils
│       └── aaa.ts
├── views
│   ├── about
│   │   ├── index.html
│   │   └── index.ts
│   └── home
│       ├── index.html
│       └── index.ts
├── README.md
├── package.json
├── tsconfig.json
├── postcss.config.js
├── webpack.config.ts
├── webpack.config.dev.ts
└── webpack.config.prod.ts

```

1. public > assets  静态资源
2. public > config  项目配置文件存放处
3. public > styles  全局样式/变量
4. public > types   项目类型定义
5. public > utils   项目工具包依赖
6. views  > *       该目录下，每个文件夹对应一个页面，每个页面下应有一个 index.html & index.ts 文件，打包的名称由该目录名决定

路径 | 别名
-|-
assets  |  @assets
config  |  @config
styles  |  @styles
types   |  @types
utils   |  @utils
views   |  @views

例如：

```Js

import XXX from "@assets/xxx...";

```
