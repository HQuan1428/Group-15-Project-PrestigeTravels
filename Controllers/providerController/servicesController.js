const {
    getServicesByPartner,
    getServiceById,
    addService,
    updateServiceById,
    deleteServiceById,
  } = require('../../Models/providerModels/serviceModel');
  
  // Hiển thị danh sách dịch vụ
  const renderServices = async (req, res) => {
    try {
      const partnerId = req.session.partner_id; // Lấy partner_id từ session
      const services = await getServicesByPartner(partnerId);
      const role = req.session.userType;

      res.render('providerViews/providerServices', { services,role });
    } catch (err) {
      console.error('Error rendering services:', err);
      res.status(500).send('Lỗi hiển thị dịch vụ');
    }
  };
  
  // Hiển thị form thêm dịch vụ
const renderAddServiceForm = (req, res) => {
    const role = req.session.userType;

    res.render('providerViews/addService',{role});
  };
  
  // Xử lý thêm dịch vụ
  const createService = async (req, res) => {
    try {
      const partnerId = req.session.partner_id; // Lấy partner_id từ session
      const { name, description } = req.body;
  
      if (!partnerId || !name || !description) {
        return res.status(400).send('Tên và mô tả là bắt buộc.');
      }
  
      await addService(partnerId, { name, description });
      res.redirect('/partner/services');
    } catch (error) {
      console.error('Error creating service:', error.message);
      res.status(500).send('Lỗi khi thêm dịch vụ.');
    }
  };
  
  // Hiển thị form chỉnh sửa dịch vụ
  const renderEditServiceForm = async (req, res) => {
    try {
      const service = await getServiceById(req.params.id);
      const role = req.session.userType;

      res.render('providerViews/editService', { service,role });
    } catch (err) {
      console.error('Error rendering edit service form:', err);
      res.status(500).send('Lỗi hiển thị form chỉnh sửa');
    }
  };
  
  // Xử lý cập nhật dịch vụ
  const updateService = async (req, res) => {
    try {
      const { name, description } = req.body;
      await updateServiceById(req.params.id, { name, description });
      res.redirect('/partner/services');
    } catch (err) {
      console.error('Error updating service:', err);
      res.status(500).send('Lỗi cập nhật dịch vụ');
    }
  };
  
  // Xóa dịch vụ
  const deleteService = async (req, res) => {
    try {
      await deleteServiceById(req.params.id);
      res.redirect('/partner/services');
    } catch (err) {
      console.error('Error deleting service:', err);
      res.status(500).send('Lỗi xóa dịch vụ');
    }
  };
  
  module.exports = {
    renderServices,
    renderAddServiceForm,
    createService,
    renderEditServiceForm,
    updateService,
    deleteService,
  };
  