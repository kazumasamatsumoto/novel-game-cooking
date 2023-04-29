import { Recipe } from "./Recipe.js";
import { Procedure } from "./Procedure.js";

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

export { ChickenRiceRecipe };
