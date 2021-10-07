export class Commands {
  static commands = {
    hello: () => `Well, hello to you too!`,
    welcome: () => `
==============
Welcome to <h1>ANDREWWALPOLE.DEV</h1>
Just a fun little project, enjoy!

<a href="https://andrewwalpole.com" target="_blank">ANDREWWALPOLE>COM</a>
I'm also on twitter, <a href="https://twitter.com/walpolea" target="_blank">@WALPOLEA</a> on TWITTER
<img width="125px" style="display:block;padding:10px;" src="/images/profile.png">
Try, 'HELP' to get started
==============
`,
    help: () => {
      return `
==============
COMMANDS:
${Object.keys(Commands.commands)
  .map((k) => `> ${k}`)
  .join("\n")}
==============
`;
    },
    clear: () => {},
    background: (args) =>
      args.length ? `<style>body{background:${args[0] ? args[0] : "#11151f;"}</style>` : `BACKGROUND requires a color argument: "background red"`,
  };

  static run(cmd, args) {
    if (Commands.commands[cmd]) {
      return Commands.commands[cmd](args);
    } else {
      return `Sorry, command "${cmd}" not found.`;
    }
  }
}
