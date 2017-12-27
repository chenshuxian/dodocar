import db from '../db';
/** 
 * 年度期別表 
 */
module.exports = db.defineModel('examDate', {
   season: db.STRING(50),
   startTime: db.BIGINT(20),
   stopTime: db.BIGINT(20),
   examTime: db.BIGINT(20)
});