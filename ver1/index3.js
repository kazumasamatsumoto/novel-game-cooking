class Menu {
  constructor(name, steps) {
    this.name = name;
    this.steps = steps;
  }
}

const chickenRiceMenu = new Menu("チキンライス", [
  "1. ご飯を炊く",
  "2. チキンを炒める",
  "3. 野菜を炒める",
  "4. ケチャップで炒める",
  "5. ご飯と混ぜる",
]);

const cornSoupMenu = new Menu("コーンスープ", [
  "1. バターを溶かす",
  "2. 玉ねぎを炒める",
  "3. コーンと水を加える",
  "4. 塩コショウで味を整える",
  "5. スープが煮立ったら完成",
]);

const teriyakiChickenMenu = new Menu("照り焼きチキン", [
  "1. 鶏肉を一口大に切ります。",
  "2.フライパンに油をひいて鶏肉を炒めます。",
  "3. 照り焼きソースを加えて炒めます。",
  "4. 鶏肉に火が通ったら完成です！",
]);

class CookingGame {
  constructor(textElement, choicesContainer, menus) {
    this.textElement = textElement;
    this.choicesContainer = choicesContainer;
    this.menus = menus;
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
        choices: this.menus.map((menu, index) => {
          return { text: menu.name, nextScene: index * 5 + 2 };
        }),
      },
      ...this.createMenuScenes(),
    ];
  }

  createMenuScenes() {
    const menuScenes = [];

    this.menus.forEach((menu, menuIndex) => {
      menu.steps.forEach((step, stepIndex) => {
        menuScenes.push({
          text: step,
          choices: [
            {
              text:
                stepIndex === menu.steps.length - 1
                  ? "最初からやり直す"
                  : "次へ",
              nextScene:
                stepIndex === menu.steps.length - 1
                  ? 1
                  : menuIndex * 5 + stepIndex + 3,
            },
          ],
        });
      });
    });

    return menuScenes;
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
const game = new CookingGame(textElement, choicesContainer, [
  chickenRiceMenu,
  cornSoupMenu,
  teriyakiChickenMenu,
]);
game.start();

// メニューをクラス化してCookingGameクラスを少し削減しました。
// このように一つのクラスにいろいろな実装を詰め込むと、クラスの責務が大きくなり、
// そのクラスを変更するときに他のクラスに影響が出てしまう可能性があります。
// これを高い凝集度といいます。
