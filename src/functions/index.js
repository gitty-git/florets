const formatPrice = (price) => {
    return parseInt(price).toLocaleString().replace(',', ' ')
}

const pluralize = (str) => {
    if (/^1$|^[2-9]1$/.test(str.toString())) return 'товар'
    if (/^[2-4]$|^[2-9][2-4]$/.test(str.toString())) return 'товара'
    else return 'товаров'
}

const ruStatuses = {
    created: "Создан",
    processed: "Обработан",
    sent: "Отправлен",
    received: "Получен",
    canceled: "Отменен"
}

const ruStatusesPluralized = {
    all: "Все",
    created: "Новые",
    processed: "Обработанные",
    sent: "Отправленные",
    received: "Полученные",
    canceled: "Отмененные",
}

const translateStatuses = (statuses, pluralized = false) => {
    let returnObj = (st) => {
        return { eng: `${st}`, ru: pluralized ? ruStatusesPluralized[st] : ruStatuses[st] }
    }

    let arr = []
    if (Array.isArray(statuses)) {
        statuses.forEach((status, i) => arr[i] = returnObj(status))
        return arr
    }
    else return returnObj(statuses)
}

const formatTime = (time) => {
    let isoTime = time.toISOString()
    let left = isoTime.split('T')[0]
    let right = new Date(time).toLocaleString().split(' ')[1]

    return (left + ' ' + right).trim()
}

function isIsoDate(str) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    const d = new Date(str);
    return d instanceof Date && !isNaN(d) && d.toISOString() === str; // valid date
}

const handleImage = async (imageFile) => {
    //
}

export { formatPrice, pluralize, translateStatuses, formatTime, isIsoDate, handleImage }
