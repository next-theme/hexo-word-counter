/* global hexo */

'use strict';

const helper = require('./lib/helper');
const { stripHTML } = require('hexo-util');

hexo.config.symbols_count_time = Object.assign({
  symbols: true,
  time: true,
  total_symbols: true,
  total_time: true,
  exclude_codeblock: false,
  awl: 4,
  wpm: 275,
  suffix: 'mins.'
}, hexo.config.symbols_count_time);
const config = hexo.config.symbols_count_time;

helper.setConfig(config);

if (config.symbols) {
  hexo.extend.helper.register('symbolsCount', helper.symbolsCount);
  hexo.extend.helper.register('wordcount', helper.symbolsCount);
}

if (config.time) {
  hexo.extend.helper.register('symbolsTime', helper.symbolsTime);
  hexo.extend.helper.register('min2read', helper.symbolsTime);
}

if (config.total_symbols) {
  hexo.extend.helper.register('symbolsCountTotal', helper.symbolsCountTotal);
  hexo.extend.helper.register('totalcount', helper.symbolsCountTotal);
}

if (config.total_time) {
  hexo.extend.helper.register('symbolsTimeTotal', helper.symbolsTimeTotal);
}

if (config.symbols || config.time || config.total_symbols || config.total_time) {
  hexo.extend.filter.register('after_post_render', data => {
    let { content } = data;
    if (config.exclude_codeblock) content = content.replace(/<pre>.*?<\/pre>/g, '');
    data.length = stripHTML(content).replace(/\r?\n|\r/g, '').replace(/\s+/g, '').length;
  }, 0);
}
