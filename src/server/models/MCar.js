import db from '../db';
/** 車輛維護
車牌---英文與數字，但會有 - 號，如：ABC-1234
廠牌---中英文
引擎號碼---英文與數字連續，如：K11GLA43708
出廠年月---西元年月，如：200201
保險日期---西元年月日，如：20191018
排氣量---千位數，如：1275
顏色---中文字，如：白
牌照狀態---中文，如：本區新領、停駛轉繳銷、外區移入-過戶、
手/自排---中文，兩個選項：手排/自排
道駕車---中文，兩個選項：是/否
 */
module.exports = db.defineModel('mCar', {
   car_number: db.STRING(40),
   car_maker: db.STRING(40),
   engin_id: db.STRING(40),
   born_date: db.BIGINT(20),
   ins_date: db.BIGINT(20),
   cc: db.BIGINT(20),
   color: db.STRING(10),
   lic_status: db.STRING(100),
   hand_auto: db.STRING(40),
   road_car: db.BIGINT(10)
});