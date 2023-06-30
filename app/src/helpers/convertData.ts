function convertData(data: string) {
    let originDate = data.split('-')
    let startDate = originDate[2] + '/' + originDate[1] + '/' + originDate[0];
    return startDate
}

export default convertData