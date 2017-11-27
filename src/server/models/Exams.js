import db from '../db';
/** 
 * examNum: 題庫號碼
 * question: 問題
 * choice: 答案選項
 * answer: 答案
 * type: 考題類型: 1: 是非，2:選擇
 */
module.exports = db.defineModel('exam', {
    examId: db.STRING(10),
    question: db.STRING(200),
    choice: {
        allowNull: true,
        type: db.STRING(200)
    },
    answer: db.STRING(50),
    img: db.STRING(200)
});