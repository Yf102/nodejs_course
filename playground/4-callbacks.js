setTimeout(() => {
    console.log('Callback after 2 sec')
}, 2000)

const names = ['Filip', 'Yoana', 'Maria']
const shortName = names.filter((name) => name.length <= 4)

console.log(shortName)

const add = (a, b, callback) => {
    setTimeout(() => {
        if(typeof callback === 'function') {
            callback(a + b)
        }
    }, 2000)
}

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})