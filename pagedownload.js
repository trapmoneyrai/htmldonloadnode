const fs = require('fs')
const path = require('path')
const utils = require('util')
const puppeteer = require('puppeteer')
const hb = require('handlebars')
const readFile = utils.promisify(fs.readFile)
async function getTemplateHtml() {

try {
const downloadPath = path.resolve("./pagedownload.html");
return await readFile(downloadPath, 'utf8');
} catch (err) {
return Promise.reject("Could not load html template");
}
}
async function generatePdf() {
let data = {};
getTemplateHtml().then(async (res) => {

console.log("Compiing the template with handlebars")
const template = hb.compile(res, { strict: true });

const result = template(data);
const html = result;

const browser = await puppeteer.launch();
const page = await browser.newPage()

await page.setContent(html)

await page.pdf({ path: 'pagedownload.pdf', format: 'A4' })
await browser.close();
console.log("PDF Generated")
}).catch(err => {
console.error(err)
});
}
generatePdf();