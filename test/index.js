'use strict';

require('chai').should();

const { LoremIpsum } = require('lorem-ipsum');
const helper = require('../lib/helper');
const { wordCount } = require('../pkg/word_counter.js');

class Post {
  constructor(content) {
    this._content = content;
    this.length = wordCount(this._content);
  }
}

const cn = '天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。寒来暑往，秋收冬藏。闰余成岁，律吕调阳。云腾致雨，露结为霜。金生丽水，玉出昆冈。剑号巨阙，珠称夜光。果珍李柰，菜重芥姜。海咸河淡，鳞潜羽翔。龙师火帝，鸟官人皇。始制文字，乃服衣裳。推位让国，有虞陶唐。吊民伐罪，周发殷汤。坐朝问道，垂拱平章。爱育黎首，臣伏戎羌。遐迩一体，率宾归王。鸣凤在竹，白驹食场。化被草木，赖及万方。盖此身发，四大五常。恭惟鞠养，岂敢毁伤。女慕贞洁，男效才良。知过必改，得能莫忘。罔谈彼短，靡恃己长。信使可覆，器欲难量。墨悲丝染，诗赞羔羊。景行维贤，克念作圣。德建名立，形端表正。空谷传声，虚堂习听。祸因恶积，福缘善庆。尺璧非宝，寸阴是竞。资父事君，曰严与敬。孝当竭力，忠则尽命。临深履薄，夙兴温凊。似兰斯馨，如松之盛。川流不息，渊澄取映。容止若思，言辞安定。笃初诚美，慎终宜令。荣业所基，籍甚无竟。学优登仕，摄职从政。存以甘棠，去而益咏。乐殊贵贱，礼别尊卑。上和下睦，夫唱妇随。外受傅训，入奉母仪。诸姑伯叔，犹子比儿。孔怀兄弟，同气连枝。交友投分，切磨箴规。仁慈隐恻，造次弗离。节义廉退，颠沛匪亏。性静情逸，心动神疲。守真志满，逐物意移。坚持雅操，好爵自縻。都邑华夏，东西二京。背邙面洛，浮渭据泾。宫殿盘郁，楼观飞惊。图写禽兽，画彩仙灵。丙舍旁启，甲帐对楹。肆筵设席，鼓瑟吹笙。升阶纳陛，弁转疑星。右通广内，左达承明。既集坟典，亦聚群英。杜稿钟隶，漆书壁经。府罗将相，路侠槐卿。户封八县，家给千兵。高冠陪辇，驱毂振缨。世禄侈富，车驾肥轻。策功茂实，勒碑刻铭。磻溪伊尹，佐时阿衡。奄宅曲阜，微旦孰营。桓公匡合，济弱扶倾。绮回汉惠，说感武丁。俊义密勿，多士实宁。晋楚更霸，赵魏困横。假途灭虢，践土会盟。何遵约法，韩弊烦刑。起翦颇牧，用军最精。宣威沙漠，驰誉丹青。九州禹迹，百郡秦并。岳宗泰岱，禅主云亭。雁门紫塞，鸡田赤城。昆池碣石，钜野洞庭。旷远绵邈，岩岫杳冥。治本于农，务兹稼穑。俶载南亩，我艺黍稷。税熟贡新，劝赏黜陟。孟轲敦素，史鱼秉直。庶几中庸，劳谦谨敕。聆音察理，鉴貌辨色。贻厥嘉猷，勉其祗植。省躬讥诫，宠增抗极。殆辱近耻，林皋幸即。两疏见机，解组谁逼。索居闲处，沉默寂寥。求古寻论，散虑逍遥。欣奏累遣，戚谢欢招。渠荷的历，园莽抽条。枇杷晚翠，梧桐蚤凋。陈根委翳，落叶飘摇。游鹍独运，凌摩绛霄。耽读玩市，寓目囊箱。易輶攸畏，属耳垣墙。具膳餐饭，适口充肠。饱饫烹宰，饥厌糟糠。亲戚故旧，老少异粮。妾御绩纺，侍巾帷房。纨扇圆洁，银烛炜煌。昼眠夕寐，蓝笋象床。弦歌酒宴，接杯举觞。矫手顿足，悦豫且康。嫡后嗣续，祭祀烝尝。稽颡再拜，悚惧恐惶。笺牒简要，顾答审详。骸垢想浴，执热愿凉。驴骡犊特，骇跃超骧。诛斩贼盗，捕获叛亡。布射僚丸，嵇琴阮啸。恬笔伦纸，钧巧任钓。释纷利俗，并皆佳妙。毛施淑姿，工颦妍笑。年矢每催，曦晖朗曜。璇玑悬斡，晦魄环照。指薪修祜，永绥吉劭。矩步引领，俯仰廊庙。束带矜庄，徘徊瞻眺。孤陋寡闻，愚蒙等诮。谓语助者，焉哉乎也。';

const ja = '人類社会のすべての構成員の固有の尊厳と平等で譲ることのできない権利とを承認することは、世界における自由、正義及び平和の基礎であるので、 人権の無視及び軽侮が、人類の良心を踏みにじった野蛮行為をもたらし、言論及び信仰の自由が受けられ、恐怖及び欠乏のない世界の到来が、一般の人々の最高の願望として宣言されたので、 人間が専制と圧迫とに対する最後の手段として反逆に訴えることがないようにするためには、法の支配によって人権を保護することが肝要であるので、 諸国間の友好関係の発展を促進することが肝要であるので、国際連合の諸国民は、国連憲章において、基本的人権、人間の尊厳及び価値並びに男女の同権についての信念を再確認し、かつ、一層大きな自由のうちで社会的進歩と生活水準の向上とを促進することを決意したので、 加盟国は、国際連合と協力して、人権及び基本的自由の普遍的な尊重及び遵守の促進を達成することを誓約したので、 これらの権利及び自由に対する共通の理解は、この誓約を完全にするためにもっとも重要であるので、 よって、ここに、国連総会は、 社会の各個人及び各機関が、この世界人権宣言を常に念頭に置きながら、加盟国自身の人民の間にも、また、加盟国の管轄下にある地域の人民の間にも、これらの権利と自由との尊重を指導及び教育によって促進すること並びにそれらの普遍的措置によって確保することに努力するように、すべての人民とすべての国とが達成すべき共通の基準として、この人権宣言を公布する。';
const jaGroundTruth = 596;
const ko = '모든 사람은 의견의 자유와 표현의 자유에 대한 권리를 가진다. 이러한 권리는 간섭없이 의견을 가질 자유와 국경에 관계없이 어떠한 매체를 통해서도 정보와 사상을 추구하고, 얻으며, 전달하는 자유를 포함한다. 모든 사람은 사회의 일원으로서 사회보장을 받을 권리를 가지며, 국가적 노력과 국제적 협력을 통하여, 그리고 각 국가의 조직과 자원에 따라서 자신의 존엄과 인격의 자유로운 발전에 불가결한 경제적, 사회적 및 문화적 권리들을 실현할 권리를 가진다. 모든 사람은 노동시간의 합리적 제한과 정기적인 유급휴가를 포함하여 휴식과 여가의 권리를 가진다. 모든 사람은 이 선언에 규정된 권리와 자유가 완전히 실현될 수 있도록 사회적, 국제적 질서에 대한 권리를 가진다.';
const koGroundTruth = 89;

const markdown = `![There are 4 words](https://example.com/should/exclude/words/in/url.jpg)
[而这有六个字](https://example.com/should/exclude/words/in/url/)`;

const config = {
  wpm: 275,
  suffix: 'mins.'
};

helper.setConfig(config);

describe('Hexo Symbols Count Time', () => {

  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 8
    },
    wordsPerSentence: {
      max: 16,
      min: 16
    }
  });
  const en = lorem.generateParagraphs(1);

  describe('Test wordsCount multilingual', () => {

    it('Chinese', () => {
      const post = new Post(cn);
      const words = helper.symbolsCount(post);
      words.should.eq('1k');
    });

    it('Japanese', () => {
      const post = new Post(ja);
      const words = helper.symbolsCount(post);
      words.should.eq(jaGroundTruth);
    });

    it('Korean', () => {
      const post = new Post(ko);
      const words = helper.symbolsCount(post);
      words.should.eq(koGroundTruth);
    });

    it('Multilingual', () => {
      const post = new Post([ja, en, ko].join(' '));
      const words = helper.symbolsCount(post);
      words.should.eq(jaGroundTruth + 128 + koGroundTruth);
    });

  });

  describe('Test wordsCount with markdown', () => {
    const post = new Post(markdown);
    const words = helper.symbolsCount(post);

    it('Markdown', () => {
      words.should.eq(10);
    });

  });

  describe('Test wordsCount > 999', () => {
    const post = new Post(lorem.generateParagraphs(10));
    const words = helper.symbolsCount(post);

    it('Words: 1280 => 1.3k', () => {
      words.should.eq('1.3k');
    });
  });

  describe('Test wordsCount > 9999', () => {
    const post = new Post(lorem.generateParagraphs(80));
    const words = helper.symbolsCount(post);

    it('Words: 10240 => 10k', () => {
      words.should.eq('10k');
    });
  });

  describe('Test wordsCount & wordsTime (wpm)', () => {

    const post = new Post(en);

    it('Words: (symbolsCount = 128)', () => {
      const words = helper.symbolsCount(post);
      words.should.eq(128);
    });

    it('Time: [wpm = 200] => 1 mins.', () => {
      const words = helper.symbolsTime(post);
      words.should.eq('1 mins.');
    });

    it('Time: [wpm = 50] => 3 mins.', () => {
      const words = helper.symbolsTime(post, null, 50);
      words.should.eq('3 mins.');
    });

    it('Time: [wpm = 10] => 13 mins.', () => {
      const words = helper.symbolsTime(post, null, 10);
      words.should.eq('13 mins.');
    });

  });

  describe('Test wordsTime (< 1h / > 1h 10min)', () => {

    const lessThanOneHourReading = new Post(lorem.generateParagraphs(120));
    const moreThanOneHourReading = new Post(lorem.generateParagraphs(130));
    const moreThanOneHourReadingAndMoreThanTenMinutes = new Post(lorem.generateParagraphs(160));

    it('Time: 120 = 56 => 56 minutes', () => {
      const words = helper.symbolsTime(lessThanOneHourReading, null, 275, 'minutes');
      words.should.eq('56 minutes');
    });

    it('Time: 130 = 61 => 1:01', () => {
      const words = helper.symbolsTime(moreThanOneHourReading, null, 275, 'minutes to read');
      words.should.eq('1:01');
    });

    it('Time: 160 = 74 => 1:14', () => {
      const words = helper.symbolsTime(moreThanOneHourReadingAndMoreThanTenMinutes, null, 275, 'minutes to read');
      words.should.eq('1:14');
    });

  });

});
