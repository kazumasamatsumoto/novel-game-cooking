class ColorTheme {

  static JUICY = "juicy";
  static SPICY = "spicy";
  static SWEET = "sweet";
  static DEFAULT = "default";

  static getBackgroundColorCode(colorTheme) {
    switch (colorTheme) {
      case this.JUICY:
        return "#382323";
      case this.SPICY:
        return "#264e4f";
      case this.SWEET:
        return "#104811";
      case this.DEFAULT:
        return "#222";
      default:
        throw new Error("invalid color name");
    }
  }
}

export { ColorTheme };
