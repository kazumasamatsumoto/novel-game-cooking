import { MessageWindow } from "./MessageWindow.js";
import { ChoiceButton } from "./ChoiceButton.js";
import { ChoicesContainer } from "./ChoicesContainer.js";
import { ChickenRiceRecipe } from "./ChickenRiceRecipe.js";
import { ConeSoupRecipe } from "./ConeSoupRecipe.js";
import { TeriyakiChickenRecipe } from "./TeriyakiChickenRecipe.js";

class Game {
  constructor() {
    const chickenRiceRecipe = new ChickenRiceRecipe();
    const coneSoupRecipe = new ConeSoupRecipe();
    const teriyakiChickenRecipe = new TeriyakiChickenRecipe();

    this.recipes = [chickenRiceRecipe, coneSoupRecipe, teriyakiChickenRecipe];
  }

  async start() {
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
      for (let i = 0; i < this.recipes.length; i++) {
        const recipe = this.recipes[i];
        const button = new ChoiceButton(recipe.getName());
        recipeButtons.push(button);
      }

      const recipeChoice = new ChoicesContainer(...recipeButtons);
      const selectedIndex = await recipeChoice.waitClickAny();
      recipeChoice.clear();

      const selectedRecipe = this.recipes[selectedIndex];

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
}

export { Game };
