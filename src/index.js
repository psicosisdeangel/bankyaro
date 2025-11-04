import app from "./app.js"

const main = () => {
  app.listen(app.get("port"))

  console.log("The server is on port number: ", app.get("port"))
}

main();