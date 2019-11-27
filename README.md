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

5. 多线程打包

该项目针对项目中的 `js`、 `ts` 开启多线程打包，提高打包等待时间过长弊端并开启缓存，针对大型项目效果非常明显

6. 使用 `babel` 编译 typescript

由于使用 ts-loader 以及 awesome-typescript-loader 在开发编译中（尤其是热更新）编译速度过慢，所以该项目移去该 loader 并采用 babel 来编译，提高开发体验

7. polyfill

项目采用 babel 高度定制，并按需填充最新语法，如 Promise、Generator、Flat……，更多新功能等待您的发现

8. 支持可选链式调用

由于 JavaScript 属于若类型语言，那怕有 TypeScript 的支持，但也改变不了某些弊端，如：当你不确定该 `Object` / `Function`...下面是否有某属性时，此时你的写法看起来像这样

```JavaScript
const obj = { a: {} }
if( obj.a && obj.a.b && obj.a.b ) {
  // do something
}

// 那么此时你可以使用该方法
if( obj.a?.b?.c?.c ) {
  // do something
}

// 该语法会转换你的表达式，看起来是这样
// null==obj.a?void 0:null===(r=obj.a.b)||void 0===obj.a?void 0:null===(o=obj.a.b)...

// 在 JS 中， null == undefined (true)， 但 null === undefined (false) 是错的

// 总结来说，该表达式只要在某一步出现了 null 或 undefined 都会返回 undefined，Js 中自动类型转换为就是 false 了，假若为真，那么返回对应的值

```

9. ES6/7支持

除了上面所写的 polyfill 外，还支持了对 JavaScript 的 `class`，以及它的装饰器(Decorator)语法，看起来像这样

```Js
class Fly {
  @When(/* some code... */)
}

function When( value ) {
  // do someting
}
```

除了以上几乎涵盖了日常你所需的 ES6 语法 + ES7 和部分 ES8语法等

10. 待持续优化...

如果你有好的插件介绍、或者对该项目有建议、或想参与到开发中，欢迎到 `issue` 中提出。如果对该项目感兴趣鼓励 `watch` 欢迎 `star`

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
