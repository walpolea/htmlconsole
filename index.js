import { createApp } from "https://unpkg.com/petite-vue@0.3.0/dist/petite-vue.es.js";
import { Commands } from "./commands.js";

const Console = (props) => {
  const allowedKeys = [32, ...[...Array(90 - 48).keys()].map((i) => i + 48), ...[...Array(222 - 186).keys()].map((i) => i + 186)];

  return {
    input: undefined,
    currentInput: "",
    output: "",
    commandHistory: [""],
    curCommand: 0,
    init() {
      this.selectInput();
      this.printOut(Commands.run("welcome"));
    },
    inputMounted($el) {
      this.input = $el;
    },
    selectInput() {
      if (this.input) {
        this.input.focus();
        this.input.click();
      }
    },
    handleInput(e) {
      if (e.metaKey) {
        switch (e.key) {
          case "v":
            navigator.clipboard.readText().then((text) => {
              this.cbAdd(text);
            });
            break;
          case "x":
          case "c":
            this.cbEmpty();
            break;
        }
      } else {
        switch (e.key) {
          case "Enter":
            this.submitCommand();
            this.cbEmpty();
            break;
          case "Backspace":
            this.cbDel();
            break;
          case "ArrowUp":
            this.cbWrite(this.prevCommand);
            break;
          case "ArrowDown":
            this.cbWrite(this.nextCommand);
            break;
        }

        if (this.allowedKey(e.key)) {
          this.cbAdd(e.key);
        }
      }
    },
    get prevCommand() {
      if (this.curCommand > 0) {
        this.curCommand--;
      }

      return this.commandHistory[this.curCommand];
    },
    get nextCommand() {
      if (this.curCommand < this.commandHistory.length - 1) {
        this.curCommand++;
      } else {
        this.curCommand = this.commandHistory.length;
        return "";
      }

      return this.commandHistory[this.curCommand];
    },
    submitCommand() {
      const cmdRaw = this.currentInput;

      const reg = /(^[a-z]+)\s+/g;
      const mainCmd = cmdRaw.match(reg);
      const cmd = mainCmd ? mainCmd[0].replace(" ", "") : cmdRaw;

      const args = cmdRaw
        .replace(reg, "")
        .split(" ")
        .filter((a) => a !== "");

      if (args[0] === cmd) {
        args.shift();
      }

      console.log(args);
      this.cbEmpty();
      this.commandHistory.push(cmdRaw);
      this.curCommand = this.commandHistory.length;

      switch (cmd) {
        case "clear":
          this.clearOutput();
          break;
        default:
          this.printOut(Commands.run(cmd.toLowerCase(), args));
          break;
      }
    },
    cbAdd(str) {
      this.currentInput += str;
    },
    cbDel() {
      this.currentInput = this.currentInput.split("").slice(0, -1).join("");
    },
    cbEmpty() {
      this.currentInput = "";
    },
    cbWrite(str) {
      this.cbEmpty();
      this.cbAdd(str);
    },
    clearOutput() {
      this.output = "";
    },
    scrollToBottom() {
      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      window.scrollTo(0, scrollHeight);
    },
    allowedKeys,
    allowedKey(keyCode) {
      return keyCode.length === 1;
    },
    async printOut(text) {
      console.log("run print", text);
      const texts = text.split("\n");

      this.output += `<p>`;

      while (texts.length) {
        await new Promise((resolve) => setTimeout(resolve, 80));
        let t = texts.shift();
        if (t === "") {
          t = "<br><br>";
        }
        this.output += t + `\n`;
      }

      this.output += `</p>`;

      console.log(this.output);
    },
  };
};

createApp({ Console }).mount();
