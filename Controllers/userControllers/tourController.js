const { db } = require('../../Models/Connect_Server/db');

// Lấy danh sách các địa điểm
async function getLocations() {
    try {
        return await db.query('SELECT id, name FROM locations ORDER BY name');
    } catch (error) {
        console.error('Error fetching locations:', error);
        return [];
    }
}

// Middleware-like function để gắn locations vào res.locals
async function loadLocations(req, res, next) {
    try {
        const locations = await getLocations();
        res.locals.locations = locations;
        next();
    } catch (error) {
        console.error('Error loading locations:', error);
        res.locals.locations = [];
        next();
    }
}

// Tìm kiếm tour
async function searchTours(req, res) {
    const { query, location } = req.query;

    try {
        const sql = `
            SELECT t.id, t.title, t.description, t.price, t.image, l.name AS location_name
            FROM tours t
            LEFT JOIN tour_locations tl ON t.id = tl.tour_id
            LEFT JOIN locations l ON tl.location_id = l.id
            WHERE t.status = 'active'
            AND ($1::text IS NULL OR t.title ILIKE '%' || $1 || '%')
            AND ($2::text IS NULL OR l.name ILIKE '%' || $2 || '%')
        `;

        const tours = await db.query(sql, [query || null, location || null]);

        res.render('userViews/searchResults', {
            tours,
            query,
            location,
        });
    } catch (error) {
        console.error('Error searching tours:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getLocations,
    loadLocations,
    searchTours,
};
