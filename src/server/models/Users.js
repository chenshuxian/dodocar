import db from '../db';

module.exports = db.defineModel('users', {
    stuNum: db.STRING(16),
    passwd: db.STRING(100),
    name: db.STRING(100),
    gender: db.BIGINT(16),
    born: db.BIGINT(20),
    addr: {allowNull: true, type:db.STRING(255)},
    tel: {allowNull: true, type:db.BIGINT(16)},
    mobile: {allowNull: true, type:db.BIGINT(16)},
    source: db.STRING(16),
    carType: db.BIGINT(8),
    trainScore: {allowNull: true, type:db.BIGINT(4)},
    examScore: {allowNull: true, type:db.BIGINT(4)},
    roadScore: {allowNull: true, type:db.BIGINT(4)},
    memo: {allowNull: true, type: db.STRING(255)},
    trainId: db.STRING(50),
    trainTimeId: db.STRING(16),
    teacher: db.STRING(16),
    classType: db.STRING(16),
    addrNum: {allowNull: true, type:db.STRING(16)},
    payment: {allowNull: true, type: db.BIGINT(20)},
    payDate: {allowNull: true, type: db.BIGINT(20)}
});