const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
    rating: 4.2
}
const transactions = (type, {label , stock = 0} = {}) => {
    console.log(type, label, stock)
}

transactions('order', product)