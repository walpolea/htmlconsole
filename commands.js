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

export const help = () => {
  printOut("<br/>");
  printOut("=============");
  printOut("COMMANDS ARE:");
  for (var key in commandMap) {
    printOut(`  >${key}`);
  }
  printOut("=============");
  printOut("<br/>");
}

export const printOut = (text) => {
  const p = document.createElement("p");
  p.innerHTML = text;
  output.appendChild(p);
}

export const image = (src) => {
  const p = document.createElement("p");
  const img = document.createElement("img");
  img.onload = () => {
    console.log("onload");
    scrollToBottom();
  };
  img.src = src;

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