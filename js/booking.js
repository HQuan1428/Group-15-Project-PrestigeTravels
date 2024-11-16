document.addEventListener('DOMContentLoaded', function() {
    // Lấy thông tin tour từ localStorage (hoặc từ URL nếu muốn)
    const tourId = localStorage.getItem('tourId');  // Lấy ID tour từ localStorage
    const tour = toursData[tourId];  // Lấy thông tin tour từ mảng toursData

    if (tour) {
        // Hiển thị ngày đã chọn (nếu có) từ localStorage
        const selectedDate = localStorage.getItem('selectedTourDate');
        if (selectedDate) {
            document.querySelector('#selected-tour-date').textContent = `Ngày đã chọn: ${formatDate(selectedDate)}`;
        }

        // Lấy danh sách ngày khả dụng từ tour
        const availableDates = tour.availableDates;
        const dateSelect = document.querySelector('#tour-date');
        dateSelect.innerHTML = '';  // Xóa các phần tử cũ trong dropdown

        // Thêm các ngày có thể chọn vào dropdown
        availableDates.forEach(date => {
            const option = document.createElement('option');
            option.value = date;
            option.textContent = formatDate(date);
            dateSelect.appendChild(option);
        });

        // Nếu có ngày đã chọn trước đó, chọn ngày đó trong dropdown
        if (selectedDate) {
            dateSelect.value = selectedDate;
        }

        // Lắng nghe sự kiện thay đổi ngày chọn
        dateSelect.addEventListener('change', function() {
            const selectedDate = this.value;
            localStorage.setItem('selectedTourDate', selectedDate);  // Lưu ngày đã chọn vào localStorage
            document.querySelector('#selected-tour-date').textContent = `Ngày đã chọn: ${formatDate(selectedDate)}`;
        });
    }
});

// Hàm định dạng ngày tháng theo kiểu dễ đọc (Ví dụ: 20/11/2024)
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Lắng nghe sự kiện submit form đặt tour
document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();  // Ngừng hành động mặc định của form

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const tourDate = document.getElementById('tour-date').value;
    const guests = document.getElementById('guests').value;
    const specialRequests = document.getElementById('special-requests').value;

    // Hiển thị thông tin xác nhận
    document.getElementById('confirmation-name').textContent = `Họ và Tên: ${name}`;
    document.getElementById('confirmation-email').textContent = `Email: ${email}`;
    document.getElementById('confirmation-phone').textContent = `Số Điện Thoại: ${phone}`;
    document.getElementById('confirmation-tour-date').textContent = `Ngày Khởi Hành: ${formatDate(tourDate)}`;
    document.getElementById('confirmation-guests').textContent = `Số Lượng Khách: ${guests}`;
    document.getElementById('confirmation-special-requests').textContent = `Yêu Cầu Đặc Biệt: ${specialRequests}`;

    // Ẩn form và hiển thị xác nhận
    document.querySelector('.booking-form').style.display = 'none';
    document.getElementById('confirmation').style.display = 'block';
});

// Quay lại form
document.getElementById('go-back').addEventListener('click', function() {
    document.querySelector('.booking-form').style.display = 'block';
    document.getElementById('confirmation').style.display = 'none';
});
