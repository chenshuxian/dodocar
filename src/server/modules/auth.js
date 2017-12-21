// store user as database:
import jwt from 'jsonwebtoken';
import config from '../config';


module.exports = {
    sign: async (payload,opts) => {
        try {
            let token = await jwt.sign(payload, config.secret, opts);
            console.log('token: ' + token);
            return token;
        }
        catch (e) {
            console.log('there was an error');
            console.log(e);
        }
        
    },

    verify: async (token) => {
        try {
            var decoded = await jwt.verify(token, config.secret);
            return decoded;
          } catch(err) {
            // err
            console.log("token err:" + err);
          }
    } 
};
