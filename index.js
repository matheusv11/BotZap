const puppeteer = require("puppeteer");
const axios     = require('axios');
const fs        = require('fs');
const path      = require('path');


// (async function sec(){
//     const url = "https://www.mensagensdebomdia.com.br/wp-content/uploads/2020/01/77B38E74-EE06-4EB2-8A63-9031E494337C.jpeg";
//     const opts = {
//         responseType: "arraybuffer"
//     };
//     const {data: buffer} = await axios.get(url, opts);
//     console.log(buffer);
//     //Chamar função dentro dela mesmo
// })();

// return;
// Login Function Logic
(async function main() {
  try {
    // Configures puppeteer
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );

    //Navigates to Whatsapp
    await page.goto("https://web.whatsapp.com/");

    // Entrar no ZAP
    // await page.waitForSelector("._1MXsz"); //BLACK
    await page.waitForSelector("._1XkO3"); //WHITE
    await page.waitForTimeout(5000);

    //Buscar conversa no ZAP
    const contactName = "+55 89 8819-1796";
    await page.click(`span[title='${contactName}']`); //Na web, esse click nem rola visualmente
    await page.waitForSelector("._1fqrG");

    //Barra de mensagem
    const editor = await page.$("div[data-tab='6']");
    await editor.focus();

    //Amount of messages you want to send
    const amountOfMessages = 5;

    //Loops through cycle of sending message



    for (var i = 0; i < amountOfMessages; i++) {
      await page.evaluate(() => {
        const message = "Are you mad at me? :( ";
        document.execCommand("insertText", false, message); //APRENDER MAIS EVENTOS
      });
      await page.click("span[data-testid='send']");
      await page.waitForTimeout(500);
    }

    //FILES
    
    //ABRE CLIPBOARD
    const attachButton = await page.click('span[data-icon="clip"]')
    await page.waitForTimeout(2000);    
    //INPUT
    const inputFile = await page.$('input[accept="image/*,video/mp4,video/3gpp,video/quicktime"]');
    await inputFile.uploadFile( path.resolve(__dirname,"bom.jpg") )
    
    await page.waitForTimeout(3000);
    await page.click('span[data-testid="send"]')
    //APERTAR ENTER OU O BOTÃO // await this.page.keyboard.press("Enter");


  } catch (e) {
    console.error("error mine", e);
  }
})();

// (async function ok(){
//   let fet = await fetch("https://www.mensagensdebomdia.com.br/wp-content/uploads/2020/01/77B38E74-EE06-4EB2-8A63-9031E494337C.jpeg");
//   let buffer = await fet.arrayBuffer();
//   console.log(buffer)

// } )()

//Poderia usar o fs para ler a imagem
//Poderia requisitar a imagem da url e salvar local
//Poderia salvar local a imagem e salvar pra então o fs ler e jogar no clipboard