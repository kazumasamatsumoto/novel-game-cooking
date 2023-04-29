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

const chickenRiceRecipe = new Recipe("チキンライス", [
  new Procedure("ご飯を炊く"),
  new Procedure("チキンを炒める"),
  new Procedure("野菜を炒める"),
  new Procedure("ケチャップで炒める"),
  new Procedure("ご飯と混ぜる"),
]);

// ちょっと待ってみよう。チキンライスのインスタンスを作るときは、毎回こう書くのだろうか？
