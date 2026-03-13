import app from "./app.js"
import "./database.js"
import { config } from "./src/config.js";

// Se crea la funcion, encargada de ejecutar el servidor
async function main(params) {
    app.listen(config.server.port)
    console.log("server on  port" + config.server.port)
}
main();