import db from '../db';

module.exports = db.defineModel('users', {
    email: {
        type: db.STRING(100),
        allowNull: true
    },
    passwd: db.STRING(100),
    name: db.STRING(100),
    gender: db.BOOLEAN
});