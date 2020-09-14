import db from '../db';
/** 車輛維護
車牌---英文與數字，但會有 - 號，如：ABC-1234
維修申請人---中英文
維修廠家---中英文
維修日期---西元年月日，如：20191018
維修設備---中英文
數量---數字
價格---數字
工資---數字
小計---數字
 */
module.exports = db.defineModel('mCarDetail', {
  car_id: db.STRING(100),
  teacher_id: db.STRING(50),
  fix_date: db.BIGINT(20),
  fix_store: db.STRING(50),
  device: db.STRING(40),
  num: db.BIGINT(10),
  price: db.BIGINT(10),
  salary: db.BIGINT(10),
  totalPrice: db.BIGINT(10),
});
