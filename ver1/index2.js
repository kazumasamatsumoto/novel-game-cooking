class CookingGame {
  constructor(textElement, choicesContainer) {
    this.textElement = textElement;
    this.choicesContainer = choicesContainer;
    this.currentScene = 0;
  }

  initScenes() {
    this.scenes = [
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
      ...this.chickenRiceScenes(),
      ...this.cornSoupScenes(),
      ...this.teriyakiChickenScenes(),
    ];
  }

  chickenRiceScenes() {
    return [
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
  }

  cornSoupScenes() {
    return [
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
  }

  teriyakiChickenScenes() {
    return [
      // 照り焼きチキン
      {
        text: "1. 鶏肉を一口大に切ります。",
        choices: [{ text: "次へ", nextScene: 13 }],
      },
      {
        text: "2.フライパンに油をひいて鶏肉を炒めます。",
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
  }

  showScene(sceneIndex) {
    const scene = this.scenes[sceneIndex];
    this.textElement.innerText = scene.text;
    this.choicesContainer.innerHTML = "";

    scene.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.innerText = choice.text;
      button.addEventListener("click", () => {
        this.showScene(choice.nextScene);
      });
      this.choicesContainer.appendChild(button);
    });
  }

  start() {
    this.initScenes();
    this.showScene(this.currentScene);
  }
}

const textElement = document.getElementById("text");
const choicesContainer = document.getElementById("choices-container");
const game = new CookingGame(textElement, choicesContainer);
game.start();

// まずはクラスとインスタンスという概念を学びます。
