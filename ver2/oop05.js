class MessageWindow {
  constructor(message) {
    this.messageElement = document.getElementById("text");
    this.message = message
  }

  async showText() {
    this.messageElement.innerText = "";
    for (let i = 0; i < this.message.length; i++) {
      this.messageElement.innerText += this.message[i];
      await new Promise(resolve => setTimeout(resolve, 20));
    }
  }
}

class ChoicesContainer {
  choicesContainer;
  buttons;

  /**
   *
   * @param {ChoiceButton} buttons
   */
  constructor(...buttons) {
    this.choicesContainer = document.getElementById("choices-container");
    this.buttons = buttons;
    for (let button of this.buttons) {
      this.choicesContainer.appendChild(button.toDomElement());
    }
  }

  /**
   *
   * @returns {Promise<number>}
   */
  async waitClickAny() {
    return await Promise.any(this.buttons.map((button, index) => button.waitClick().then(() => index)));
  }

  clear() {
    this.choicesContainer.innerHTML = "";
  }
}

class ChoiceButton {
  constructor(text) {
    this.button = document.createElement("button");
    this.button.innerText = text;
  }

  waitClick() {
    return new Promise((resolve) => {
      this.button.addEventListener("click", () => {
        resolve();
      });
    });
  }

  toDomElement() {
    return this.button;
  }
}


class Recipe {
  constructor(name, procedures) {
    this.name = name;
    this.procedures = procedures;
  }

  getName() {
    return this.name
  }

  getProcedureCount() {
    return this.procedures.length;
  }

  getProcedureText(index) {
    const text = this.procedures[index].getText();
    return `${index + 1}. ${text}`
  }
}

class Procedure {
  constructor(text) {
    this.text = text;
  }

  getText() {
    return this.text
  }
}

class ChickenRiceRecipe extends Recipe {
  constructor() {
    super();
    this.name = "チキンライス";
    this.procedures = [
      new Procedure("ご飯を炊く"),
      new Procedure("チキンを炒める"),
      new Procedure("野菜を炒める"),
      new Procedure("ケチャップで炒める"),
      new Procedure("ご飯と混ぜる"),
    ];
  }
}

class ConeSoupRecipe extends Recipe {
  constructor() {
    super("コーンスープ", [
      new Procedure("バターを溶かす"),
      new Procedure("玉ねぎを炒める"),
      new Procedure("コーンと水を加える"),
      new Procedure("塩コショウで味を整える"),
      new Procedure("スープが煮立ったら完成"),
    ]);
  }
}

class TeriyakiChickenRecipe extends Recipe {
  constructor() {
    super("照り焼きチキン", [
      new Procedure("鶏肉を一口大に切ります"),
      new Procedure("フライパンに油をひいて鶏肉を炒めます"),
      new Procedure("照り焼きソースを加えて炒めます"),
      new Procedure("鶏肉に火が通ったら完成です"),
    ]);
  }
}

const chickenRiceRecipe = new ChickenRiceRecipe();
const coneSoupRecipe = new ConeSoupRecipe();
const teriyakiChickenRecipe = new TeriyakiChickenRecipe();

const recipes = [chickenRiceRecipe, coneSoupRecipe, teriyakiChickenRecipe];

async function main() {
  const w01 = new MessageWindow("ゲームを始めるにはボタンを押してください");
  await w01.showText();
  const b01 = new ChoiceButton("始める");
  const c01 = new ChoicesContainer(b01);
  await c01.waitClickAny();
  c01.clear();

  while (true) {
    const w02 = new MessageWindow("どの料理を作りますか");
    await w02.showText();

    const recipeButtons = [];
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      const button = new ChoiceButton(recipe.getName());
      recipeButtons.push(button);
    }

    const recipeChoice = new ChoicesContainer(...recipeButtons);
    const selectedIndex = await recipeChoice.waitClickAny();
    recipeChoice.clear();

    const selectedRecipe = recipes[selectedIndex];

    for (let i = 0; i < selectedRecipe.getProcedureCount(); i++) {
      const procedureText = selectedRecipe.getProcedureText(i);
      const messageWindow = new MessageWindow(procedureText);
      await messageWindow.showText();
      const procedureChoice = new ChoicesContainer(new ChoiceButton("次へ"));
      await procedureChoice.waitClickAny();
      procedureChoice.clear();
    }
  }
}

main()

// 最後に、この手続きさえも、クラスにしましょう
