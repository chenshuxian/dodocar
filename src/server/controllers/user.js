import user from '../modules/user';
import { APIError } from '../rest';
import model from '../model';
import { uploadFile } from '../upload';
import path from 'path';
import auth from '../modules/auth';

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
    

    'POST /api/singleUser': async (ctx, next) => {
        var formData = ctx.request.body.data;
        //console.log('singleUser:' + formData.id);
        var result = await user.addSingleUser(formData);
        //console.log('result:' + result);

        ctx.rest(result);

    },

    'PUT /api/singleUser': async (ctx, next) => {
        var formData = ctx.request.body.data;
        //console.log('singleUser:' + formData.id);
        var result = await user.updateSingleUser(formData);
        //console.log('result:' + result);

        ctx.rest(result);

    },

    'POST /api/user': async (ctx, next) => {

        let result = { success: false };
        let serverFilePath = path.join(__dirname, '../static/');
    
        // 上传文件事件
        try{
            let file = await uploadFile( ctx, {
                fileType: 'json',
                path: serverFilePath
            })

            result = await user.addUser('../static/json/' + file.fileName);
            console.log('result:' + result);
        }catch(e) {
            console.log(e);
        }   

        ctx.rest(result);
    },


    'POST /api/login': async (ctx, next) => {
        try{
            var 
            account = ctx.request.body.userId,
            password = ctx.request.body.exPwd;
            
            console.log('account:' + account + ', ' + password);
            
            var p =  await user.getUser(account);
            var userJson = JSON.parse(p);
            
            if (p) {
                //console.log(userJson.passwd + '' + password  + '=' + p.passwd == password);
                if (userJson.passwd == password){
                    var 
                        payload = { user: userJson.name },
                        opts = { expiresIn: '1h' },
                        token = await auth.sign(payload, opts),
                        request = {
                            success: true,
                            userId: userJson.id,
                            token: token
                        };
                } else {
                        request = {
                            success : 'false',
                            message : '使用者密碼錯誤' 
                        }

                }
                
                ctx.rest(request);
            } else {
                ctx.rest({success: 'false', message: '驗證失敗，使用者不存在'});
            }

        }
        catch (e) {
            console.log(e);
        }
        

    }
};
