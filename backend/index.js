import app from "./app.js"
import "./database"

// Se crea la funcion, encargada de ejecutar el servidor
async function main(params) {
    app.listen(4000)
}
main();