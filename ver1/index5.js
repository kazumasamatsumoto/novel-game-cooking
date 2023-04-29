class Menu {
  constructor(name, steps) {
    if (new.target === Menu) {
      throw new TypeError("Cannot construct Menu instances directly");
    }
    this.name = name;
    this.steps = steps;
  }

  createScene(stepIndex) {
    const sceneText = this.steps[stepIndex];
    const sceneChoices = [
      {
        text: stepIndex === this.steps.length - 1 ? "最初からやり直す" : "次へ",
        nextScene: stepIndex === this.steps.length - 1 ? 1 : stepIndex + 3,
      },
    ];
    return new Scene(sceneText, sceneChoices);
  }
}

class ChickenRiceMenu extends Menu {}

class CornSoupMenu extends Menu {}

class TeriyakiChickenMenu extends Menu {}

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
        menuScenes.push(menu.createScene(stepIndex));
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

class Scene {
  constructor(text, choices) {
    this.text = text;
    this.choices = choices;
  }
}

const chickenRiceMenu = new ChickenRiceMenu("チキンライス", [
  "1. ご飯を炊く",
  "2. チキンを炒める",
  "3. 野菜を炒める",
  "4. ケチャップで炒める",
  "5. ご飯と混ぜる",
]);

const cornSoupMenu = new CornSoupMenu("コーンスープ", [
  "1. バターを溶かす",
  "2. 玉ねぎを炒める",
  "3. コーンと水を加える",
  "4. 塩コショウで味を整える",
  "5. スープが煮立ったら完成",
]);

const teriyakiChickenMenu = new TeriyakiChickenMenu("照り焼きチキン", [
  "1. 鶏肉を一口大に切ります。",
  "2. フライパンに油をひいて鶏肉を炒めます。",
  "3. 照り焼きソースを加えて炒めます。",
  "4. 鶏肉に火が通ったら完成です！",
]);

const game = new CookingGame(
  document.getElementById("text"),
  document.getElementById("choices-container"),
  [chickenRiceMenu, cornSoupMenu, teriyakiChickenMenu]
);
game.start();

// このコードはポリモーフィズムの考え方を適用しています。Menu クラスに createScene() メソッドを実装し、
// サブクラスでオーバーライドする必要がなくなりました。
// これにより、ChickenRiceMenu、CornSoupMenu、および TeriyakiChickenMenu のインスタンスは、
// すべて Menu 型として扱うことができます。
// また、この変更により、異なるメニューのインスタンスでも同じ createScene() メソッドを呼び出すことができます。

// このような設計は、新しいメニューを追加する際にも役立ちます。
// 新しいメニュークラスを Menu クラスから継承するだけで、既存の createScene() メソッドを利用できるため、
// コードの再利用性が向上します。
