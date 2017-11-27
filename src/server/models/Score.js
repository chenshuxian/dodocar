import db from '../db';
/** 
 * userId: 考生ID
 * score: 考試程績
 * failQ: 答錯的題號
 * examNum: 題庫號碼
 */
module.exports = db.defineModel('score', {
    studentId: db.STRING(50),
    score: db.STRING(10),
    examId: db.STRING(10),
    wrongQ: db.STRING(200)
});