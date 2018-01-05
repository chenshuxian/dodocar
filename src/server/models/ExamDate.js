import db from '../db';
/** 
 * 年度期別表 
 */
module.exports = db.defineModel('examDate', {
   season: db.STRING(50),
   name: db.STRING(50),
   startDate: db.STRING(50),
   finishDate: db.STRING(50),
   examDate: db.STRING(50)
});