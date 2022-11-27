const fs = require("fs")
const preview = require("pdf-thumbnail")

//with buffer
preview(fs.readFileSync("./bachelor-thesis.pdf"), {
   crop: {
      width: 320,
      height: 384,
      x: 0,
      y: 0,
      ratio: true,
   },
   compress: {
      type: "JPEG",
      quality: 70,
   },
})
   .then((data) /*is a stream*/ =>
      data.pipe(fs.createWriteStream("../images/bachelor-preview.jpg")))
   .catch((err) => console.error(err))
