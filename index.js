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
//TIRAR PRINT DO QR CODE
// })();

// return;
(async function main() {

  try {

    //PUPPETEER CONFIG
    const browser = await puppeteer.launch({ headless: false, userDataDir: "./user_data" });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );
    
    //GO TO ZAP
    await page.goto("https://web.whatsapp.com/");

    // await page.waitForSelector("._1MXsz"); //BLACK
    await page.waitForSelector("._1XkO3");    //WHITE
    // await page.waitForTimeout(5000);

    //SEARCH CONVERSATION IN ZAP
    // const contact = "+55 89 8819-1796";
    const contact = "PATO LÓGICO 🇧🇷 🇮🇱 🇺🇸 🇦🇴 🇰🇵 🇨🇳";
    await page.click(`span[title='${contact}']`);
    await page.waitForSelector("._1fqrG");

    //FOCUS ON MENSAGE BAR
    await page.focus("div[data-tab='6']"); 
    
    await page.evaluate(() => {
      const message = "@Paulo Isaac";
      document.execCommand("insertText", false, message);
    });

    await page.waitForTimeout(1000);
    console.log(await page.$("._3lPuS"));

    return;
    await page.click("span[data-testid='send']");
    await page.waitForTimeout(500);

    //OPEN CLIPBOARD
    await page.click('span[data-icon="clip"]');
    await page.waitForTimeout(1000);    

    //INPUT FILE
    const inputFile = await page.$('input[accept="image/*,video/mp4,video/3gpp,video/quicktime"]');
    await inputFile.uploadFile( path.resolve(__dirname,"bom.jpg") )
    
    //SEND FILE
    await page.waitForTimeout(2000);
    await page.click('span[data-testid="send"]');
    await page.waitForTimeout(3000);

    await browser.close();
  } catch (e) {
    console.error("ERROR=>", e);
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