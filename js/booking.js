document.addEventListener('DOMContentLoaded', function() {
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
});

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
