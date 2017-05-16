# CH01 ECMAScript 6 简介

<http://es6.ruanyifeng.com/#docs/intro>

**ECMAScript 6 （简称 ES6）2015 年 6 月正式发布。**

ECMA 国际标准化组织

## 1.1 ECMAScript 和 JavaScript 的关系

- ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现。
- 另外的 ECMAScript 方言还有 Jscript 和 ActionScript。
- 日常场合，这两个词是可以互换的。

## 1.2 ES6 与 ECMAScript 2015 的关系

- ECMAScript 2015（简称 ES2015）
- 2011年，ECMAScript 5.1版发布后，就开始制定6.0版了。因此，ES6 这个词的原意，就是指 JavaScript 语言的下一个版本。
- 标准在每年的6月份正式发布一次，作为当年的正式版本。
- 这样一来，就不需要以前的版本号了，只要用年份标记就可以了。
- ES6 的第一个版本，就这样在2015年6月发布了，正式名称就是《ECMAScript 2015标准》（简称 ES2015）
- 2016年6月，小幅修订的《ECMAScript 2016标准》（简称 ES2016），这个版本可以看作是 ES6.1 版
- 根据计划，2017年6月发布 ES2017 标准。

**ES6 既是一个历史名词，也是一个泛指，含义是5.1版以后的 JavaScript 的下一代标准，涵盖了ES2015、ES2016、ES2017等等，而ES2015 则是正式名称，特指该年发布的正式版本的语言标准。**

本书中提到 ES6 的地方，一般是指 ES2015 标准

## 1.3 语法提案的批准流程

一种新的语法从提案到变成正式标准，需要经历五个阶段。每个阶段的变动都需要由 TC39 委员会批准。

- Stage 0 - Strawman（展示阶段）
- Stage 1 - Proposal（征求意见阶段）
- Stage 2 - Draft（草案阶段）
- Stage 3 - Candidate（候选人阶段）
- Stage 4 - Finished（定案阶段）

一个提案只要能进入 Stage 2，就差不多肯定会包括在以后的正式标准里面。ECMAScript 当前的所有提案，可以在 TC39 的官方网站  <http://github.com/tc39/ecma262> 查看。

## 1.4 ECMAScript 的历史

- 1997年 ECMAScript 1.0 发布
- 1998年 ECMAScript 2.0 发布
- 1999年 ECMAScript 3.0 发布
- 2000年 ECMAScript 4.0 未通过
- 2008年 ECMAScript 3.1 发布
- 2009年12月，ECMAScript 5.0 版正式发布
- 2011年6月，ECMAscript 5.1 版发布
- 2015年6月，ECMAScript 6 正式通过

## 1.5 部署进度

各大浏览器最新版本对 ES6 的支持在这里查看：<http://kangax.github.io/compat-table/es6/>

- Node 是 JavaScript 的服务器运行环境（runtime）。它对 ES6 的支持度更高 > 97%。查看 Node 已经实现的 ES6 特性：`node --v8-options | grep harmony`
- 工具 [ES-Checker](https://github.com/ruanyf/es-checker)，用来检查各种运行环境对 ES6 的支持情况。访问[ruanyf.github.io/es-checker](http://ruanyf.github.io/es-checker)，可以看到您的浏览器支持 ES6 的程度。当前我的 safari 支持度为 92%
- 运行下面的命令，可以查看你正在使用的 Node 环境对 ES6 的支持程度。

```
npm install -g es-checker
es-checker

=========================================
Passes 38 feature Detections
Your runtime supports 90% of ECMAScript 6
=========================================
```

## 1.6 Babel 转码器

[Babel](https://babeljs.io/)是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在现有环境执行。

```javascript
// 转码前
input.map(item => item + 1);

// 转码后
input.map(function (item) {
  return item + 1;
});
```

### Babel 的配置文件是`.babelrc`

- 存放在项目的根目录下
- 使用 Babel 的第一步，就是配置这个文件。
- 该文件用来设置转码规则和插件，基本格式如下。

```json
{
  "presets": [],
  "plugins": []
}
```

- `presets`字段设定转码规则，官方提供以下的规则集，你可以根据需要安装。

```
# 最新转码规则
$ npm install --save-dev babel-preset-latest

# react 转码规则
$ npm install --save-dev babel-preset-react

# 不同阶段语法提案的转码规则（共有4个阶段），选装一个
$ npm install --save-dev babel-preset-stage-0
$ npm install --save-dev babel-preset-stage-1
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-stage-3
```

- 然后，将这些规则加入`.babelrc`。

```json
{
  "presets": [
    "latest",
    "react",
    "stage-2"
  ],
  "plugins": []
}
```

**所有 Babel工具和模块的使用，都必须先写好`.babelrc`**

### Babel提供`babel-cli`工具，用于命令行转码。

安装命令：`npm install --save-dev babel-cli`，基本用法如下：

```
# 转码结果输出到标准输出
$ babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s
```

可以将命令写入 `package.json` 中：

```json
{
  // ...
  "devDependencies": {
    "babel-cli": "^6.0.0"
  },
  "scripts": {
    "build": "babel src -d lib"
  },
}
```

转码执行：`npm run build`

### babel-node

- `babel-cli`工具自带一个`babel-node`命令
- 提供一个支持ES6的REPL环境
- 支持Node的REPL环境的所有功能
- 可以直接运行ES6代码
- 注意要全局安装后才能使用

```
$ babel-node
> (x => x*2)(1)
2
>
```

- `babel-node`命令可以直接运行ES6脚本`

### babel-register

- 一个钩子，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码。
- 安装：`npm install --save-dev babel-register`
- 必须首先加载`babel-register`：

```javascript
require("babel-register");
require("./index.js");
```

- 就不需要手动对`index.js`转码了。
- babel-register只会对require命令加载的文件转码，而不会对当前文件转码
- 由于它是实时转码，所以只适合在开发环境使用。

### babel-core

- 如果某些代码需要调用 Babel 的 API 进行转码，就要使用`babel-core`模块
- 安装：`npm install babel-core --save`
- 项目中调用：

```javascript
var babel = require('babel-core');

// 字符串转码
babel.transform('code();', options);
// => { code, map, ast }

// 文件转码（异步）
babel.transformFile('filename.js', options, function(err, result) {
  result; // => { code, map, ast }
});

// 文件转码（同步）
babel.transformFileSync('filename.js', options);
// => { code, map, ast }

// Babel AST转码
babel.transformFromAst(ast, code, options);
// => { code, map, ast }
```

- 配置对象`options`，可以参看官方文档<http://babeljs.io/docs/usage/options/>

举个例子：

```javascript
var es6Code = 'let x = n => n + 1';
var es5Code = require('babel-core')
  .transform(es6Code, {
    presets: ['latest']
  })
  .code;
// '"use strict";\n\nvar x = function x(n) {\n  return n + 1;\n};'
```

上面代码中，`transform`方法的第一个参数是一个字符串，表示需要被转换的ES6代码，第二个参数是转换的配置对象。

### babel-polyfill

- Babel 默认只转换新的 JavaScript 句法（syntax）
- 不转换新的 API
- 比如：ES6在`Array`对象上新增了`Array.from`方法。Babel 就不会转码这个方法。
- 必须使用`babel-polyfill`
- 安装：`npm install --save babel-polyfill`
- 脚本中引用：

```javascript
import 'babel-polyfill';
// 或者
require('babel-polyfill');
```

### Babel 也可以用于浏览器环境

- 从 Babel 6.0 开始，不再直接提供浏览器版本
- 可以使用[babel-standalone](https://github.com/Daniel15/babel-standalone)模块提供的浏览器版本，将其插入网页

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.4.4/babel.min.js"></script>
<script type="text/babel">
// Your ES6 code
</script>
```

- 网页实时将 ES6 代码转为 ES5，对性能会有影响
- 生产环境需要加载已经转码完成的脚本。
- 以`gulp`为例，参考：<https://github.com/babel/gulp-babel>

```javascript
npm install --save-dev gulp-babel babel-preset-env

const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () =>
	gulp.src('src/app.js')
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(gulp.dest('dist'))
);
```

### 在线转换

Babel 提供一个[REPL在线编译器](https://babeljs.io/repl/)，可以在线将 ES6 代码转为 ES5 代码。转换后的代码，可以直接作为 ES5 代码插入网页运行。

### 与其他工具的配合

**ESLint 用于静态检查代码的语法和风格**

- 安装：`npm install --save-dev eslint babel-eslint`
- 在项目根目录下，新建一个配置文件`.eslintrc`

```json
{
  "parser": "babel-eslint",
  "rules": {
    ...
  }
}
```

再在`package.json`之中，加入相应的`scripts`脚本。

```json
{
  "name": "my-module",
  "scripts": {
    "lint": "eslint my-files.js"
  },
  "devDependencies": {
    "babel-eslint": "...",
    "eslint": "..."
  }
}
```

## 1.7 Traceur 转码器

略过，未看
