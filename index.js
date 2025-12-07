/* global hexo */

'use strict';

const { setConfig, symbolsCount, symbolsTime, symbolsCountTotal, symbolsTimeTotal } = require('./lib/helper');
let wordCount;
(() => {
  try {
    ({ wordCount } = require('./pkg/word_counter.js'));
  } catch (e) {
    // Fallback or better error handling if module not built
    console.warn('hexo-word-counter: WASM module not found. Run npm run build.');
    wordCount = () => 0;
  }

  const rBacktick = /^((?:[^\S\r\n]*>){0,3}[^\S\r\n]*)(`{3,}|~{3,})[^\S\r\n]*((?:.*?[^`\s])?)[^\S\r\n]*\n((?:[\s\S]*?\n)?)(?:(?:[^\S\r\n]*>){0,3}[^\S\r\n]*)\2[^\S\r\n]?(\n+|$)/gm;

  hexo.config.symbols_count_time = Object.assign({
    symbols: true,
    time: true,
    total_symbols: true,
    total_time: true,
    exclude_codeblock: false,
    wpm: 275,
    suffix: 'mins.'
  }, hexo.config.symbols_count_time);
  const config = hexo.config.symbols_count_time;

  setConfig(config);

  if (config.symbols) {
    hexo.extend.helper.register('symbolsCount', symbolsCount);
    hexo.extend.helper.register('wordcount', symbolsCount);
  }

  if (config.time) {
    hexo.extend.helper.register('symbolsTime', symbolsTime);
    hexo.extend.helper.register('min2read', symbolsTime);
  }

  if (config.total_symbols) {
    hexo.extend.helper.register('symbolsCountTotal', symbolsCountTotal);
    hexo.extend.helper.register('totalcount', symbolsCountTotal);
  }

  if (config.total_time) {
    hexo.extend.helper.register('symbolsTimeTotal', symbolsTimeTotal);
  }

  if (config.symbols || config.time || config.total_symbols || config.total_time) {
    hexo.extend.filter.register('after_post_render', data => {
      let { _content } = data;
      if (config.exclude_codeblock) _content = _content.replace(rBacktick, '');
      data.length = wordCount(_content);
    }, 0);
  }
})();
