export const welcome = () => {
  printOut(`
Welcome!

try 'help' to get started

made by: <h2>ANDREW WALPOLE</h2>
<a href="https://andrewwalpole.com" target="_blank">andrewwalpole.com</a>
<a href="https://twitter.com/walpolea" target="_blank">@walpolea</a> on twitter
<img src="https://andrewwalpole.com/_nuxt/img/353e174.png" width="200px">

  `);
}

const helps = {
  image:
    `

image:
  --src (required) [absolute path to image]
  --width  [width of image]
  --height [height of image]

`,

}

export const help = (args) => {
  const argsKeys = Object.keys(args);
  if (argsKeys.length) {

    if (helps[argsKeys[0]]) {
      printOut(helps[argsKeys[0]])
    } else {
      printOut("SORRY, don't know about that one");
    }

  } else {
    printOut(`

=============
COMMANDS:
    `);

    for (var key in commandMap) {
      printOut(` >${key}`);
    }

    printOut(`
=============

    `);

  }


}

export const printOut = (text) => {
  const p = document.createElement("p");
  p.innerHTML = text;
  output.appendChild(p);
}

export function image({ src, width, height }) {
  console.log(src, width, height);
  if (!src) {
    return false;
  }

  const p = document.createElement("p");
  const img = document.createElement("img");
  img.onload = () => {
    console.log("onload");
    scrollToBottom();
  };
  img.src = src;

  if (width) {
    img.setAttribute("width", width);
  }

  if (height) {
    img.setAttribute("height", height);
  }

  p.appendChild(img);
  output.appendChild(p);
}

export const link = (href) => {
  const p = document.createElement("p");
  const a = document.createElement("a");
  a.href = href;
  a.setAttribute('target', '_blank');
  a.innerText = href.toUpperCase();

  p.appendChild(a);

  console.log(a);
  output.appendChild(p);
}

export function clear() {
  document.querySelector("#output").innerHTML = "";
}



