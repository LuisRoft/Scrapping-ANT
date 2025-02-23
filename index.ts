import { google } from "@ai-sdk/google";
import { webkit } from "@playwright/test";
import { generateText } from "ai";

// Uncomment the following lines to send messages by Telegram or Email
// import { sendMessage } from "./utils/sendTLBot.ts";
// import { sendMail } from "./utils/sendMail.ts";

process.loadEnvFile();

const browser = await webkit.launch();
const page = await browser.newPage();

await page.goto(
  "https://consultaweb.ant.gob.ec/PortalWEB/paginas/clientes/clp_criterio_consulta.jsp"
);
const inputCI = page.locator('input[name="ps_identificacion"]');
await inputCI.fill(`${process.env.USER_CI}`);

const submitButton = page.locator('a[href="javascript:validar();"]');
await submitButton.click();

await page.waitForURL(
  `https://consultaweb.ant.gob.ec/PortalWEB/paginas/clientes/clp_grid_citaciones.jsp?ps_tipo_identificacion=CED&ps_identificacion=${process.env.USER_CI}&ps_placa=`
);

const name = page.locator(
  "table.MarcoTitulo tbody tr:first-child td:first-child"
);
const tablaResultados = page.locator("div.ui-jqgrid-view");

const { text } = await generateText({
  model: google("gemini-1.5-flash"),
  system: `
   - Eres un bot que hace scrapping dentro de la web de ANT y comunicas si el usuario tiene citaciones en la ANT.
   - El nombre del usuario es ${await name.innerText()}
   - Tienes que saludarlo y decirle si tiene o no citaciones. 
   - Si tiene citaciones, tienes que decirle la fecha y hora de la cita. 
   - Si no tiene, tienes que decirle que no tiene citaciones.
   - Si hay un error, tienes que decirle que hubo un error y que intente más tarde.
   - La tabla donde se ecuentra todos los resultados sobre las citaciones en formato HTML es: 
    -----------------------------------
    ${await tablaResultados.innerHTML()}
    -----------------------------------
   - La tabla puede llegar estar vacia por eso debes de estructurar tu respuesta de manera que puedas manejar el caso de que no haya resultados.
   - La tabla puede tener varios resultados, por lo que debes de estructurar tu respuesta de manera que puedas manejar el caso de que haya varios resultados.
   - Asegurate de que tu respuesta sea amigable y que el usuario se sienta comodo al leerla.
   - En la respuesta debes de incluir la entidad de la cita, la fecha y la hora de la cita, en caso de que me hayan quitado puntos, puntos cuantos, el total a pagar y el articulo de la ley que se infringio.
   - Si la tabla esta vacia, debes de decirle al usuario que no tiene citaciones.
   `,
  prompt: `
    - Tengo citaciones en la ANT? 
    - Hoy es ${new Date()} en caso de tener citas y no haberlas pagado, dime la fecha y hora de la cita, la entidad de la cita, el total a pagar y el articulo de la ley que se infringio, ademas tomando en cuenta la fecha de hoy, cuantos dias tengo de atraso.
    `,
});

console.log(text);

// Send Message by Telegram
// sendMessage({ message: text });

// Send Message by Email
// sendMail({
//   emailTo: `${process.env.EMAIL_TO}`,
//   to: `${process.env.EMAIL_NAME}`,
//   message: text,
// });

browser.close();
