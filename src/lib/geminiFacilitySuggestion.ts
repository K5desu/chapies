import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = async (inputText: string) => {
  // URLパラメータ取得

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";

  // インスタンス生成
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(
    `


施設の提案をしてもらいます。以下の情報と例を元に私の入力内容に沿ってに提案してください。
まずは施設の情報を以下に記します。

施設名：steamコモンズ
説明：ものづくりができる場所。3Dプリンター、レーザーカッター、大型インクジェットプリンターなどを設置しており、（大型機械は予約必要）マイコンも貸し出ししているためIoTを用いたものづくりも経験できる。
タグ：IT

施設名：ランゲージスタディエリア
説明：
・周りを気にせずリスニング・スピーキングの練習ができる個人ブースを常設。
・外国語の語学試験対策ができる
・自分のペースで自由に学習（予約不要）
・専門の参考書や問題集が勢揃い
・静かな環境で集中して勉強ができる
・グループワークも実施可
・夏期休・春期冬期休暇期間もあいてます
タグ：言語

施設名：グローバルラウンジ＆キッチン
説明：多言語を用いたイベントの開催、料理をテーマにしたイベントの開催。予約必要。
タグ：言語

施設名：ファミリーマート龍谷大学店
説明：ファミリーマート。生協電子マネー利用不可。お酒売ってない。
タグ：コンビニ、スタバ、ラーメン

施設名：瀬田図書館
説明：
理工学関連の資料：物理学、化学、生物学、工学、情報科学など
経済学・経営学関連の資料：経済理論、経営戦略、マーケティング、会計学など
スポーツ・健康科学関連の資料：スポーツ科学、健康管理、栄養学など
タグ：図書館

施設名：深草図書館
説明：
人文社会系の資料：文学、歴史、哲学、社会学、心理学など
法学部関連の資料：法律、政治学、経済学など
語学学習資料：英語、フランス語、中国語、日本語教育に関する書籍や教材

施設名：大宮図書館
説明：
仏教学関連の資料：仏教の経典や研究書、仏教文化に関する書籍
歴史学関連の資料：日本史、東洋史、西洋史に関する書籍
文化財学関連の資料：文化財の保存・修復に関する書籍や研究資料

施設名：学生交流会館
説明：展示ギャラリー、会議室、イベントホール。コンセプト「学生がやりたいことを自由にできる場所」地上2階、地下1階の3フロアからなるこのホールでは、イベント時、地下1階が舞台に、階段が客席に早変わりします。
タグ：部活、サークル

施設名：龍谷の森
説明：瀬田キャンパスに隣接する約38haの森です。コナラやアカマツが優占する針広混交林の二次林であり、近畿地方の典型的な里山林です。生息する動植物の生態を観察・調査するだけでなく、都市化やグローバル化が進行する現在の近畿地方における里山に関する諸問題や、この地域にかつてあった人と自然の関係が学べます。
龍谷の森には遊歩道等がありません。森に限らず自然には想像以上の危険が潜んでいます。龍谷の森への入林にあたっては瀬田事務部への事前申請が必要です。

ここからは質問に対する回答の例です。以下の例にも従って回答してください。

例1：IoT機器に触れラジコンを作りたい、3Dプリンターを使って入れ物を作りたい
回答：steamコモンズ

例2：料理を用いたイベントを開催したい
回答：グローバルラウンジ＆キッチン

例3：パンを買いたい。買い物がしたい
回答：ファミリーマート龍谷大学店

例4：マシニングセンタの使い方、設計・モデリングの方法、プログラミングの方法を調べたい
回答：瀬田図書館

例5：心理学の歴史について調べたい

回答：深草図書館

例6：お釈迦様は何をしたのか調べたい、仏教について調べたい。

回答：大宮図書館

例7：学生同士で集まってイベントをしたい、勉強会を開きたい。

回答：学生交流会館

例8：自然に関する研究がしたい、生き物に触れながら学びたい。

回答：龍谷の森

例9：TOEICの点数を上げたい、スピーキングの練習がしたい。

回答：ランゲージスタディエリア
では私の入力内容です。
${inputText}
よろしくお願いいたします。
   `
  );

  const response = await result.response;
  return response;
  // ここでresponseを使用する
};

export default gemini;
