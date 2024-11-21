document.addEventListener('DOMContentLoaded', function() {
    displayAvailableDates();
    updateSummary();
});

function incrementGuests() {
    const input = document.getElementById('guests');
    input.value = parseInt(input.value) + 1;
    updateSummary();
}

function decrementGuests() {
    const input = document.getElementById('guests');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
        updateSummary();
    }
}

function updateSummary() {
    const tourName = document.getElementById('tour-name');
    const selectedDate = document.getElementById('selected-date');
    const guestCount = document.getElementById('guest-count');
    const totalPrice = document.getElementById('total-price');
    
    // Update with actual tour data
    const guests = document.getElementById('guests').value;
    const date = document.getElementById('tour-date').value;
    
    guestCount.textContent = guests;
    selectedDate.textContent = formatDate(date);
    // Calculate and update total price based on your pricing logic
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
