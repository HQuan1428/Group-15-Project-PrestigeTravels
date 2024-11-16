const params = new URLSearchParams(window.location.search);
const tourId = params.get("tour");

const tour = toursData[tourId];

if (tour) {
    document.querySelector(".tour-header h1").textContent = tour.title;
    document.querySelector(".tour-header p").textContent = tour.description;
    document.querySelector(".tour-meta").innerHTML = `
        <span><i class="fa fa-calendar-alt"></i> Thời gian: ${tour.duration}</span>
        <span><i class="fa fa-map-marker-alt"></i> Điểm khởi hành: ${tour.startingPoint}</span>
        <span><i class="fa fa-dollar-sign"></i> Giá: <strong>${tour.price}</strong></span>
    `;
    document.querySelector(".tour-image img").src = tour.image;

    const itineraryList = document.querySelector(".itinerary");
    itineraryList.innerHTML = "";
    tour.itinerary.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        itineraryList.appendChild(li);
    });

    const servicesList = document.querySelector(".services");
    servicesList.innerHTML = "";
    tour.services.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        servicesList.appendChild(li);
    });

    const reviewsContainer = document.querySelector(".reviews");
    reviewsContainer.innerHTML = "";
    tour.reviews.forEach((review) => {
        const div = document.createElement("div");
        div.className = "review";
        div.innerHTML = `<p><strong>${review.name}:</strong> "${review.comment}"</p>`;
        reviewsContainer.appendChild(div);
    });
} else {
    document.querySelector(".tour-details").innerHTML = `
        <p>Không tìm thấy thông tin tour.</p>
        <a href="index.html" class="btn-primary">Quay lại</a>
    `;
}
// Hàm để hiển thị các ngày có thể đặt trong phần chi tiết tour
function displayAvailableDates() {
    const datesContainer = document.querySelector('.available-dates');
    const dateSelect = document.querySelector('#tour-date');
    
    // Lặp qua mảng ngày tháng và tạo các phần tử <li> để hiển thị
    tour.availableDates.forEach(date => {
        // Hiển thị các ngày có thể đặt trong danh sách
        const dateItem = document.createElement('li');
        dateItem.textContent = formatDate(date);
        datesContainer.appendChild(dateItem);
        
        // Thêm các ngày vào dropdown chọn ngày
        const option = document.createElement('option');
        option.value = date;
        option.textContent = formatDate(date);
        dateSelect.appendChild(option);
    });
}

// Hàm để định dạng lại ngày tháng theo kiểu dễ đọc (Ví dụ: 20/11/2024)
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Lắng nghe sự kiện thay đổi ngày chọn từ dropdown
document.querySelector('#tour-date').addEventListener('change', function() {
    const selectedDate = this.value;
    console.log(`Người dùng đã chọn ngày: ${formatDate(selectedDate)}`);
    // Bạn có thể lưu giá trị này hoặc gửi nó khi thực hiện đặt tour
});

// Gọi hàm khi trang được tải
document.addEventListener('DOMContentLoaded', displayAvailableDates);
// Lắng nghe sự kiện thay đổi ngày chọn từ dropdown
document.querySelector('#tour-date').addEventListener('change', function() {
    const selectedDate = this.value;
    console.log(`Người dùng đã chọn ngày: ${formatDate(selectedDate)}`);

    // Lưu ngày chọn vào localStorage
    localStorage.setItem('selectedTourDate', selectedDate);
});
