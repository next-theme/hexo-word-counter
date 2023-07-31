# Hexo Word Counter

[![Build Status][github-image]][github-url]
[![npm-image]][npm-url]
[![hexo-image]][hexo-url]
[![lic-image]](LICENSE)

Word count and time to read for articles in Hexo blog.

The word count is based on [Unicode® Standard Annex #29](https://www.unicode.org/reports/tr29/). Thus, when multiple languages are present in the post content, the total word count can be accurately counted.

With the power of Rust, this plugin is faster than almost all other Hexo plugins that offer similar functionality. See the [benchmark](#Benchmark) below.

## Installation

![size-image]
[![dm-image]][npm-url]
[![dt-image]][npm-url]

```bash
$ npm install hexo-word-counter
$ hexo clean
```

## Usage

You can set options of hexo-word-counter in the **Hexo's `_config.yml`** (which locates in the root dir of your blog):

```yml
symbols_count_time:
  symbols: true
  time: true
  total_symbols: true
  total_time: true
  exclude_codeblock: false
  wpm: 275
  suffix: "mins."
```

If `symbols_count_time` option is not specified, the default parameters will be used.

### Parameters

* `wpm` – Words Per Minute. Default: `275`. You can check this [here](https://wordcounter.net).
  * Slow &asymp; `200`
  * Normal &asymp; `275`
  * Fast &asymp; `350`
* `suffix` – If time to read less then 60 minutes, added suffix as string parameter.\
  If not defined, `mins.` will be used as default.
* `exclude_codeblock` – Allow to exclude all content inside code blocks for more accurate words counting.\
  If not defined, `false` will be used as default.

**Note for Chinese users:** if you write posts in Chinese at most cases (without mixed English), recommended to set `wpm` to `300`.\
But if you usually mix your posts with English, set `wpm` to `275` will be nice.

### For NexT Theme

This plugin integrated in «NexT» and after plugin enabled in main Hexo config, you may adjust options in NexT config:

```yml
post_meta:
  item_text: true

symbols_count_time:
  separated_meta: true
  item_text_total: false
```

## Development

You have to prepare both Node.js and rust toolchain to develop this plugin.

```bash
$ git clone https://github.com/next-theme/hexo-word-counter.git
$ cd hexo-word-counter
$ npm install
```

You can run tests with or without coverage feedback:

```bash
$ npm test
$ npm run test-cov
```

And you can install the development version in your blog:

```bash
$ cd blog
$ npm i ../path/to/hexo-word-counter
```

## Theme Integration

If you're a theme developer, you can use the following code to integrate this plugin.

### Word Count

The syntax is different depending on the templating engine of the theme.

For Nunjucks / Swig:
```
{{ symbolsCount(post) }}
```

For Ejs:
```
<%- symbolsCount(post) %>
```

For Pug / Jade:
```
span=symbolsCount(post)
```

In the latter part, we use Nunjucks syntax as an example.

### Post Reading Time

```
{{ symbolsTime(post) }}
```

Or with predefined parameters:

```
{{ symbolsTime(post, awl, wpm, suffix) }}
```

### Total Word Count

```
{{ symbolsCountTotal(site) }}
```

### Total Post Reading Time

```
{{ symbolsTimeTotal(site) }}
```

Or with predefined parameters:

```
{{ symbolsTimeTotal(site, awl, wpm, suffix) }}
```

## Benchmark

See [GitHub actions](https://github.com/next-theme/hexo-word-counter/actions/runs/3391961808/jobs/5637627050).

| Plugin installed | Time of `hexo g` |
| - | - |
| Baseline | 19.48s |
| hexo-word-counter | 19.63s (+0.78%) |
| [hexo-symbols-count-time](https://github.com/theme-next/hexo-symbols-count-time) | 19.86s (+1.99%) |
| [hexo-wordcount](https://github.com/willin/hexo-wordcount) | 21.44s (+10.08%) |
| [hexo-reading-time](https://github.com/ierhyna/hexo-reading-time) | 23.81s (+22.26%) |

[github-image]: https://img.shields.io/github/actions/workflow/status/next-theme/hexo-word-counter/linter.yml?branch=main&style=flat-square
[npm-image]: https://img.shields.io/npm/v/hexo-word-counter?style=flat-square
[hexo-image]: https://img.shields.io/badge/hexo-%3E%3D%203.0-blue?style=flat-square
[cover-image]: https://img.shields.io/coveralls/next-theme/hexo-word-counter/master?style=flat-square
[lic-image]: https://img.shields.io/npm/l/hexo-word-counter?style=flat-square

[size-image]: https://img.shields.io/github/languages/code-size/next-theme/hexo-word-counter?style=flat-square
[dm-image]: https://img.shields.io/npm/dm/hexo-word-counter?style=flat-square
[dt-image]: https://img.shields.io/npm/dt/hexo-word-counter?style=flat-square

[github-url]: https://github.com/next-theme/hexo-word-counter/actions?query=workflow%3ALinter
[npm-url]: https://www.npmjs.com/package/hexo-word-counter
[hexo-url]: https://hexo.io
[cover-url]: https://coveralls.io/github/next-theme/hexo-word-counter?branch=master "Coverage of Tests"
