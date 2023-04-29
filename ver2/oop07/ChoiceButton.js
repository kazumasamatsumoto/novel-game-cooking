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

export { ChoiceButton };
