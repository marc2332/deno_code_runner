import { AppWindow } from "https://raw.githubusercontent.com/astrodon/astrodon/feature/deno_tauri/modules/astrodon/mod.ts";

const mainWindow = new AppWindow("Code Runner");

mainWindow.setHtml(`
    <html>
        <head>
            <style>
                body {
                    display: flex;
                }
                body > div {
                    width: 100%;
                    margin: 5px;
                    background: rgb(240, 240, 240);
                    padding: 10px;
                    border-radius: 7px;
                    font-family: system-ui;
                } 
                button {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    border: 0;
                    padding: 12px 18px;
                    border-radius: 5px;
                    background: rgb(96, 165, 250);
                    color: white;
                }
            </style>
        </head>
        <body>
            <div id="input" contentEditable  spellcheck="false"> </div>
            <div id="output"></div>
            <button onclick="run()"> Run </button>
        </body>
        <script>
            async function run(){
                const text = document.getElementById("input").innerText;
                await window.sendToDeno("run-code", { text });
            }
            window.addEventListener("code-log", (ev) => {
                console.log(ev);
                const output = ev.detail.values.join("\\n");
                document.getElementById("output").innerText = output;
            })
            window.addEventListener("code-error", (ev) => {
                console.log(ev);
                const output = ev.detail.values.join("\\n");
                document.getElementById("output").innerText = output;
            })
        </script>
    </html>
`);

await mainWindow.run();

console.log = async (...values) =>
  await mainWindow.send("code-log", JSON.stringify({ values }));
console.error = async (...values) =>
  await mainWindow.send("code-error", JSON.stringify({ values }));

for await (const msg of await mainWindow.listen("run-code")) {
  const { text } = JSON.parse(msg);
  try {
    eval(text);
  } catch (e) {
    console.error(e.toString());
  }
}
