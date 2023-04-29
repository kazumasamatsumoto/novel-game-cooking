// noinspection JSAnnotator

class Recipe {
  constructor(name, procedures) {
    this.name = name;
    this.procedures = procedures;
  }
}

class Procedure {
  constructor(text) {
    this.text = text;
  }
}

class ChickenRiceRecipe extends Recipe {
  constructor() {
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


// では次に、これらを画面に表示することを考えてみる
//
