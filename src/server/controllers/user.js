import user from '../modules/user';
import { APIError } from '../rest';
import model from '../model';

const User = model.Users;

module.exports = {
    'GET /api/setup': async (ctx, next) => {
        try {
            let user = await User.create({
                email: 'Admin@gmail.com',
                passwd: '1234',
                name: 'Admin',
                gender: false
            });
            console.log('create success');
        }
        catch (e) {
            console.log('there was an error');
            console.log(e);
        }
    },

    'POST /api/login':  async (ctx, next) => {
        try{
            var 
            account = ctx.request.body.userNum,
            password = ctx.request.body.exPwd;
            
            console.log('account:' + account + ', ' + password);
            
            var p =  await user.getUser(account, password);
            var userJson = JSON.parse(p);
            
            if(p) {
                ctx.rest({
                    success: true,
                    userId: userJson.id
                });
            }else {
                ctx.rest({success: false});
            }

        }
        catch (e) {
            console.log(e);
        }
        

    }
};
