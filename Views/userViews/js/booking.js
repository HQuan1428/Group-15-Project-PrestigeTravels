document.addEventListener('DOMContentLoaded', function() {
    displayAvailableDates();
    updateSummary();
});

function incrementGuests(type) {
    const input = document.getElementById(type);
    input.value = parseInt(input.value) + 1;
    updateSummary();
}

function decrementGuests(type) {
    const input = document.getElementById(type);
    const minValue = type === 'adults' ? 1 : 0;
    if (parseInt(input.value) > minValue) {
        input.value = parseInt(input.value) - 1;
        updateSummary();
    }
}

function updateSummary() {
    const adults = parseInt(document.getElementById('adults').value);
    const children = parseInt(document.getElementById('children').value);
    const guestCount = document.getElementById('guest-count');
    guestCount.textContent = `${adults} người lớn, ${children} trẻ em`;
    
    // Cập nhật tổng tiền
    calculateTotal();
}

document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Handle form submission
    alert('Đặt tour thành công! Chúng tôi sẽ liên hệ với bạn sớm.');
});

function displayAvailableDates() {
    const tourId = 'danang-tour';
    const tour = toursData[tourId];

    if (tour && tour.availableDates) {
        const availableDates = tour.availableDates;
        const dateSelect = document.querySelector('#tour-date');
        dateSelect.innerHTML = '';

        availableDates.forEach(date => {
            const option = document.createElement('option');
            option.value = date;
            option.textContent = formatDate(date);
            dateSelect.appendChild(option);
        });
    } else {
        console.error('Không tìm thấy tour hoặc không có ngày khả dụng.');
    }
}
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Xử lý sự kiện chọn phương thức thanh toán
document.querySelectorAll('.payment-option').forEach(option => {
    option.addEventListener('click', function() {
        // Bỏ chọn tất cả các options
        document.querySelectorAll('.payment-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Chọn option hiện tại
        this.classList.add('selected');
        
        // Chọn radio button
        const radio = this.querySelector('input[type="radio"]');
        radio.checked = true;
        
        // Cập nhật tóm tắt đặt tour
        updateSummary();
    });
});

function showCoupons() {
    const couponsList = document.getElementById('coupons-list');
    couponsList.style.display = couponsList.style.display === 'none' ? 'block' : 'none';
}

function selectCoupon(code) {
    document.getElementById('coupon-code').value = code;
    document.getElementById('coupons-list').style.display = 'none';
    applyCoupon();
}

function applyCoupon() {
    const code = document.getElementById('coupon-code').value;
    // Thêm logic kiểm tra mã giảm giá và tính toán
    calculateTotal();
}

// Thêm event listener cho nút hiển thị phiếu giảm giá
document.getElementById('showCoupons').addEventListener('click', showCoupons);
