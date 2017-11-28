import user from '../modules/user';
import { APIError } from '../rest';
import model from '../model';
import { uploadFile } from '../upload';
import path from 'path';

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

    'POST /api/user': async (ctx, next) => {

        let result = { success: false };
        let serverFilePath = path.join(__dirname, '../static/');

        // //console.log('modules:post');
    
        // 上传文件事件
        try{
            result = await uploadFile( ctx, {
                fileType: 'json',
                path: serverFilePath
            })

            result = await user.addUser('../static/json/' + result.fileName);
        }catch(e) {
            console.log(e);
        }   

        ctx.rest(result);
    },


    'POST /api/login': async (ctx, next) => {
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
