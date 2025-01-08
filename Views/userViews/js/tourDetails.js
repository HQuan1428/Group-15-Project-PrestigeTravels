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
// Update the date handling code
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const tourId = params.get('tour');
    const tour = toursData[tourId];

    if (tour && tour.availableDates) {
        const dateSelect = document.getElementById('tour-date');
        const datesList = document.querySelector('.available-dates');

        // Clear existing options
        dateSelect.innerHTML = '<option value="">-- Chọn ngày --</option>';
        datesList.innerHTML = '';

        // Add available dates
        tour.availableDates.forEach(date => {
            // Add to dropdown
            const option = document.createElement('option');
            option.value = date;
            option.textContent = formatDate(date);
            dateSelect.appendChild(option);

            // Add to list
            const li = document.createElement('li');
            li.textContent = formatDate(date);
            datesList.appendChild(li);
        });
    }
});

// Format date helper
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Add CSS styles for better date display
const style = document.createElement('style');
style.textContent = `
    .available-dates {
        list-style: none;
        padding: 0;
        margin: 20px 0;
    }
    .date-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px;
        margin: 5px 0;
        background: #f5f5f5;
        border-radius: 5px;
    }
    .date-icon {
        color: #0078d7;
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    displayAvailableDates();
});

// Lắng nghe sự kiện thay đổi ngày chọn từ dropdown
document.querySelector('#tour-date').addEventListener('change', function() {
    const selectedDate = this.value;
    console.log(`Người dùng đã chọn ngày: ${formatDate(selectedDate)}`);
    // Bạn có thể lưu giá trị này hoặc gửi nó khi thực hiện đặt tour
});
// Lắng nghe sự kiện thay đổi ngày chọn từ dropdown
document.querySelector('#tour-date').addEventListener('change', function() {
    const selectedDate = this.value;
    console.log(`Người dùng đã chọn ngày: ${formatDate(selectedDate)}`);

    // Lưu ngày chọn vào localStorage
    localStorage.setItem('selectedTourDate', selectedDate);
});
