class Menu {
  constructor(name, steps) {
    this.name = name;
    this.steps = steps;
  }
}

class Scene {
  constructor(text, choices) {
    this.text = text;
    this.choices = choices;
  }
}

class CookingGame {
  constructor(textElement, choicesContainer, menus) {
    this.textElement = textElement;
    this.choicesContainer = choicesContainer;
    this.menus = menus;
    this.currentScene = 0;
    this.initScenes();
  }

  initScenes() {
    const startScene = new Scene("ゲームを始めるにはボタンを押してください。", [
      { text: "始める", nextScene: 1 },
    ]);

    const menuSelectionScene = new Scene(
      "どの料理を作りますか？",
      this.menus.map((menu, index) => {
        return { text: menu.name, nextScene: index * 5 + 2 };
      })
    );

    this.scenes = [startScene, menuSelectionScene, ...this.createMenuScenes()];
  }

  createMenuScenes() {
    const menuScenes = [];

    this.menus.forEach((menu, menuIndex) => {
      menu.steps.forEach((step, stepIndex) => {
        const sceneText = step;
        const sceneChoices = [
          {
            text:
              stepIndex === menu.steps.length - 1 ? "最初からやり直す" : "次へ",
            nextScene:
              stepIndex === menu.steps.length - 1
                ? 1
                : menuIndex * 5 + stepIndex + 3,
          },
        ];

        menuScenes.push(new Scene(sceneText, sceneChoices));
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
    this.showScene(this.currentScene);
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
  "2. フライパンに油をひいて鶏肉を炒めます。",
  "3. 照り焼きソースを加えて炒めます。",
  "4. 鶏肉に火が通ったら完成です！",
]);

const textElement = document.getElementById("text");
const choicesContainer = document.getElementById("choices-container");
const game = new CookingGame(textElement, choicesContainer, [
  chickenRiceMenu,
  cornSoupMenu,
  teriyakiChickenMenu,
]);
game.start();

// このリファクタリングでは、以下のような変更を行いました。

// 1. `Scene` クラスを追加し、シーンのテキストと選択肢を管理するようにしました。
// 2. `initScenes` 関数の中でシーンを作成し、 `scenes` 配列に追加するようにしました。
// 3. `createMenuScenes` 関数で、各メニューのステップに対応するシーンを作成し、 `menuScenes` 配列に追加しています。

// このようにリファクタリングすることで、各クラスや関数が一つの責任を持つようになり、コードが整理され、可読性や保守性が向上します。
