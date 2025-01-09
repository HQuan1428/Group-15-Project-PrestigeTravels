const { 
    getOrdersByPartner, 
    getOrderDetails, 
    updateOrderStatus 
} = require('../../Models/providerModels/ordersModel');

// Hiển thị danh sách đơn hàng
const renderOrders = async (req, res) => {
    try {
        const partnerId = req.session.partner_id;
        if (!partnerId) {
            return res.status(403).send('Bạn không phải nhà cung cấp.');
        }

        const orders = await getOrdersByPartner(partnerId);
        console.log(orders); // In ra dữ liệu để kiểm tra trạng thái
        res.render('providerViews/providerOrders', { orders });
    } catch (err) {
        console.error('Error rendering orders:', err);
        res.status(500).send('Lỗi hiển thị danh sách đơn hàng');
    }
};


// Hiển thị chi tiết đơn hàng
const renderOrderDetails = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await getOrderDetails(orderId);

        if (!order) {
            return res.status(404).send('Không tìm thấy đơn hàng.');
        }

        res.render('providerViews/orderDetails', { order });
    } catch (err) {
        console.error('Error rendering order details:', err);
        res.status(500).send('Lỗi hiển thị chi tiết đơn hàng');
    }
};

// Cập nhật trạng thái đơn hàng
const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        await updateOrderStatus(orderId, status);
        res.redirect('/partner/orders');
    } catch (err) {
        console.error('Error updating order status:', err);
        res.status(500).send('Lỗi cập nhật trạng thái đơn hàng');
    }
};
const acceptOrder = async (req, res) => {
    try {
        const partnerId = req.session.partner_id;
        if (!partnerId) {
            return res.status(403).send('Bạn không có quyền thực hiện thao tác này.');
        }

        const orderId = req.params.id;

        // Cập nhật trạng thái đơn hàng thành 'confirmed'
        await updateOrderStatus(orderId, 'confirmed');
        res.redirect('/partner/orders'); // Chuyển hướng về danh sách đơn hàng
    } catch (err) {
        console.error('Error accepting order:', err);
        res.status(500).send('Lỗi chấp nhận đơn hàng');
    }
};



module.exports = {
    renderOrders,
    renderOrderDetails,
    updateOrder,
    acceptOrder
};
