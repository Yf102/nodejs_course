// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve([1, 2, 3])
//         reject('This is error')
//     }, 2000)
// })
//
// doWorkPromise.then((result) => {
//     console.log('Success', result)
// }).catch((error) => {
//     console.error('Error', error)
// })

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve(a + b)
            // reject('GG')
        }, 1000)
    })
}

add(1, 2).then((result) => {
    console.log(result)
    return add(result, 2)
}).then((result2) => {
    console.log(result2)
}).catch((e) => {
    console.error(e)
})