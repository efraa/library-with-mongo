const port = process.env.PORT || 2302;
const prefixRoutes = process.env.PREFIX_ROUTES || '/books';
const hostUrl = process.env.HOST_URL || '//localhost:27017/';
const dbName = process.env.DB_NAME || 'library';

const db = `mongodb:${hostUrl}${dbName}`;

module.exports = {
    db,
    port,
    prefixRoutes
}