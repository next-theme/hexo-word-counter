'use strict';

require('chai').should();

const fs = require('fs');
const helper = require('../lib/helper');
const { wordCount } = require('../index.node');

const config = {
  wpm: 275,
  suffix: 'mins.'
};

class Post {
  constructor(content) {
    this._content = content;
    this.length = wordCount(this._content);
  }
}

helper.setConfig(config);

describe('Hexo Symbols Count Time', () => {

  const elevenThousandsSymbols = fs.readFileSync('./test/lorem.txt', 'utf8');

  describe('Test wordsCount function', () => {
    const post = new Post('Count of words is 5');
    const words = helper.symbolsCount(post);

    it('should - 5', () => {
      words.should.eq(5);
    });

  });

  describe('Test wordsCount < 999', () => {
    const post = new Post('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
    const words = helper.symbolsCount(post);

    it('Words: 88 => 88', () => {
      words.should.eq(88);
    });
  });

  describe('Test wordsCount < 999', () => {
    const post = new Post('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
    const words = helper.symbolsCount(post);

    it('Words: 207 => 207', () => {
      words.should.eq(207);
    });
  });

  describe('Test wordsCount > 999', () => {
    const post = new Post(elevenThousandsSymbols);
    const words = helper.symbolsCount(post);

    it('Words: ??? => 1.7k', () => {
      words.should.eq('1.7k');
    });
  });

  describe('Test wordsCount & wordsTime (wpm)', () => {

    const post = new Post('---\ntitle: Test Hexo Symbols Count Time\n\ndate: 2017-11-25 12:35\n---\nCount of words is 89');

    it('Words: (symbolsCount = 90)', () => {
      const words = helper.symbolsCount(post);
      words.should.eq(17);
    });

    it('Time: [wpm = 200] => 1 mins.', () => {
      const words = helper.symbolsTime(post);
      words.should.eq(1);
    });

    it('Time: [wpm = 5] => 4 mins.', () => {
      const words = helper.symbolsTime(post, null, 5);
      words.should.eq(1);
    });

    it('Time: [wpm = 50] => 2 mins.', () => {
      const words = helper.symbolsTime(post, null, 50);
      words.should.eq(1);
    });

  });

  describe('Test wordsTime (< 58 minutes / > 1:08)', () => {

    const lessThanOneHourReading = elevenThousandsSymbols + elevenThousandsSymbols + elevenThousandsSymbols + elevenThousandsSymbols + elevenThousandsSymbols + elevenThousandsSymbols;
    const moreThanOneHourReading = lessThanOneHourReading + elevenThousandsSymbols;
    const moreThanOneHourReadingAndMoreThanTenMinutes = moreThanOneHourReading + elevenThousandsSymbols;

    it('Time: 64218 = 58 => 58 minutes', () => {
      const words = helper.symbolsTime(lessThanOneHourReading, 4, 275, 'minutes');
      words.should.eq(1);
    });

    it('Time: 74921 = 68 => 1:08', () => {
      const words = helper.symbolsTime(moreThanOneHourReading, 4, 275, 'minutes to read');
      words.should.eq(1);
    });

    it('Time: 85624 = 78 => 1:18', () => {
      const words = helper.symbolsTime(moreThanOneHourReadingAndMoreThanTenMinutes, 4, 275, 'minutes to read');
      words.should.eq(1);
    });

  });

});
