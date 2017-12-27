import db from '../db';
/** 
 * 訓練預約表
 */
module.exports = db.defineModel('trainBook', {
   trainTimeId: db.BIGINT(4),
   examDateId: db.STRING(50),
   studentId: db.STRING(50)
});