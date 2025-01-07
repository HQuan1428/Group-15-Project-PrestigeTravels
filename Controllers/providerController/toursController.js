const {
  getToursByPartner,
  getTourById,
  createTour,
  updateTourById,
  deleteTourById,
} = require('../../Models/providerModels/tourModel');

// Hiển thị danh sách tour
const renderTours = async (req, res) => {
  try {
    const partnerId = req.session.partner_id; // Lấy partner_id từ session
    if (!partnerId) {
      return res.status(403).send('Bạn không phải nhà cung cấp.');
    }

    const tours = await getToursByPartner(partnerId);
    res.render('providerViews/providerTours', { tours });
  } catch (err) {
    console.error('Error rendering tours:', err);
    res.status(500).send('Lỗi hiển thị danh sách tour');
  }
};

// Hiển thị form thêm tour
const renderAddTourForm = (req, res) => {
  res.render('providerViews/addTour');
};

// Thêm tour mới
const createNewTour = async (req, res) => {
  try {
    const partnerId = req.session.partner_id; // Lấy partner_id từ session
    const { title, description, price, duration, starting_point, max_participants } = req.body;

    if (!partnerId || !title || !description || !price) {
      return res.status(400).send('Vui lòng điền đầy đủ thông tin cần thiết.');
    }

    await createTour(partnerId, {
      title,
      description,
      price,
      duration,
      starting_point,
      max_participants,
    });

    res.redirect('/partner/tours');
  } catch (error) {
    console.error('Error creating tour:', error);
    res.status(500).send('Lỗi khi tạo tour.');
  }
};
// Hiển thị form chỉnh sửa tour
const renderEditTourForm = async (req, res) => {
  try {
      const tour = await getTourById(req.params.id);
      res.render('providerViews/editTour', { tour });
  } catch (err) {
      console.error('Error rendering edit tour form:', err);
      res.status(500).send('Lỗi hiển thị form chỉnh sửa');
  }
};

// Cập nhật tour
const updateTour = async (req, res) => {
  try {
      const { title, description, price, duration, starting_point } = req.body;
      await updateTourById(req.params.id, { title, description, price, duration, starting_point });
      res.redirect('/partner/tours');
  } catch (err) {
      console.error('Error updating tour:', err);
      res.status(500).send('Lỗi cập nhật tour');
  }
};

// Xóa tour
const deleteTour = async (req, res) => {
  try {
      await deleteTourById(req.params.id);
      res.redirect('/partner/tours');
  } catch (err) {
      console.error('Error deleting tour:', err);
      res.status(500).send('Lỗi xóa tour');
  }
};

module.exports = {
  renderTours,
  renderAddTourForm,
  createNewTour,
  renderEditTourForm,
  updateTour,
  deleteTour,
};
