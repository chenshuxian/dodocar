// store user as database:
import model from '../model';
import fs from 'fs';
import path from 'path';

let User = model.Users;

module.exports = {
    getUser: async (name,pw) => {
        try {
            let user = await User.findOne({
                where: {name: name, passwd:pw}
            });
            //console.log('user: ' + JSON.stringify(user));
            return JSON.stringify(user);
        }
        catch (e) {
            console.log('there was an error');
            console.log(e);
        }
        
    },

    addUser: async (url) => {
        let result = {
            sucess: true,
            message:'建檔成功'
        };

        console.log('modules:'+ result.message);
        try {
            fs.readFile(path.resolve(__dirname, url), async function(err, data){
                var user = JSON.parse(data);
                for(var i in user){
                     await User.create({
                        email: user[i].email || '',
                        passwd: user[i].passwd,
                        name: user[i].name,
                        gender: false
                    })
                }
            })
            console.log('create success');
        }
        catch (e) {
            console.log('there was an error');
            console.log(e);
            result.message = '建檔失敗';
        }

        return result;
    } 
};
