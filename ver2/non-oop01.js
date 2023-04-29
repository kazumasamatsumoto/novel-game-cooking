const messageData = {
  "t01": { text: "ゲームを始めるにはボタンを押してください。", choiceIds: ["b011"] },
  "t02": { text: "どの料理を作りますか？", choiceIds: ["b021", "b022", "b023"] },

  "t11": { text: "1. ご飯を炊く", choiceIds: ["b111"] },
  "t12": { text: "2. チキンを炒める", choiceIds: ["b121"] },
  "t13": { text: "3. 野菜を炒める", choiceIds: ["b131"] },
  "t14": { text: "4. ケチャップで炒める", choiceIds: ["b141"] },
  "t15": { text: "5. ご飯と混ぜる", choiceIds: ["b151"] },

  "t21": { text: "1. バターを溶かす", choiceIds: ["b211"] },
  "t22": { text: "2. 玉ねぎを炒める", choiceIds: ["b221"] },
  "t23": { text: "3. コーンと水を加える", choiceIds: ["b231"] },
  "t24": { text: "4. 塩コショウで味を整える", choiceIds: ["b241"] },
  "t25": { text: "5. スープが煮立ったら完成", choiceIds: ["b251"] },

  "t31": { text: "1. 鶏肉を一口大に切ります", choiceIds: ["b311"] },
  "t32": { text: "2. フライパンに油をひいて鶏肉を炒めます", choiceIds: ["b321"] },
  "t33": { text: "3. 照り焼きソースを加えて炒めます", choiceIds: ["b331"] },
  "t34": { text: "4. 鶏肉に火が通ったら完成です", choiceIds: ["b341"] },
}

const choiceData = {
  "b011": { text: "始める", target: "t02" },
  "b021": { text: "チキンライス", target: "t11" },
  "b022": { text: "コーンスープ", target: "t21" },
  "b023": { text: "照り焼きチキン", target: "t31" },

  "b111": { text: "次へ", target: "t12" },
  "b121": { text: "次へ", target: "t13" },
  "b131": { text: "次へ", target: "t14" },
  "b141": { text: "次へ", target: "t15" },
  "b151": { text: "最初からやり直す", target: "t01" },

  "b211": { text: "次へ", target: "t22" },
  "b221": { text: "次へ", target: "t23" },
  "b231": { text: "次へ", target: "t24" },
  "b241": { text: "次へ", target: "t25" },
  "b251": { text: "最初からやり直す", target: "t01" },

  "b311": { text: "次へ", target: "t32" },
  "b321": { text: "次へ", target: "t33" },
  "b331": { text: "次へ", target: "t34" },
  "b341": { text: "最初からやり直す", target: "t01" },
}

const messageElement = document.getElementById("text");
const choicesContainer = document.getElementById("choices-container");

async function main() {
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

}

main();

// データ指向プログラミング的な書き方を意識しました

// すべてが１個所にまとまっています。
// コードはすっきりしているように見えますが、複数人が同時に編集するとしたら衝突が発生しませんか。
