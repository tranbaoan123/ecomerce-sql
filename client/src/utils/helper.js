export const formatVietnameseCurrency = (input)=>{
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(input)
}
