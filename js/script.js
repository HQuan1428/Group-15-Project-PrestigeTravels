// Xử lý menu mobile
document.addEventListener('DOMContentLoaded', function() {
    // Thêm hiệu ứng scroll cho navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Xử lý form đặt tour
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Lấy thông tin từ form
            const formData = new FormData(bookingForm);
            const bookingData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                tourDate: formData.get('tour-date'),
                guests: formData.get('guests')
            };
            
            // Hiển thị thông báo đặt tour thành công
            alert('Cảm ơn bạn đã đặt tour! Chúng tôi sẽ liên hệ sớm nhất.');
            bookingForm.reset();
        });
    }

    // Slider cho phần đánh giá
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(item => item.style.display = 'none');
        testimonials[index].style.display = 'block';
    }

    if (testimonials.length > 0) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Nút back-to-top
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    document.body.appendChild(backToTop);

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    // Xử lý menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Animation khi scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Áp dụng animation cho các phần tử
    document.querySelectorAll('.tour-card, .section-title, .feature-item').forEach(el => {
        observer.observe(el);
    });

    // Xử lý tìm kiếm tour
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchForm.querySelector('input[type="search"]').value;
            // Thực hiện tìm kiếm (có thể thêm logic tìm kiếm ở đây)
            alert(`Đang tìm kiếm tour với từ khóa: ${searchTerm}`);
        });
    }

    // Xử lý slider
    const slider = document.querySelector('.tour-cards');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    nextBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: 320,
            behavior: 'smooth'
        });
    });
    
    prevBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: -320,
            behavior: 'smooth'
        });
    });

    // Xử lý tour tags
    const tourTags = document.querySelectorAll('.tour-tag');
    tourTags.forEach(tag => {
        tag.addEventListener('click', () => {
            tourTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            // Thêm logic lọc tour theo tag ở đây
        });
    });
}); 

// Xử lý Hiển thị/ Ẩn mk
document.querySelectorAll('.toggle-password').forEach(item => {
    item.addEventListener('click', function() {
        const input = this.previousElementSibling;
        if (input.type === 'password') {
            input.type = 'text';
            this.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            input.type = 'password';
            this.classList.replace('fa-eye-slash', 'fa-eye');
        }
    });
});

//
document.addEventListener('DOMContentLoaded', function () {
    // Xử lý menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Xử lý đăng nhập
    document.getElementById('loginForm')?.addEventListener('submit', function (e) {
        e.preventDefault();

        const identifier = document.querySelector('input[placeholder="Email hoặc Tên tài khoản"]').value.trim();
        const password = document.querySelector('input[placeholder="Mật khẩu"]').value.trim();

        if (!identifier || !password) {
            alert('Vui lòng nhập đầy đủ thông tin.');
            return;
        }

        const mockUsers = [
            { username: 'user1', email: 'user1@example.com', password: 'password123' },
            { username: 'testuser', email: 'test@example.com', password: 'password123' },
        ];

        const user = mockUsers.find(
            u => (u.username === identifier || u.email === identifier) && u.password === password
        );

        if (user) {
            alert('Đăng nhập thành công!');
            window.location.href = '../index.html';
        } else {
            alert('Email, tên tài khoản hoặc mật khẩu không đúng!');
        }
    });

    // Xử lý quên mật khẩu
    document.getElementById('forgotPasswordForm')?.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.querySelector('input[placeholder="Email"]').value.trim();

        if (!email) {
            alert('Vui lòng nhập email của bạn.');
            return;
        }

        const mockEmails = ['user1@example.com', 'test@example.com'];

        if (mockEmails.includes(email)) {
            alert('Liên kết khôi phục mật khẩu đã được gửi tới email của bạn.');
        } else {
            alert('Không tìm thấy tài khoản nào với email này.');
        }
    });

    // Hiển thị/Ẩn mật khẩu
    document.querySelectorAll('.toggle-password').forEach(item => {
        item.addEventListener('click', function () {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                this.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });
});

// JavaScript để mở và đóng modal
function openModal() {
    document.getElementById("forgotPasswordModal").style.display = "block";
}

function closeModal() {
    document.getElementById("forgotPasswordModal").style.display = "none";
}

// Đóng modal khi nhấn ra ngoài
window.onclick = function(event) {
    const modal = document.getElementById("forgotPasswordModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
