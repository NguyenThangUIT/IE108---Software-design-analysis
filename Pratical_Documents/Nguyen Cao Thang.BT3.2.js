function calculatePrice(price, weight, paidWithCreditCard) {
    // Khởi tạo tổng giá tiền bằng giá gốc của hàng hóa
    let totalPrice = price;

    // Tính phí vận chuyển: miễn phí nếu trọng lượng dưới 5 kg hoặc giá hàng hóa vượt quá 100 euro
    let deliveryPrice = weight >= 5 && price <= 100 ? weight : 0;

    // Kiểm tra xem giá hàng hóa có đạt 200 euro, trọng lượng dưới 5 kg và thanh toán bằng thẻ tín dụng hay không
    if (price >= 200 && weight < 5 && paidWithCreditCard) {
        // Nếu đúng, giảm giá 15% so với giá gốc của hàng hóa
        totalPrice *= 0.85;
    } else {
        // Nếu không, kiểm tra xem giá hàng hóa có đạt 200 euro hay không
        if (price >= 200) {
            // Nếu đúng, giảm giá 10% so với giá gốc của hàng hóa
            totalPrice *= 0.9;
        }
        // Kiểm tra xem khách hàng có thanh toán bằng thẻ tín dụng hay không
        if (paidWithCreditCard) {
            // Nếu đúng, giảm thêm 3% so với giá đã giảm của hàng hóa
            totalPrice *= 0.97;
        }
    }

    // Trả về tổng giá tiền sau cùng, bao gồm cả phí vận chuyển (nếu có)
    return totalPrice + deliveryPrice;
}

module.exports = { calculatePrice };
//Made by Nguyen Cao Thang - Student ID: 22521329