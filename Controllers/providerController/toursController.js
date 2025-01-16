const {
  getToursByPartner,
  getTourById,
  createTour,
  updateTourById,
  deleteTourById,
  getTourDetails,
  getTourDetailsWithDates,
} = require('../../Models/providerModels/tourModel');
const { db } = require('../../Models/Connect_Server/db');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Cấu hình multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const tempPath = path.join(__dirname, '../../uploads/tmp');
    fs.mkdirSync(tempPath, { recursive: true }); // Tạo folder tạm nếu chưa tồn tại
    cb(null, tempPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Chấp nhận cả mainImage và subImages[]
const uploadFields = upload.fields([
  { name: 'mainImage', maxCount: 1 }, // 1 ảnh chính
  { name: 'subImages[]', maxCount: 10 }, // Tối đa 10 ảnh phụ
]);

const addTour = async (req, res) => {
  try {
    const partnerId = req.session.partner_id;
    const {
      title,
      description,
      price,
      duration,
      starting_point,
      maxParticipants,
      availableDates, // JSON từ client
      services,       // Dịch vụ
      newService,     // Dịch vụ mới
      itinerary,      // Hành trình
      locationName, // Lấy từ form
      
    } = req.body;

    if (!partnerId || !title || !price) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp thông tin bắt buộc (partnerId, title, price).',
      });
    }

    // Parse `availableDates`
    const parsedAvailableDates = availableDates ? JSON.parse(availableDates) : [];

    // Dịch vụ
    let parsedServices = [];
    if (services) {
      parsedServices = Array.isArray(services) ? services : JSON.parse(services);

      // Chỉ giữ lại các dịch vụ hợp lệ (là chuỗi và không rỗng)
      parsedServices = parsedServices.filter(
        (service) => typeof service === 'string' && service.trim() !== ''
      );
    }


    await db.tx(async (t) => {
      const tourId = `TOUR-${Date.now()}`;

      // Tạo folder riêng cho tour
      const partnerFolderPath = path.join(__dirname, `../../uploads/${partnerId}`);
      const tourFolderPath = path.join(partnerFolderPath, tourId);
      fs.mkdirSync(partnerFolderPath, { recursive: true });
      fs.mkdirSync(tourFolderPath, { recursive: true });

      // Thêm tour
      await t.none(
        `INSERT INTO tours (id, partner_id, title, description, price, duration, starting_point, max_participants) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [tourId, partnerId, title, description, price, duration, starting_point, maxParticipants]
      );
      

      // Thêm ngày
      if (parsedAvailableDates.length > 0) {
        const dateQueries = parsedAvailableDates.map((date) =>
          t.none(
            `INSERT INTO tour_dates (tour_id, available_date, slots_available) VALUES ($1, $2, $3)`,
            [tourId, date.date, date.slots]
          )
        );
        await t.batch(dateQueries);
      }

      // Thêm ảnh vào bảng `tour_images` và di chuyển ảnh vào folder tour
      const mainImageFile = req.files.mainImage ? req.files.mainImage[0] : null;
      const subImagesFiles = req.files['subImages[]'] || [];

      if (mainImageFile) {
        const newMainImagePath = path.join(tourFolderPath, mainImageFile.filename);
        fs.renameSync(mainImageFile.path, newMainImagePath);
        await t.none(
          `INSERT INTO tour_images (tour_id, image_url, is_main) VALUES ($1, $2, $3)`,
          [tourId, `/uploads/${partnerId}/${tourId}/${mainImageFile.filename}`, true]
        );
      }

      if (subImagesFiles.length > 0) {
        for (const file of subImagesFiles) {
          const newSubImagePath = path.join(tourFolderPath, file.filename);
          fs.renameSync(file.path, newSubImagePath);
          await t.none(
            `INSERT INTO tour_images (tour_id, image_url, is_main) VALUES ($1, $2, $3)`,
            [tourId, `/uploads/${partnerId}/${tourId}/${file.filename}`, false]
          );
        }
      }

      // Xử lý thêm dịch vụ
const services = req.body.services || []; // Lấy danh sách dịch vụ từ form
if (Array.isArray(services) && services.length > 0) {
    const serviceQueries = services.map((service) =>
        t.one(
            `INSERT INTO services (name) VALUES ($1) RETURNING id`,
            [service.trim()]
        )
    );

    const serviceIds = await Promise.all(serviceQueries);

    // Chèn vào bảng `tour_services`
    if (serviceIds.length > 0) {
        const tourServiceQueries = serviceIds.map((service) =>
            t.none(
                `INSERT INTO tour_services (tour_id, service_id) VALUES ($1, $2)`,
                [tourId, service.id]
            )
        );
        await t.batch(tourServiceQueries);
    }
}

      // Thêm hành trình
      if (itinerary) {
        const parsedItinerary = Array.isArray(itinerary) ? itinerary : JSON.parse(itinerary);
        if (parsedItinerary.length > 0) {
          const itineraryQueries = parsedItinerary.map((item) =>
            t.none(
              `INSERT INTO tour_itinerary (tour_id, day_number, title, description) VALUES ($1, $2, $3, $4)`,
              [tourId, item.day, item.title, item.description]
            )
          );
          await t.batch(itineraryQueries);
        }
      }

      const location = await t.oneOrNone(
        `SELECT id FROM locations WHERE name = $1`,
        [locationName]
      );

      if (!location) {
        throw new Error('Địa điểm không hợp lệ.');
      }

      await t.none(
        `INSERT INTO tour_locations (tour_id, location_id)
         VALUES ($1, $2)`,
        [tourId, location.id]
      );
    });


    res.redirect('/partner/tours');
  } catch (error) {
    console.error('Error adding tour:', error.message);
    res.status(500).json({ success: false, message: 'Lỗi khi thêm tour.' });
  }
};
// Hiển thị danh sách tour
const renderTours = async (req, res) => {
  try {
    const partnerId = req.session.partner_id; // Lấy partner_id từ session
    if (!partnerId) {
      return res.status(403).send('Bạn không phải nhà cung cấp.');
    }

    const tours = await getToursByPartner(partnerId);
    console.log(tours); // Log dữ liệu tours ra để kiểm tra
            const role = req.session.userType;

    res.render('providerViews/providerTours', { tours,role });
  } catch (err) {
    console.error('Error rendering tours:', err);
    res.status(500).send('Lỗi hiển thị danh sách tour');
  }
};

// Hiển thị form thêm tour
const renderAddTourForm = async (req, res) => {
  try {
    const locations = await db.any('SELECT name FROM locations');
            const role = req.session.userType;

      res.render('providerViews/addTour', { locations,role });
  } catch (error) {
      console.error('Error fetching locations:', error.message);
      res.status(500).send('Lỗi lấy danh sách địa điểm');
  }
};

// Hiển thị form chỉnh sửa tour
const renderEditTourForm = async (req, res) => {
  try {
    const tour = await getTourById(req.params.id);
    const locations = await db.any('SELECT name FROM locations'); // Lấy danh sách địa điểm
            const role = req.session.userType;

    res.render('providerViews/editTour', { tour, locations,role });
  } catch (err) {
    console.error('Error rendering edit tour form:', err);
    res.status(500).send('Lỗi hiển thị form chỉnh sửa');
  }
};

// Cập nhật tour
const updateTour = async (req, res) => {
  try {
    console.log("Dữ liệu nhận được từ form:", req.body); // Log toàn bộ dữ liệu nhận từ form
    const { title, description, price, duration, starting_point } = req.body;

    if (!title || title.trim() === "") {
      throw new Error("Tiêu đề không được bỏ trống");
    }

    await updateTourById(req.params.id, { title, description, price, duration, starting_point });
    res.redirect('/partner/tours');
  } catch (err) {
    console.error('Error updating tour:', err.message);
    res.status(500).send('Lỗi cập nhật tour: ' + err.message);
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


const renderTourDetails = async (req, res) => {
  try {
    const tourId = req.params.id;
    const tour = await getTourDetailsWithDates(tourId);

    if (!tour) {
      return res.status(404).send('Tour không tồn tại');
    }
            const role = req.session.userType;


    res.render('providerViews/tourDetails', { tour,role });
  } catch (err) {
    console.error('Error rendering tour details:', err);
    res.status(500).send('Lỗi hiển thị chi tiết tour');
  }
};


module.exports = {
  uploadFields,
  addTour,
  renderTours,
  renderAddTourForm,
  renderEditTourForm,
  updateTour,
  deleteTour,
  renderTourDetails,
};
