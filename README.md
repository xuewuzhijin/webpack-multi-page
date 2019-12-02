# 使用 TypeScript 自定义 Webpack 多页应用

<details>

<summary>前言</summary>

一直想搞一件大事，但总是被各种事情耽误，接着不是忘记了就是其他事情整的没心情去弄，这大事就是写一个个人博客了，这一次利用闲时间准备开始写博客，但项目结构什么的还是要考虑一下。

综合考虑各种打包工具，我毫不犹豫的选择了它，我配过grunt项目，写过gulp，但随着项目层级越大，后两者维护起来简直脑壳疼(৹ᵒ̴̶̷᷄﹏ᵒ̴̶̷᷅৹)…

那好，为了简洁明了，就用 Webpack，为了维护方便，就用 TypeScript，想着想着既然都 Ts 了，那为了以后 Webpack 二次升级，Webpack 也采用 Ts ，接着也不知道脑洞清奇还是咋滴，干脆就把我用来写博客的配置单独建立仓库公布出来好了。

考虑到既然发出来，为了大家能够看得懂，去掉了单独为博客所单独配置的配置，仅保留一些大众模块，方便用户在使用该项目时能够一目了然。刚在睡前突然想到可能会有初学者需要学习 Webpack，这两天我会丰富该项目的注释信息，让大家能够看的明白。

## 项目选型

**放弃单页面**

其一：

从一开始我就放弃了单页面的打算，因为做过SEO，深知单页面对于目前蜘蛛有多不友好

其二：

对于自己的博客，其实我也是有梦想的😂，利用不同的技术栈来写，比如，A页面我要用Vue来写，B页面我要用React来写，C页面我要用Layui来写...开个玩笑，说点题外话，angular我是彻底放弃了，好不容易会了版本一，版本二给我断层了，弄明白了版本二，版本三全变了，这不摆明是让我放弃吗？

**放弃服务端渲染**

因为第一点，我考虑到了服务端渲染，他的原理是，相当于在服务器端开启编译，请求时会动态的编译Vue，返回整个html文档，弥补了我对第一点的缺点，但因为第二点我又放弃了它😂，没办法，虽然可以配置vue，tsx通吃，但我还是觉得麻烦了，所以不用了，最重要的是服务器我还时不时的搞点其他的，所以干脆放弃吧！！！

**那么现在是怎么选型的？**

利用 Webpack 的多入口，一个入口一个页面，简单明了，想在哪个页面用哪个模块就在入口 J/Ts 中引入，想用哪个 Ui 库就引谁，既方便又能练手，更重要的是 Webpack 的高度自定义，无论有多少页面，只要有引用相同模块自动抽离公共块，能减少很多不必要的脚本、样式、图片请求，所以，这种方式完全符合我的要求。

**那么多库和UI，后期维护？**

嗯，不存在的，我喜欢折腾不代表你喜欢折腾，所以我把该项目那些什么Vue，React…全部去掉，你们自己配置，想用什么就用什么。当然，并不是我没考虑到后期维护，我之所以这么折腾，练手是其一，最重要的是我对自己的博客很任性！！！所以 TypeScript 能够减轻后期维护上的困难，所以，总的来说，如果你们固定用一种，那么这个问题不是你们该考虑的。
</details>

## 更新日志

以前没想到这问题，直到想起了如果用户使用该库导致后面不知如何升级，所以加入更新日志，只是前期的配置没办法了，版本从 `1.1.0` 开始。

<details>

### 1.1.1

* 🐞 解决一个小BUG导致import ts 文件类型编译失败问题
* ➕ 更新类型检查生成目录地址，和添加定义公共类型、公共配置目录地址（ public/config、public/types ）
* 📘 解决语法冗长和添加注释信息

### 1.1.0

* 增加编辑器对模块名的支持 @ -> Project root path
* react 编译插件配置转移到 babel
* 移除重复配置


</details>

## 项目目录结构

<details>
<summary>包含输出目录</summary>

```Js
./
├── deploy
│   ├── _util
│   ├── config.ts
│   └── template
│       └── index.html
├── dist
│   ├── assets
│   │   └── images
│   │       ├── 5a25b6fd30231.jpg
│   │       └── 5a25b6fd30231.jpg.gz
│   ├── css
│   │   └── 3.css
│   ├── js
│   │   ├── 0.js
│   │   ├── 1.js
│   │   ├── 2.js
│   │   ├── 3.js
│   │   ├── 4.js
│   │   └── 5.js
│   ├── index.html
│   ├── about
│   │   └── index.html
│   ├── contact
│   │   └── index.html
│   └── news
│       ├── index.html
│       └── list
│           ├── detail
│           │   └── index.html
│           └── index.html
├── public
│   ├── assets
│   │   └── images
│   │       └── img.jpg
│   ├── config
│   ├── styles
│   │   ├── common.styl
│   │   ├── env.styl
│   │   └── style.css
│   ├── types
│   └── utils
│       └── test.ts
├── views
│   ├── -a
│   │   └── index.ts
│   ├── _a
│   │   └── index.js
│   ├── about
│   │   ├── index.html
│   │   └── index.ts
│   ├── contact
│   │   ├── index.html
│   │   └── index.ts
│   ├── index.html
│   ├── index.ts
│   └── news
│       ├── index.html
│       ├── index.js
│       └── list
│           ├── detail
│           │   ├── index.html
│           │   └── index.ts
│           ├── index.html
│           └── index.ts
├── README.md
├── package.json
├── tsconfig.json
├── babel.config.js
├── postcss.config.js
├── webpack.config.ts
├── webpack.config.dev.ts
└── webpack.config.prod.ts
```

</details>

## 模块别名

---

路径 | 别名 | 说明
-|-|-
/  |  @  |  项目根目录
public/assets  |  @assets  |  静态资源
public/config  |  @config  |  项目配置文件存放处
public/styles  |  @styles  |  全局样式/变量
public/types   |  @types  |  项目类型定义
public/utils   |  @utils  |  项目工具包依赖
views/*   |  @views  |  该目录下，只要有包含定义过的`[customeName].[jt]s` 文件就是一个入口文件，这个文件名相对应的有一个同名的 `html` 文件，如果该 `html` 文件不存在，则直接使用默认的模板文件，[配置文件](#开箱即用)

例如：

```Js

import XXX from "@assets/xxx...";

```

* `deploy`  项目部署目录
  * `_util`     该项目的工具库，适合高级玩家配置
  * `template`  模板库
  * `config.ts` 用户配置文件
* `dist`  打包输出路径
* `public` 公共路径
  * `assets` 静态资源
    * `images`
    * `fonts`
  * `config`  项目配置文件
  * `styles`  全局样式/变量
  * `types` 类型定义
  * `utils` 项目工具库
* `views` 视图层

---

## 已配置项

* stylus

项目初始化使用 `stylus` 作为样式工具，无论在哪里创建了 stylus 文件，都可以直接使用 public > styles > env.styl 文件内的变量，无需在每个文件中引入

* css样式兼容

加入了 css 的样式兼容，开启 grid 布局兼容

* vue/react/i18n...

项目加入了 `vue` 文件处理，但不参与打包，也就是，你可以在项目中使用 vue 这个插件，但在打包时，vue 将不会出现在打包文件中，如果需要使用请根据情况在每个 views 下的 .html 文件中加入 vue 的 cdn

* gzip

项目打包之后会自动生成 x.js.gz 文件，如果服务器允许的话

* split chunks

项目中如果有引用公共的 `.js/.ts/.css` 文件，打包后，只要该文件超过 10K，将自动切割成公共块，也就是多页面（.html）会自动引用这个公共块，如果没有依赖该公共块也就不会引用

* 多线程打包

该项目针对项目中的 `js`、 `ts` 开启多线程打包，提高打包等待时间过长弊端并开启缓存，针对大型项目效果非常明显

* 使用 `babel` 编译 typescript

由于使用 ts-loader 以及 awesome-typescript-loader 在开发编译中（尤其是热更新）编译速度过慢，所以该项目移去该 loader 并采用 babel 来编译，提高开发体验

* polyfill

项目采用 babel 高度定制，并按需填充最新语法，如 Promise、Generator、Flat……，更多新功能等待您的发现

* 支持可选链式调用

当你不确定该 `Object` / `Function`...下面是否有某属性时，此时你的写法看起来像这样

```JavaScript
const obj = { a: {} }
if( obj.a && obj.a.b && obj.a.b.c ) {
  // do something
}

// 那么此时你可以使用该方法
if( obj.a?.b?.c ) {
  // do something
}

// 该语法会转换你的表达式，看起来是这样
// null==obj.a?void 0:null===(r=obj.a.b)||void 0===obj.a?void 0:null===(o=obj.a.b)...

// 在 JS 中， null == undefined (true)， 但 null === undefined (false) 是错的

// 总结来说，该表达式只要在某一步出现了 null 或 undefined 都会返回 undefined，Js 中自动类型转换为就是 false 了，假若为真，那么返回对应的值

```

* ES6/7支持

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

* 待持续优化...

如果你有好的插件介绍、或者对该项目有建议、或想参与到开发中，欢迎到 `issue` 中提出。如果对该项目感兴趣鼓励 `watch` 欢迎 `star`

## 开箱即用

打开部署目录下的配置文件，根据自身需求开启插件，无需去配置额外的插件及属性，也不需要在项目中删删改改，`true` 与 `false` 让你轻松搞定[前往文件](./deploy/config.ts)

```Js
export default {
  /** 入口配置文件 */
  entry: {
    /** 忽略前缀文件夹不作为入口文件 */
    ignorePrefix: [ "~", "-", "_" ],
    /** 哪些文件名称作为入口 */
    name: [ "index", "entry" ]
  },

  templatePath: "./deploy/template/index.html",

  /** 是否开启该插件 */
  plugin: {
    vue: true,

    vueI18n: false,

    vuePug: false,

    eslint: false,

    react: false,
  }
}
```

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


## 如果编译出现报错，比如看起来像这样

#
# Fatal error in , line 0
# Check failed: U_SUCCESS(status).
#
#
#
#FailureMessage Object: 00000045E791C0E0 ERROR  Command failed with exit code 3221225477.

## 请升级你的 NodeJs
```
