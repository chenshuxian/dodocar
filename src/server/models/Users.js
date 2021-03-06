import db from '../db';
import examDate from './ExamDate';

var dbx = db.defineModel('users', {
    stuNum: db.STRING(16),
    passwd: db.STRING(100),
    name: db.STRING(100),
    gender: db.BIGINT(16),
    born: db.BIGINT(20),
    addr: {allowNull: true, type:db.STRING(255)},
    tel: {allowNull: true, type:db.STRING(20)},
    mobile: {allowNull: true, type:db.STRING(20)},
    source: db.STRING(16),
    carType: db.BIGINT(8),
    trainScore: {allowNull: true, type:db.BIGINT(4)},
    examScore: {allowNull: true, type:db.BIGINT(4)},
    roadScore: {allowNull: true, type:db.BIGINT(4)},
    memo: {allowNull: true, type: db.STRING(255)},
    trainId: db.STRING(50),
    trainTimeId: db.STRING(16),
    teacherId: db.STRING(16),
    classType: db.STRING(16),
    addrNum: {allowNull: true, type: db.STRING(16)},
    payment: {allowNull: true, type: db.BIGINT(20)},
    payDate: {allowNull: true, type: db.BIGINT(20)},
    seasonType: db.STRING(15),
    yearType: db.BIGINT(20)
});

dbx.hasOne(examDate,{foreignKey: 'name'});

module.exports = dbx;