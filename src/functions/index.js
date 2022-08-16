const formatPrice = (price) => {
    return parseInt(price).toLocaleString().replace(',', ' ')
    // console.log('hello').toLocaleString().replace(',', ' ')
}

const pluralize = (str) => {
    if (/^1$|^[2-9]1$/.test(str.toString())) return 'товар'
    if(/^[2-4]$|^[2-9][2-4]$/.test(str.toString())) return 'товара'
    else return 'товаров'
}

export {formatPrice, pluralize}
