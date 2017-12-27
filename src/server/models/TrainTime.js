import db from '../db';
/** 
 * 訓練時間表
 */
module.exports = db.defineModel('trainTime', {
   time: db.STRING(50)
});