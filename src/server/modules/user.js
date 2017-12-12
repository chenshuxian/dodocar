// store user as database:
import model from '../model';
import {promisify} from 'util';
import fs from 'fs';
import path from 'path';

let User = model.Users;

var haveUser = async (name) => {

    let check = false;
    try {
        let user = await User.findOne({
            where: {name: name}
        });

        if (user) 
            check = !check;

            console.log('user:'+ user + 'check:' +check);
        
        return check;
    }
    catch (e) {
        console.log('there was an error');
        console.log(e);
    }
}

var addUser = async (user) => {
    var result;
        for(var i in user){
            if( await haveUser(user[i].name)){
                console.log('haveUser');
                result = {
                    success: false,
                    message: `${user[i].name}使用者已存在，請重新命名`
                }
                break;
            }else{
                await User.create({
                    email: user[i].email || '',
                    passwd: user[i].passwd,
                    name: user[i].name,
                    gender: false
                })
            }  
        }

        console.log('result' + result.message);
        return result;
    }

var userReturn = () => {
    let result = {
        success: true,
        message: 'create success'
    };
    console.log('userReturn ' +result);
    return result;
}

module.exports = {
    getUser: async (name) => {
        try {
            let user = await User.findOne({
                where: {name: name}
            });
            console.log('user: ' + JSON.stringify(user));
            return JSON.stringify(user);
        }
        catch (e) {
            console.log('there was an error');
            console.log(e);
        }
        
    },

    addUser: async (url) => {

        var fsAsync = promisify(fs.readFile);
        var data = await fsAsync(path.resolve(__dirname, url));
        //console.log('fsA:' + data);
        data = JSON.parse(data);
        var result = await addUser(data);
        return result;
       
    } 
};
