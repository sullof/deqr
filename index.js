const fs = require('fs-extra')
const path = require('path')
const {version} = require('./package')
const program = require('commander')

program
    .version(version)
    .option('-i, --input [image]', 'the image to decode')
    .parse(process.argv)

let input = program.input
let imagePath

if (!input || !input.length || !fs.existsSync(imagePath = path.resolve(__dirname, input))) {
  console.error(`A valid, existent file must be passed as parameter. Examples:
  
  deqr -i qrcode.jpg
  deqr -i ~/Download/image.png
  deqr -i /var/some/qr.jpg  
  
  `)
  process.exit(0)

}


(async function () {

  const options  = {}
  const qrdecoder = require('node-zxing')(options)

  qrdecoder.decode(imagePath,
      function (err, out) {
        if (err) {
          console.error('Error:\n' + err.message)
        } else if (out) {
          console.log('Result:', out)
        } else {
          console.log('Warning: no message found.')
        }
        process.exit(0)
      })

})()





