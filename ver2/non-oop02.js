import messageData from './non-oop02/messageData.js';
import choiceData from './non-oop02/choiceData.js';

const messageElement = document.getElementById("text");
const choicesContainer = document.getElementById("choices-container");

let messageId = "t01";

while (true) {
  const currentMessageData = messageData[messageId];
  const currentMessage = currentMessageData.text;

  messageElement.innerText = "";
  choicesContainer.innerHTML = "";

  for (let i = 0; i < currentMessage.length; i++) {
    messageElement.innerText += currentMessage[i];
    await new Promise(resolve => setTimeout(resolve, 20));
  }

  const waitClickAnyButtons = []

  for (let i = 0; i < currentMessageData.choiceIds.length; i++) {
    const button = document.createElement("button");
    const choiceId = currentMessageData.choiceIds[i];
    const choice = choiceData[choiceId];
    button.innerText = choice.text;
    const waitClick = new Promise((resolve) => {
      button.addEventListener("click", () => {
        resolve(choice.target);
      });
    });
    waitClickAnyButtons.push(waitClick);
    choicesContainer.appendChild(button);
  }

  messageId = await Promise.race(waitClickAnyButtons);
}

// データ指向プログラミング的な書き方を意識しました

// すべてが１個所にまとまっています。
// コードはすっきりしているように見えますが、複数人が同時に編集するとしたら衝突が発生しませんか。
