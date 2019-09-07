let commands;
import('./commands.js').then((c) => {
  commands = c;
  initApp();
  commands.welcome();


})


window.mobilecheck = function () {
  var check = false;
  (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

scrollToBottom();
const input = document.querySelector("#console > #input");


if (window.mobilecheck()) {
  document.querySelector("input").addEventListener("input", (e) => {
    //console.log("in", e);
    var evt = new KeyboardEvent('keydown', { 'key': e.data, 'keyCode': e.data.charCodeAt(0) });
    evt.special = true;
    document.dispatchEvent(evt);
    document.querySelector("input").value = "";
    //handleInput(evt);
  })
}

document.querySelector("#console").addEventListener("click", (e) => {
  var t = document.querySelector("input");
  t.focus();
  t.click();
  //console.log("clicky", t);
});

const output = document.querySelector("#output");
let commandBuffer = [];
const commandHistory = [""];
let curCommand = 0;

const commandMap = {
  welcome: () => commands.welcome(),
  hello: () => commands.printOut("world"),
  clear: () => commands.clear(),
  help: (args) => commands.help(args),
  print: args => commands.printOut(args),
  image: args => commands.image(args),
  link: args => commands.link(args)
};

const allowedKeys = [32, ...makeRange(48, 90), ...makeRange(186, 222)];

function initApp() {

  document.querySelector("body").addEventListener('paste', (event) => {
    //console.log("pasted");
    let paste = (event.clipboardData || window.clipboardData).getData('text');
    cbAdd(paste);
    cbUpdate();

    event.preventDefault();
  });

  document.addEventListener("keydown", e => {
    //console.log("down");
    handleInput(e);
  });

}

function handleInput(e) {
  if (e.metaKey) {
    switch (e.key) {
      case "v":
        var pasteText = document.createElement("textarea");
        //document.querySelector("body").appendChild(pasteText);
        pasteText.focus();
        document.execCommand("paste");
        console.log(pasteText.textContent, pasteText.value, pasteText);
        cbAdd(pasteText.textContent);
        //pasteText.remove();
        break;
      case "x":
        cbEmpty();
        break;
    }
  } else {

    switch (e.key) {
      case "Enter":
        submitCommand(cbToStr());
        cbEmpty();
        break;
      case "Backspace":
        cbDel();
        break;
      case "ArrowUp":
        cbWrite(lastCommand());
        break;
      case "ArrowDown":
        cbWrite(nextCommand());
        break;
    }

    if (allowedKey(e.keyCode)) {
      cbAdd(e.key);
    }

  }



  cbUpdate();
}



function submitCommand(cmd) {
  chAdd(cmd);

  parseCommand(cmd);

  if (cmd && cmd !== "") {

    const { mainCommand, args } = parseCommand(cmd);

    console.log(mainCommand, args);
    // const list = cmd.split(" ");
    // cmd = list[0];

    // let arglist, args;

    // if (list[1]) {

    //   argList = list[1].split("=");
    //   args = {
    //     [argList[0]]: argList[1]
    //   };

    // }

    commandMap[mainCommand.toLowerCase()]
      ? commandMap[mainCommand.toLowerCase()](args)
      : commands.printOut(`<p class='red'>COMMAND NOT FOUND: ${mainCommand}</p>`);
  }

  setTimeout(scrollToBottom, 200);
}

function lastCommand() {
  curCommand > 0 ? curCommand-- : null;
  return commandHistory[curCommand];
}

function nextCommand() {
  curCommand < commandHistory.length ? curCommand++ : null;

  if (curCommand === commandHistory.length) {
    return "";
  }

  return commandHistory[curCommand];
}

function allowedKey(keyCode) {
  return allowedKeys.includes(keyCode);
}

function makeRange(start, end) {
  let arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
}

function parseCommand(cmd) {

  const mainCommand = extractMainCommand(cmd);
  const args = extractArguments(cmd);

  return { mainCommand, args };

}

function extractMainCommand(cmd) {
  //match first word until space
  const reg = /(^[a-z]+)\s+/g;
  const mainCmd = cmd.match(reg);
  return mainCmd ? mainCmd[0].replace(" ", "") : cmd;
}

function extractArguments(cmd) {
  if (cmd.indexOf("--") === -1) {
    return [];
  }

  cmd = cmd.slice(cmd.indexOf("--"))
  const argList = cmd.split(" ");
  const arguments = {};

  argList.forEach((arg, i) => {
    if (arg.indexOf("--") === 0) {
      if (argList[i + 1]) {
        if (argList[i + 1].indexOf("--") === 0) {
          arguments[arg.slice(2)] = true;
        } else {
          arguments[arg.slice(2)] = argList[i + 1];
        }
      } else {
        arguments[arg.slice(2)] = true;
      }
    }
  });
  return arguments;
}


//Command History Functions

function chAdd(cmd) {
  commandHistory.push(cmd);
  curCommand = commandHistory.length;
}


//Command Buffer Functions

function cbEmpty() {
  commandBuffer = [];
}

function cbToStr() {
  return commandBuffer.join("");
}

function cbAdd(str) {
  for (let i = 0; i < str.length; i++) {
    commandBuffer.push(str[i]);
  }
}

function cbWrite(str) {
  cbEmpty();
  cbAdd(str);
}

function cbDel() {
  commandBuffer.pop();
}

function cbUpdate() {
  input.innerHTML = cbToStr();
  scrollToBottom();
}


function scrollToBottom() {
  //console.log("scroll");
  const scrollHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  window.scrollTo(0, scrollHeight);
}