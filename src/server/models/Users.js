import db from '../db';

module.exports = db.defineModel('users', {
    email: {
        type: db.STRING(100),
        allowNull: true
    },
    passwd: db.STRING(100),
    name: db.STRING(100),
    gender: db.BOOLEAN,
    born: db.BIGINT(20),
    addr: db.STRING(255),
    tel: db.BIGINT(16),
    mobile: db.BIGINT(16),
    source: db.STRING(16),
    carType: db.BIGINT(8),
    trainScore: db.BIGINT(4),
    examScore: db.BIGINT(4),
    roadScore: db.BIGINT(4),
    memo: db.STRING(255),
    trainId: db.STRING(50)
});