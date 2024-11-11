$(document).ready(function() {
    $(".item").on('click', function() {
        // Đặt lại màu nền và màu chữ của tất cả button
        $(".item").css({
            "background-color": "",
            "color": ""
        });

        // Đổi màu nền và màu chữ của button đang nhấn
        $(this).css({
            "background-color": "blue",
            "color": "white"
        });

        // Lấy thông tin địa điểm từ thuộc tính data-location của button
        var location = $(this).data("location");
        var itemsHTML = ""; // Chuỗi chứa các thông tin sẽ hiển thị

        // Dựa trên location, tạo nội dung HTML tương ứng
        switch(location) {
            case "Vietnam":
                itemsHTML = `
                    <div class="item_display">
                        <div class="image" style="background-image: url('images/nhathoducba.jpg');"></div>
                        <div class="content">
                            <div class="title">Hà Nội - Đà Nẵng</div>
                            <div class="date">26 Tháng 11 2024</div>
                            <div class="price">885.550 VND</div>
                        </div>
                    </div>
                    <div class="item_display">
                        <div class="image" style="background-image: url('images/nhathoducba.jpg');"></div>
                        <div class="content">
                            <div class="title">Hà Nội - Phú Quốc</div>
                            <div class="date">28 Tháng 11 2024</div>
                            <div class="price">750.000 VND</div>
                        </div>
                    </div>
                    <div class="item_display">
                        <div class="image" style="background-image: url('images/nhathoducba.jpg');"></div>
                        <div class="content">
                            <div class="title">Hà Nội - Huế</div>
                            <div class="date">29 Tháng 11 2024</div>
                            <div class="price">600.000 VND</div>
                        </div>
                    </div>
                    <div class="item_display">
                        <div class="image" style="background-image: url('images/nhathoducba.jpg');"></div>
                        <div class="content">
                            <div class="title">Hà Nội - Hồ Chí Minh</div>
                            <div class="date">1 Tháng 12 2024</div>
                            <div class="price">1.000.000 VND</div>
                        </div>
                    </div>
                    <div class="item_display">
                        <div class="image" style="background-image: url('images/nhathoducba.jpg');"></div>
                        <div class="content">
                            <div class="title">Hà Nội - Phan Thiết</div>
                            <div class="date">3 Tháng 12 2024</div>
                            <div class="price">800.000 VND</div>
                        </div>
                    </div>
                `;
                break;
            case "Thailand":
                itemsHTML = `
                    <div class="item_display">
                        <div class="image" style="background-image: url('images/nhathoducba.jpg');"></div>
                        <div class="content">
                            <div class="title">Bangkok - Phuket</div>
                            <div class="date">5 Tháng 12 2024</div>
                            <div class="price">1.200.000 VND</div>
                        </div>
                    </div>
                    <div class="item_display">
                        <div class="image" style="background-image: url('images/nhathoducba.jpg');"></div>
                        <div class="content">
                            <div class="title">Bangkok - Pattaya</div>
                            <div class="date">10 Tháng 12 2024</div>
                            <div class="price">1.500.000 VND</div>
                        </div>
                    </div>
                `;
                break;
                case "Singapore":
                    itemsHTML = `
                        <div class="item_display">
                            <div class="image" style="background-image: url('images/nhathoducba.jpg');"></div>
                            <div class="content">
                                <div class="title">Bangkok - Phuket</div>
                                <div class="date">5 Tháng 12 2024</div>
                                <div class="price">1.200.000 VND</div>
                            </div>
                        </div>
                        <div class="item_display">
                            <div class="image" style="background-image: url('images/nhathoducba.jpg');"></div>
                            <div class="content">
                                <div class="title">Bangkok - Pattaya</div>
                                <div class="date">10 Tháng 12 2024</div>
                                <div class="price">1.500.000 VND</div>
                            </div>
                        </div>
                    `;
                    break;
                    case "Malaysia":
                        itemsHTML = `
                            <div class="item_display">
                                <div class="image" style="background-image: url('images/nhathoducba.jpg');"></div>
                                <div class="content">
                                    <div class="title">Bangkok - Phuket</div>
                                    <div class="date">5 Tháng 12 2024</div>
                                    <div class="price">1.200.000 VND</div>
                                </div>
                            </div>
                            <div class="item_display">
                                <div class="image" style="background-image: url('images/nhathoducba.jpg');"></div>
                                <div class="content">
                                    <div class="title">Bangkok - Pattaya</div>
                                    <div class="date">10 Tháng 12 2024</div>
                                    <div class="price">1.500.000 VND</div>
                                </div>
                            </div>
                        `;
                        break;
                        case "Korea":
                        itemsHTML = `
                            <div class="item_display">
                                <div class="image" style="background-image: url('images/nhathoducba.jpg');"></div>
                                <div class="content">
                                    <div class="title">Bangkok - Phuket</div>
                                    <div class="date">5 Tháng 12 2024</div>
                                    <div class="price">1.200.000 VND</div>
                                </div>
                            </div>
                            <div class="item_display">
                                <div class="image" style="background-image: url('images/nhathoducba.jpg');"></div>
                                <div class="content">
                                    <div class="title">Bangkok - Pattaya</div>
                                    <div class="date">10 Tháng 12 2024</div>
                                    <div class="price">1.500.000 VND</div>
                                </div>
                            </div>
                        `;
                        break;
            default:
                itemsHTML = "<p>Chưa có thông tin cho địa điểm này.</p>";
        }

        $(".display").html(itemsHTML);

        
    });
});
