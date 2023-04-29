const textElement = document.getElementById("text");
const choicesContainer = document.getElementById("choices-container");

let currentScene = 0;

const scenesForChickenRice = [
  // チキンライス
  {
    text: "1. ご飯を炊く",
    choices: [{ text: "次へ", nextScene: 3 }],
  },
  {
    text: "2. チキンを炒める",
    choices: [{ text: "次へ", nextScene: 4 }],
  },
  {
    text: "3. 野菜を炒める",
    choices: [{ text: "次へ", nextScene: 5 }],
  },
  {
    text: "4. ケチャップで炒める",
    choices: [{ text: "次へ", nextScene: 6 }],
  },
  {
    text: "5. ご飯と混ぜる",
    choices: [{ text: "最初からやり直す", nextScene: 1 }],
  },
];

const scenesForCornSoup = [
  // コーンスープ
  {
    text: "1. バターを溶かす",
    choices: [{ text: "次へ", nextScene: 8 }],
  },
  {
    text: "2. 玉ねぎを炒める",
    choices: [{ text: "次へ", nextScene: 9 }],
  },
  {
    text: "3. コーンと水を加える",
    choices: [{ text: "次へ", nextScene: 10 }],
  },
  {
    text: "4. 塩コショウで味を整える",
    choices: [{ text: "次へ", nextScene: 11 }],
  },
  {
    text: "5. スープが煮立ったら完成",
    choices: [{ text: "最初からやり直す", nextScene: 1 }],
  },
];

const scenesForTeriyakiChicken = [
  // 照り焼きチキン
  {
    text: "1. 鶏肉を一口大に切ります。",
    choices: [{ text: "次へ", nextScene: 13 }],
  },
  {
    text: "2. フライパンに油をひいて鶏肉を炒めます。",
    choices: [{ text: "次へ", nextScene: 14 }],
  },
  {
    text: "3. 照り焼きソースを加えて炒めます。",
    choices: [{ text: "次へ", nextScene: 15 }],
  },
  {
    text: "4. 鶏肉に火が通ったら完成です！",
    choices: [{ text: "最初からやり直す", nextScene: 1 }],
  },
];

const scenes = [
  {
    text: "ゲームを始めるにはボタンを押してください。",
    choices: [{ text: "始める", nextScene: 1 }],
  },
  {
    text: "どの料理を作りますか？",
    choices: [
      { text: "チキンライス", nextScene: 2 },
      { text: "コーンスープ", nextScene: 7 },
      { text: "照り焼きチキン", nextScene: 12 },
    ],
  },
  ...scenesForChickenRice,
  ...scenesForCornSoup,
  ...scenesForTeriyakiChicken,
];

function showScene(sceneIndex) {
  const scene = scenes[sceneIndex];
  textElement.innerText = scene.text;
  choicesContainer.innerHTML = "";

  scene.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.innerText = choice.text;
    button.addEventListener("click", () => {
      showScene(choice.nextScene);
    });
    choicesContainer.appendChild(button);
  });
}

showScene(currentScene);

// こちらは手続き型のコードになります。
// こちらの機能がベースとなり、オブジェクト指向型のコードへと変換させます。
