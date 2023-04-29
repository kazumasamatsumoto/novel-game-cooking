// noinspection JSAnnotator

// これらは何？

/*

const messageElement = document.getElementById("text");
const choicesContainer = document.getElementById("choices-container");

messageElement.innerText = "";
choicesContainer.innerHTML = "";

messageElement.innerText += currentMessage[i];

const button = document.createElement("button");
button.innerText = choice.text;
button.addEventListener("click", () => {

});
choicesContainer.appendChild(button);

*/

// カプセル化しよう

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
