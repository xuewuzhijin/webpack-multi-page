# 使用 TypeScript 自定义 Webpack 多页应用

```Js

/**
 * 无后缀名 为目录
 * 有后缀名 为文件
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
6. views  > *       该目录下，每个文件夹对应一个页面，每个页面下应有一个 `index.html` & `index.ts` 文件，打包的名称由该目录名决定

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

## 已配置项

1. stylus

项目初始化使用 `stylus` 作为样式工具，无论在哪里创建了 stylus 文件，都可以直接使用 public > styles > env.styl 文件内的变量，无需在每个文件中引入

2. vue

项目加入了 `vue` 文件处理，但不参与打包，也就是，你可以在项目中使用 vue 这个插件，但在打包时，vue 将不会出现在打包文件中，如果需要使用请根据情况在每个 views 下的 .html 文件中加入 vue 的 cdn

3. gzip

项目打包之后会自动生成 x.js.gz 文件，如果服务器允许的话

4. split chunks

项目中如果有引用公共的 `.ts` 文件，打包后，只要该文件超过 10K，将自动切割成公共块，也就是多页面（.html）会自动引用这个公共块，如果没有依赖该公共块也就不会引用

5. 待持续优化...

## 使用步骤

```Bash
# 克隆
git clone https://github.com/xuewuzhijin/webpack-multiple-pages.git

# 进入项目目录
cd webpack-multiple-pages

# 安装依赖
npm i

# 开发
npm run serve

# or 生产
npm run build
```
