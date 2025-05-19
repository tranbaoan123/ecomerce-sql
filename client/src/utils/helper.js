export const formatVietnameseCurrency = (input)=>{
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(input)
}
export const numberWithCommas = (input)=> {
    return input.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
