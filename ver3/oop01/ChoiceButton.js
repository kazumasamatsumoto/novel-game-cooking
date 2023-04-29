import { ColorTheme } from "./ColorTheme.js";

class ChoiceButton {
  constructor(text, color = ColorTheme.DEFAULT) {
    this.button = document.createElement("button");
    this.button.innerText = text;
    this.button.style.backgroundColor = ColorTheme.getBackgroundColorCode(color);
  }

  /*
  constructor(text) {
    this(text, "#222");
  }

  constructor(text, color) {
    ...
  }
   */

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

export { ChoiceButton };
