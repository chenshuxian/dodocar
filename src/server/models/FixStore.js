import db from '../db';
/**
 * 修車廠表
 */
module.exports = db.defineModel('fixStore', {
  id: db.STRING(50),
  name: db.STRING(50),
});
