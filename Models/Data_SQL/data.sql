USE railway;
-- Users (từ register.html)
CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    role ENUM('customer', 'admin', 'partner') DEFAULT 'customer',
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Partners (từ become-partner.html)
CREATE TABLE Partners (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    company_name VARCHAR(255) NOT NULL,
    tax_code VARCHAR(50) UNIQUE NOT NULL,
    business_address TEXT NOT NULL,
    representative_name VARCHAR(255) NOT NULL,
    position VARCHAR(100),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Tours (từ tour-details.html)
CREATE TABLE Tours (
    id VARCHAR(50) PRIMARY KEY,
    partner_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    duration VARCHAR(100),
    starting_point VARCHAR(255),
    image VARCHAR(255),
    max_participants INT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (partner_id) REFERENCES Partners(id)
);

-- Tour_Dates
CREATE TABLE Tour_Dates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tour_id VARCHAR(50),
    available_date DATE NOT NULL,
    slots_available INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tour_id) REFERENCES Tours(id)
);

-- Bookings (từ booking.html)
CREATE TABLE Bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    tour_id VARCHAR(50),
    tour_date_id INT,
    adults INT NOT NULL DEFAULT 1,
    children INT DEFAULT 0,
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (tour_id) REFERENCES Tours(id),
    FOREIGN KEY (tour_date_id) REFERENCES Tour_Dates(id)
);

-- Reviews (từ tour-details.html)
CREATE TABLE Reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    tour_id VARCHAR(50),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (tour_id) REFERENCES Tours(id)
);

CREATE TABLE Notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    title VARCHAR(255),
    content TEXT,
    type ENUM('system', 'booking', 'promotion'),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT,
    receiver_id INT,
    content TEXT,
    created_at TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES Users(id),
    FOREIGN KEY (receiver_id) REFERENCES Users(id)
);

CREATE TABLE Wishlists (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    tour_id VARCHAR(50),
    created_at TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES Users(id),
	FOREIGN KEY (tour_id) REFERENCES Tours(id)
);

CREATE TABLE UserPoints (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    points INT DEFAULT 0,
    level VARCHAR(50),
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Coupons (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    discount_percent INT,
    discount_amount DECIMAL(10,2),
    min_order_amount DECIMAL(10,2),
    start_date DATE,
    end_date DATE,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Booking_Coupons (
    booking_id INT,
    coupon_id VARCHAR(50),
    discount_amount DECIMAL(10,2),
    PRIMARY KEY (booking_id, coupon_id),
    FOREIGN KEY (booking_id) REFERENCES Bookings(id),
    FOREIGN KEY (coupon_id) REFERENCES Coupons(id)
);

CREATE TABLE Services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE Tour_Services (
    tour_id VARCHAR(50),
    service_id INT,
    PRIMARY KEY (tour_id, service_id),
    FOREIGN KEY (tour_id) REFERENCES Tours(id),
    FOREIGN KEY (service_id) REFERENCES Services(id)
);

CREATE TABLE Payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT,
    amount DECIMAL(10,2),
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100),
    status VARCHAR(50),
    created_at TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES Bookings(id)
);

CREATE TABLE Payment_Methods (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    is_active BOOLEAN
);

CREATE TABLE Statistics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    report_date DATE,
    total_bookings INT,
    total_revenue DECIMAL(10,2),
    total_customers INT,
    created_at TIMESTAMP
);

CREATE TABLE Tour_Images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tour_id VARCHAR(50),
    image_url VARCHAR(255),
    is_main BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tour_id) REFERENCES Tours(id)
);

CREATE TABLE Tour_Itinerary (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tour_id VARCHAR(50),
    day_number INT,
    title VARCHAR(255),
    description TEXT,
    FOREIGN KEY (tour_id) REFERENCES Tours(id)
);

CREATE TABLE Partner_Documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    partner_id INT,
    document_type VARCHAR(50),
    document_url VARCHAR(255),
    status ENUM('pending', 'approved', 'rejected'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (partner_id) REFERENCES Partners(id)
);

CREATE TABLE Tour_Categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    description TEXT,
    status ENUM('active', 'inactive') DEFAULT 'active'
);

CREATE TABLE Tour_Category_Relations (
    tour_id VARCHAR(50),
    category_id INT,
    PRIMARY KEY (tour_id, category_id),
    FOREIGN KEY (tour_id) REFERENCES Tours(id),
    FOREIGN KEY (category_id) REFERENCES Tour_Categories(id)
);

CREATE TABLE Booking_Special_Requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT,
    request_text TEXT,
    status ENUM('pending', 'processed', 'completed'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES Bookings(id)
);

CREATE TABLE System_Logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id VARCHAR(50),
    old_value TEXT,
    new_value TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE User_Activities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    activity_type ENUM('search', 'view', 'click', 'bookmark', 'share'),
    target_type VARCHAR(50),
    target_id VARCHAR(50),
    metadata JSON,
    session_id VARCHAR(100),
    device_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Report_Templates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    template_type ENUM('partner', 'booking', 'revenue', 'customer'),
    content JSON,
    variables JSON,
    created_by INT,
    updated_by INT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES Users(id),
    FOREIGN KEY (updated_by) REFERENCES Users(id)
);

CREATE TABLE Generated_Reports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    template_id INT,
    report_data JSON,
    generated_by INT,
    generated_for_date DATE,
    file_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (template_id) REFERENCES Report_Templates(id),
    FOREIGN KEY (generated_by) REFERENCES Users(id)
);

CREATE TABLE Email_Templates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    template_type ENUM(
        'welcome',
        'booking_confirmation',
        'payment_success',
        'tour_reminder',
        'password_reset',
        'promotion',
        'partner_approval'
    ),
    variables JSON,
    created_by INT,
    updated_by INT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES Users(id),
    FOREIGN KEY (updated_by) REFERENCES Users(id)
);

CREATE TABLE Sent_Emails (
    id INT PRIMARY KEY AUTO_INCREMENT,
    template_id INT,
    recipient_email VARCHAR(255),
    subject VARCHAR(255),
    content TEXT,
    status ENUM('pending', 'sent', 'failed'),
    error_message TEXT,
    sent_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (template_id) REFERENCES Email_Templates(id)
);

CREATE INDEX idx_user_activities_type ON User_Activities(activity_type);
CREATE INDEX idx_user_activities_user ON User_Activities(user_id, created_at);

CREATE INDEX idx_system_logs_action ON System_Logs(action);
CREATE INDEX idx_system_logs_created_at ON System_Logs(created_at);

ALTER TABLE Tours
ADD CONSTRAINT check_price CHECK (price > 0),
ADD CONSTRAINT check_max_participants CHECK (max_participants > 0);

ALTER TABLE Tour_Dates
ADD CONSTRAINT check_slots CHECK (slots_available >= 0);

ALTER TABLE Bookings
ADD CONSTRAINT check_adults CHECK (adults > 0),
ADD CONSTRAINT check_children CHECK (children >= 0);

ALTER TABLE Users
ADD COLUMN avatar VARCHAR(255),
ADD COLUMN last_login TIMESTAMP,
ADD COLUMN verification_token VARCHAR(100),
ADD COLUMN is_verified BOOLEAN DEFAULT FALSE;

ALTER TABLE Partners
ADD COLUMN commission_rate DECIMAL(5,2),
ADD COLUMN bank_account VARCHAR(100),
ADD COLUMN bank_name VARCHAR(100);

ALTER TABLE Tours
ADD COLUMN cancellation_policy TEXT,
ADD COLUMN min_participants INT,
ADD COLUMN meeting_point TEXT,
ADD COLUMN included_services TEXT,
ADD COLUMN excluded_services TEXT;

ALTER TABLE Reviews
ADD COLUMN images TEXT,
ADD COLUMN reply_to INT,
ADD COLUMN status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending';

ALTER TABLE Tours ADD COLUMN (
    difficulty_level ENUM('easy', 'medium', 'hard') DEFAULT 'easy',
    language VARCHAR(100),
    highlights TEXT,
    requirements TEXT,
    location_coordinates POINT,
    average_rating DECIMAL(3,2)
);

CREATE TABLE Locations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    parent_id INT,
    type ENUM('country', 'province', 'city', 'district') NOT NULL,
    description TEXT,
    image VARCHAR(255),
    status ENUM('active', 'inactive') DEFAULT 'active',
    FOREIGN KEY (parent_id) REFERENCES Locations(id)
);

CREATE TABLE Tour_Locations (
    tour_id VARCHAR(50),
    location_id INT,
    is_main BOOLEAN DEFAULT FALSE,
    visit_order INT,
    PRIMARY KEY (tour_id, location_id),
    FOREIGN KEY (tour_id) REFERENCES Tours(id),
    FOREIGN KEY (location_id) REFERENCES Locations(id)
);

CREATE TABLE Payment_Transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    payment_id INT,
    amount DECIMAL(10,2),
    transaction_type ENUM('payment', 'refund'),
    provider_response JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (payment_id) REFERENCES Payments(id)
);

CREATE TABLE Tour_Guides (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    license_number VARCHAR(100),
    specializations TEXT,
    languages_spoken TEXT,
    experience_years INT,
    rating DECIMAL(3,2),
    status ENUM('available', 'busy', 'inactive') DEFAULT 'available',
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Tour_Guide_Assignments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tour_date_id INT,
    guide_id INT,
    status ENUM('assigned', 'completed', 'cancelled'),
    FOREIGN KEY (tour_date_id) REFERENCES Tour_Dates(id),
    FOREIGN KEY (guide_id) REFERENCES Tour_Guides(id)
);

CREATE TABLE FAQs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tour_id VARCHAR(50),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    order_index INT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    FOREIGN KEY (tour_id) REFERENCES Tours(id)
);

DELIMITER //

CREATE TRIGGER update_tour_rating
AFTER INSERT ON Reviews
FOR EACH ROW
BEGIN
    UPDATE Tours 
    SET average_rating = (
        SELECT AVG(rating) 
        FROM Reviews 
        WHERE tour_id = NEW.tour_id
    )
    WHERE id = NEW.tour_id;
END//

DELIMITER ;

DELIMITER //
CREATE TRIGGER update_tour_rating_on_update
AFTER UPDATE ON Reviews
FOR EACH ROW
BEGIN
    UPDATE Tours 
    SET average_rating = (
        SELECT AVG(rating) 
        FROM Reviews 
        WHERE tour_id = NEW.tour_id
    )
    WHERE id = NEW.tour_id;
END//

DELIMITER ;

-- Thêm các index để tối ưu truy vấn phổ biến
CREATE INDEX idx_tours_price ON Tours(price);
CREATE INDEX idx_tours_status ON Tours(status);
CREATE INDEX idx_bookings_date ON Bookings(created_at);
CREATE INDEX idx_tour_dates_availability ON Tour_Dates(available_date, slots_available);

-- Thêm cột để cache dữ liệu thường xuyên truy cập
ALTER TABLE Tours ADD COLUMN cached_review_count INT;
ALTER TABLE Tours ADD COLUMN cached_booking_count INT;

-- Thêm bảng để theo dõi trạng thái hệ thống
CREATE TABLE System_Status (
    id INT PRIMARY KEY AUTO_INCREMENT,
    component VARCHAR(50),
    status ENUM('active', 'degraded', 'down'),
    last_check_time TIMESTAMP,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Thêm bảng để theo dõi các phiên đăng nhập
CREATE TABLE User_Sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    session_token VARCHAR(255),
    ip_address VARCHAR(45),
    device_info TEXT,
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Thêm bảng để lưu lịch sử mật khẩu
CREATE TABLE Password_History (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);