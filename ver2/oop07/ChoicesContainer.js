import { ChoiceButton } from "./ChoiceButton.js";

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

export { ChoicesContainer };
