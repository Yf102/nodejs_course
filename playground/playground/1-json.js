const fs = require('fs')

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday'
// }


// fs.writeFileSync('1-json.json', JSON.stringify(book) )

// const bookJson = fs.readFileSync('1-json.json').toString()

// console.log(JSON.parse(bookJson))

const bookJson = JSON.parse(fs.readFileSync('1-json.json').toString())
bookJson.name = "Filip"
bookJson.age = 30

fs.writeFileSync('1-json.json', JSON.stringify(bookJson))
console.log(bookJson)