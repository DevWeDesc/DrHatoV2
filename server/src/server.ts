import { app } from "./app"


app.listen({host: 'localhost', port: 3333  }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`server listening on ${address}`)
 
})
