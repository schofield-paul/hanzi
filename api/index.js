const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

// allow all
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

const Hanzi = require("./hanzi.js");
const { connectToDB } = require("./database.js");
console.log("Database:", connectToDB);

const port = process.env.PORT || 3000;

// Get Hanzi objects array by HSK section and level
app.get("/hanzi", async (req, res) => {
  const { hsk_level, hsk_section } = req.query;
  try {
    await connectToDB();

    const hanziData = await Hanzi.find({
      hsk_level: hsk_level,
      hsk_section: hsk_section,
    });

    res.status(200).json(hanziData);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).send("Server Error");
  }
});

// Post new Hanzi object
/*

app.post("/hanzi", async (req, res) => {
  try {
    await connectToDB();

    const newHanziArray = [];

    const hanziArray = [
      {
        character: "百",
        pinyin: "bǎi",
        english: "hundred",
        hsk_level: "2",
        hsk_section: "1",
      },
      {
        character: "千",
        pinyin: "qiān",
        english: "thousand",
        hsk_level: "2",
        hsk_section: "1",
      },
      {
        character: "第一",
        pinyin: "dìyī",
        english: "first",
        hsk_level: "2",
        hsk_section: "1",
      },
      {
        character: "个",
        pinyin: "gè",
        english: "one, a, an",
        hsk_level: "2",
        hsk_section: "1",
      },
      {
        character: "岁",
        pinyin: "suì",
        english: "year",
        hsk_level: "2",
        hsk_section: "1",
      },
      {
        character: "本",
        pinyin: "běn",
        english: "volume",
        hsk_level: "2",
        hsk_section: "1",
      },
      {
        character: "些",
        pinyin: "xiē",
        english: "some",
        hsk_level: "2",
        hsk_section: "1",
      },
      {
        character: "块",
        pinyin: "kuài",
        english: "piece",
        hsk_level: "2",
        hsk_section: "1",
      },
      {
        character: "次",
        pinyin: "cì",
        english: "number",
        hsk_level: "2",
        hsk_section: "1",
      },
      {
        character: "公斤",
        pinyin: "gōngjīn",
        english: "kilogram",
        hsk_level: "2",
        hsk_section: "1",
      },
      {
        character: "元",
        pinyin: "yuán",
        english: "yuan",
        hsk_level: "2",
        hsk_section: "1",
      },
      {
        character: "件",
        pinyin: "jiàn",
        english: "piece",
        hsk_level: "2",
        hsk_section: "1",
      },
      {
        character: "张",
        pinyin: "zhāng",
        english: "sheet",
        hsk_level: "2",
        hsk_section: "1",
      },
      {
        character: "不",
        pinyin: "bù",
        english: "no",
        hsk_level: "2",
        hsk_section: "1",
      },
      {
        character: "没",
        pinyin: "méi",
        english: "no",
        hsk_level: "2",
        hsk_section: "1",
      },
      {
        character: "很",
        pinyin: "hěn",
        english: "quite, very",
        hsk_level: "2",
        hsk_section: "1",
      },
      {
        character: "太",
        pinyin: "tài",
        english: "too",
        hsk_level: "2",
        hsk_section: "1",
      },
      {
        character: "都",
        pinyin: "dōu",
        english: "all",
        hsk_level: "2",
        hsk_section: "1",
      },
      {
        character: "里面",
        pinyin: "lǐmiàn",
        english: "inside",
        hsk_level: "2",
        hsk_section: "2",
      },
      {
        character: "今天",
        pinyin: "jīntiān",
        english: "today",
        hsk_level: "2",
        hsk_section: "2",
      },
      {
        character: "明天",
        pinyin: "míngtiān",
        english: "tomorrow",
        hsk_level: "2",
        hsk_section: "2",
      },
      {
        character: "昨天",
        pinyin: "zuótiān",
        english: "yesterday",
        hsk_level: "2",
        hsk_section: "2",
      },
      {
        character: "上午",
        pinyin: "shàngwǔ",
        english: "morning",
        hsk_level: "2",
        hsk_section: "2",
      },
      {
        character: "中午",
        pinyin: "zhōngwǔ",
        english: "noon",
        hsk_level: "2",
        hsk_section: "2",
      },
      {
        character: "下午",
        pinyin: "xiàwǔ",
        english: "afternoon",
        hsk_level: "2",
        hsk_section: "2",
      },
      {
        character: "年",
        pinyin: "nián",
        english: "year",
        hsk_level: "2",
        hsk_section: "2",
      },
      {
        character: "月",
        pinyin: "yuè",
        english: "month",
        hsk_level: "2",
        hsk_section: "2",
      },
      {
        character: "日",
        pinyin: "rì",
        english: "day",
        hsk_level: "2",
        hsk_section: "2",
      },
      {
        character: "星期",
        pinyin: "xīngqī",
        english: "week",
        hsk_level: "2",
        hsk_section: "2",
      },
      {
        character: "点",
        pinyin: "diǎn",
        english: "dot, spot",
        hsk_level: "2",
        hsk_section: "2",
      },
      {
        character: "茶",
        pinyin: "chá",
        english: "tea",
        hsk_level: "2",
        hsk_section: "3",
      },
      {
        character: "杯子",
        pinyin: "bēizi",
        english: "cup",
        hsk_level: "2",
        hsk_section: "3",
      },
      {
        character: "钱",
        pinyin: "qián",
        english: "money",
        hsk_level: "2",
        hsk_section: "3",
      },
      {
        character: "飞机",
        pinyin: "fēijī",
        english: "airplane",
        hsk_level: "2",
        hsk_section: "3",
      },
      {
        character: "出租车",
        pinyin: "chūzūchē",
        english: "taxi",
        hsk_level: "2",
        hsk_section: "3",
      },
      {
        character: "电视",
        pinyin: "diànshì",
        english: "television",
        hsk_level: "2",
        hsk_section: "3",
      },
      {
        character: "电脑",
        pinyin: "diànnǎo",
        english: "computer",
        hsk_level: "2",
        hsk_section: "3",
      },
      {
        character: "电影",
        pinyin: "diànyǐng",
        english: "movie",
        hsk_level: "2",
        hsk_section: "3",
      },
      {
        character: "天气",
        pinyin: "tiānqì",
        english: "weather",
        hsk_level: "2",
        hsk_section: "3",
      },
      {
        character: "猫",
        pinyin: "māo",
        english: "cat",
        hsk_level: "2",
        hsk_section: "3",
      },
      {
        character: "班",
        pinyin: "bān",
        english: "class",
        hsk_level: "3",
        hsk_section: "1",
      },
      {
        character: "搬",
        pinyin: "bān",
        english: "turn; pull",
        hsk_level: "3",
        hsk_section: "1",
      },
      {
        character: "半",
        pinyin: "bàn",
        english: "half",
        hsk_level: "3",
        hsk_section: "1",
      },
      {
        character: "办法",
        pinyin: "bànfǎ",
        english: "Way",
        hsk_level: "3",
        hsk_section: "1",
      },
      {
        character: "办公室",
        pinyin: "bàngōngshì",
        english: "Office",
        hsk_level: "3",
        hsk_section: "1",
      },
      {
        character: "帮忙",
        pinyin: "bāngmáng",
        english: "Help",
        hsk_level: "3",
        hsk_section: "1",
      },
      {
        character: "帮助",
        pinyin: "bāngzhù",
        english: "Help",
        hsk_level: "3",
        hsk_section: "1",
      },
      {
        character: "包",
        pinyin: "bāo",
        english: "package",
        hsk_level: "3",
        hsk_section: "1",
      },
      {
        character: "饱",
        pinyin: "bǎo",
        english: "full",
        hsk_level: "3",
        hsk_section: "1",
      },
      {
        character: "报纸",
        pinyin: "bàozhǐ",
        english: "Newspaper",
        hsk_level: "3",
        hsk_section: "1",
      },
      {
        character: "菜单",
        pinyin: "càidān",
        english: "menu",
        hsk_level: "3",
        hsk_section: "2",
      },
      {
        character: "参加",
        pinyin: "cānjiā",
        english: "participate in",
        hsk_level: "3",
        hsk_section: "2",
      },
      {
        character: "草",
        pinyin: "cǎo",
        english: "grass",
        hsk_level: "3",
        hsk_section: "2",
      },
      {
        character: "层",
        pinyin: "céng",
        english: "layer",
        hsk_level: "3",
        hsk_section: "2",
      },
      {
        character: "茶",
        pinyin: "chá",
        english: "tea",
        hsk_level: "3",
        hsk_section: "2",
      },
      {
        character: "差",
        pinyin: "chà",
        english: "difference",
        hsk_level: "3",
        hsk_section: "2",
      },
      {
        character: "长",
        pinyin: "cháng",
        english: "long",
        hsk_level: "3",
        hsk_section: "2",
      },
      {
        character: "唱歌",
        pinyin: "chànggē",
        english: "Sing",
        hsk_level: "3",
        hsk_section: "2",
      },
      {
        character: "打篮球",
        pinyin: "dǎlánqiú",
        english: "Play basketball",
        hsk_level: "3",
        hsk_section: "2",
      },
      {
        character: "打扫",
        pinyin: "dǎsǎo",
        english: "Clean",
        hsk_level: "3",
        hsk_section: "2",
      },
      {
        character: "打算",
        pinyin: "dǎsuàn",
        english: "Plan",
        hsk_level: "3",
        hsk_section: "2",
      },
      {
        character: "大",
        pinyin: "dà",
        english: "large",
        hsk_level: "3",
        hsk_section: "2",
      },
      {
        character: "大家",
        pinyin: "dàjiā",
        english: "everybody",
        hsk_level: "3",
        hsk_section: "2",
      },
      {
        character: "发现",
        pinyin: "fāxiàn",
        english: "find",
        hsk_level: "3",
        hsk_section: "3",
      },
      {
        character: "饭馆",
        pinyin: "fànguǎn",
        english: "restaurant",
        hsk_level: "3",
        hsk_section: "3",
      },
      {
        character: "方便",
        pinyin: "fāngbiàn",
        english: "convenient",
        hsk_level: "3",
        hsk_section: "3",
      },
      {
        character: "房间",
        pinyin: "fángjiān",
        english: "Room",
        hsk_level: "3",
        hsk_section: "3",
      },
      {
        character: "放",
        pinyin: "fàng",
        english: "discharge",
        hsk_level: "3",
        hsk_section: "3",
      },
      {
        character: "放心",
        pinyin: "fàngxīn",
        english: "Don’t worry",
        hsk_level: "3",
        hsk_section: "3",
      },
      {
        character: "非常",
        pinyin: "fēicháng",
        english: "very",
        hsk_level: "3",
        hsk_section: "3",
      },
      {
        character: "飞机",
        pinyin: "fēijī",
        english: "aircraft",
        hsk_level: "3",
        hsk_section: "3",
      },
      {
        character: "分",
        pinyin: "fēn",
        english: "branch",
        hsk_level: "3",
        hsk_section: "3",
      },
      {
        character: "分钟",
        pinyin: "fēnzhōng",
        english: "Minute",
        hsk_level: "3",
        hsk_section: "3",
      },
      {
        character: "服务员",
        pinyin: "fúwùyuán",
        english: "Waiter",
        hsk_level: "3",
        hsk_section: "3",
      },
      {
        character: "附近",
        pinyin: "fùjìn",
        english: "nearby",
        hsk_level: "3",
        hsk_section: "3",
      },
    ];

    for (const hanziData of hanziArray) {
      const { character, pinyin, english, hsk_level, hsk_section } = hanziData;

      const newHanzi = await Hanzi.create({
        character,
        pinyin,
        english,
        hsk_level,
        hsk_section,
      });
      newHanziArray.push(newHanzi);
    }

    res.status(201).json(newHanziArray);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}); 
*/

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

/* Cors temp
const corsOptions = {
  origin: ["https://www.hanzi-app.com", "https://www.hanzi-app.com/"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
*/
