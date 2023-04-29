import { Recipe } from "./Recipe.js";
import { Procedure } from "./Procedure.js";

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

export { TeriyakiChickenRecipe };
