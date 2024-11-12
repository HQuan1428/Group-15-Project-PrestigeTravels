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
                        <div class="image" style="background-image: url('https://media.istockphoto.com/id/1357445596/vi/anh/c%E1%BA%A7u-r%E1%BB%93ng-%E1%BB%9F-th%C3%A0nh-ph%E1%BB%91-%C4%91%C3%A0-n%E1%BA%B5ng.jpg?s=612x612&w=0&k=20&c=H_3uhMhNr1kZvg78iOtTROncLKwbsYrffBAEIPpGX2g=');"></div>
                        <div class="content">
                            <div class="title">Đà Nẵng</div>
                            <div class="date">26 Tháng 11 2024</div>
                            <div class="price">885.550 VND</div>
                        </div>
                    </div>
                    <div class="item_display">
                        <div class="image" style="background-image: url('https://rootytrip.com/wp-content/uploads/2023/07/canh-dep-o-phu-quoc-1-e1692700957812.jpg');"></div>
                        <div class="content">
                            <div class="title">Phú Quốc</div>
                            <div class="date">28 Tháng 11 2024</div>
                            <div class="price">750.000 VND</div>
                        </div>
                    </div>
                    <div class="item_display">
                        <div class="image" style="background-image: url('https://cdn.pixabay.com/photo/2020/03/08/13/22/hue-4912504_640.jpg');"></div>
                        <div class="content">
                            <div class="title">Huế</div>
                            <div class="date">29 Tháng 11 2024</div>
                            <div class="price">600.000 VND</div>
                        </div>
                    </div>
                    <div class="item_display">
                        <div class="image" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Ho_Chi_Minh_City_Skyline_at_Night.jpg/800px-Ho_Chi_Minh_City_Skyline_at_Night.jpg');"></div>
                        <div class="content">
                            <div class="title">Hồ Chí Minh City</div>
                            <div class="date">1 Tháng 12 2024</div>
                            <div class="price">1.000.000 VND</div>
                        </div>
                    </div>
                `;
                break;
            case "Thailand":
                itemsHTML = `
                    <div class="item_display">
                        <div class="image" style="background-image: url('https://www.dulichrongachau.vn/image/catalog/tour/galary-khach-hang/thai-lan/phuket-thang-06/phu-ket-1-new.jpg');"></div>
                        <div class="content">
                            <div class="title">Phuket</div>
                            <div class="date">5 Tháng 12 2024</div>
                            <div class="price">1.200.000 VND</div>
                        </div>
                    </div>
                    <div class="item_display">
                        <div class="image" style="background-image: url('https://goldensmiletravel.com/uploads/wp-content/uploadsstatic-tumblr-static-640.jpg');"></div>
                        <div class="content">
                            <div class="title">Pattaya</div>
                            <div class="date">10 Tháng 12 2024</div>
                            <div class="price">1.500.000 VND</div>
                        </div>
                    </div>
                `;
                break;
                case "Singapore":
                    itemsHTML = `
                        <div class="item_display">
                            <div class="image" style="background-image: url('https://lh3.googleusercontent.com/p/AF1QipOSfVlXvec5dmAEzZq1tJWAE2Pi3XRjxOGw6hR3=s294-w294-h220-k-no');"></div>
                            <div class="content">
                                <div class="title">ArtScience</div>
                                <div class="date">5 Tháng 12 2024</div>
                                <div class="price">1.200.000 VND</div>
                            </div>
                        </div>
                        <div class="item_display">
                            <div class="image" style="background-image: url('https://lh3.googleusercontent.com/p/AF1QipM9OyTMcL-h8DzsrQ40Zs5n6QhqQOuyM7QCGIIG=s294-w294-h220-k-no');"></div>
                            <div class="content">
                                <div class="title">S.E.A</div>
                                <div class="date">10 Tháng 12 2024</div>
                                <div class="price">1.500.000 VND</div>
                            </div>
                        </div>
                    `;
                    break;

                case "Korea":
                        itemsHTML = `
                            <div class="item_display">
                                <div class="image" style="background-image: url('https://intertour.vn/wp-content/uploads/2022/03/1b68cef0-83de-4a81-8a43-eae925aed58e-1.jpg');"></div>
                                <div class="content">
                                    <div class="title">Cầu Banpo</div>
                                    <div class="date">5 Tháng 12 2024</div>
                                    <div class="price">1.200.000 VND</div>
                                </div>
                            </div>
                            <div class="item_display">
                                <div class="image" style="background-image: url('https://intertour.vn/wp-content/uploads/2022/03/bec8758d-71e2-4d12-8a88-4ae3e8ef8f6f-1.jpg');"></div>
                                <div class="content">
                                    <div class="title">Changdeokgung</div>
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
    // Kích hoạt sự kiện click mặc định cho button Vietnam
    $('.item[data-location="Vietnam"]').trigger('click');
});
