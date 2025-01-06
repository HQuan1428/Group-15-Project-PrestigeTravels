const { getPartnerByUserId, getToursByPartner, createTour, updateTour } = require('../../Models/providerModels/partnerModels');

// Trang dashboard nhà cung cấp
async function renderPartnerDashboard(req, res) {
    
    const userId = req.user.id; // Lấy user_id từ session
    const partner = await getPartnerByUserId(userId);
  
    
  
    if (!partner) {
      return res.status(403).send('Bạn không phải nhà cung cấp.');
    }
  
    const tours = await getToursByPartner(partner.id);
    console.log('Partner Tours:', tours); // Log để kiểm tra danh sách tour
    res.render('providerViews/partnerDashboard', { partner, tours });
  }
  

// Tạo tour mới
async function createNewTour(req, res) {
    const userId = req.user.id;
    const partner = await getPartnerByUserId(userId);

    if (!partner) {
        return res.status(403).json({ message: 'Bạn không có quyền tạo tour.' });
    }

    const tourData = req.body;
    const tour = await createTour(partner.id, tourData);
    res.redirect('/partner/tours');
}

// Cập nhật tour
async function updateExistingTour(req, res) {
    const tourId = req.params.id;
    const tourData = req.body;

    await updateTour(tourId, tourData);
    res.redirect('/partner/tours');
}

// Lấy danh sách tour
async function viewTours(req, res) {
    const userId = req.user.id;
    const partner = await getPartnerByUserId(userId);

    if (!partner) {
        return res.status(403).json({ message: 'Bạn không có quyền xem danh sách tour.' });
    }

    const tours = await getToursByPartner(partner.id);
    res.render('providerViews/partnerTours', { tours });
}

module.exports = {
    renderPartnerDashboard,
    createNewTour,
    updateExistingTour,
    viewTours,
};
