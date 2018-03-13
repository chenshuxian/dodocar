import db from '../db';
/** 
 * 教練表
 */
module.exports = db.defineModel('teachers', {
   id: db.STRING(16),
   name: db.STRING(100),
   born: db.BIGINT(20)
});