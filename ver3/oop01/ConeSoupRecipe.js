import { Recipe } from "./Recipe.js";
import { Procedure } from "./Procedure.js";
import { ColorTheme } from "./ColorTheme.js";

class ConeSoupRecipe extends Recipe {
  constructor() {
    super("コーンスープ", [
      new Procedure("バターを溶かす"),
      new Procedure("玉ねぎを炒める"),
      new Procedure("コーンと水を加える"),
      new Procedure("塩コショウで味を整える"),
      new Procedure("スープが煮立ったら完成"),
    ]);
    this.colorTheme = ColorTheme.SWEET;
  }
}

export { ConeSoupRecipe };
