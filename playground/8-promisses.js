const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve([1, 2, 3])
        reject('This is error')
    }, 2000)
})

doWorkPromise.then((result) => {
    console.log('Success', result)
}).catch((error) => {
    console.error('Error', error)
})