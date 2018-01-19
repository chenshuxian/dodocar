// store user as database:
import model from '../model';
import {promisify} from 'util';
import fs from 'fs';
import path from 'path';
import { getTeacher } from '../../common/actions/index';
//const Sequelize = require('sequelize');

let User = model.Users;
let Teacher = model.Teachers;
let TB = model.TrainBook;
let TrainTime = model.TrainTime;
let TypeClass = model.ExamDate;


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

var getTrainBook = async (tId, eId, sId) => {
    var teacherId = tId ? tId : 'T001',
        examId = eId ? eId : 'ED001' ;
        sId = sId !== "" ? sId : '';
    
    let tb = await TB.findAll({
        where: {
            teacherId: teacherId,
            examDateId: examId,
            studentId: { $or: [sId, ''] }
        },
        attributes: ['trainTimeId','id']
    });

    return tb;

}

// 陣列轉換
var arrTrans = (arr) => {

    let newArr = arr.map(function(name, i) {
        return arr[i].trainTimeId;
    });

    return newArr;
}

//取得訓練時間 select option
var getTrainTime = async (tId, eId, sId) => {

    let tb = await getTrainBook(tId, eId, sId);
    let id = await arrTrans(tb);
    let tt = await TrainTime.findAll({
        where:{
            id: id
        },
        attributes: ["id", ["time", "name"]]
    });

    return tt;
}

module.exports = {
    getUser: async (id) => {
        try {
            let user = await User.findOne({
                where: {id: id}
            });
            console.log('user: ' + JSON.stringify(user));
            return JSON.stringify(user);
        }
        catch (e) {
            console.log('there was an error');
            console.log(e);
        }
        
    },

    allDgInit: async () => {
        
        let dgData =  await User.findAll();
        let teacher = await Teacher.findAll({attributes: ['name','id']});
        let typeClass = await TypeClass.findAll({attributes: {exclude:['createdAt', 'updatedAt', 'version']}});
        let tt = await getTrainTime();

        let data = {
            dgData: JSON.stringify(dgData),
            teacher: JSON.stringify(teacher),
            typeClass: JSON.stringify(typeClass),
            trainTime: JSON.stringify(tt)
        };
        return JSON.stringify(data);
               
    },

    trainTime: async (tId, eId, sId) => {

        console.log(`tId ${tId} eId ${eId} sid ${sId}`);
        let tt = await getTrainTime(tId, eId, sId);
        return JSON.stringify(tt);
    },

    addUser: async (url) => {

        var fsAsync = promisify(fs.readFile);
        var data = await fsAsync(path.resolve(__dirname, url));
        //console.log('fsA:' + data);
        data = JSON.parse(data);
        var result = await addUser(data);
        return result;
       
    },

    addSingleUser: async (user) => {
        console.log(user.id);
        try{
             var result = await User.create({
            id: user.id,
            passwd: user.passwd,
            stuNum: user.stuNum,
            name: user.name,
            gender: user.gender,
            born: new Date(user.born).getTime(),
            addrNum: user.addrNum,
            addr: user.addr,
            tel: user.tel,
            mobile: user.mobile,
            source: user.source,
            carType: user.carType,
            trainScore: user.trainScore,
            examScore: user.examScore,
            roadScore: user.roadScore,
            memo: user.memo,
            trainTimeId: user.trainTimeId,
            teacher: user.teacher,
            classType: user.classType,
            trainId: '000'
        });

        }catch(e){
            console.log(e);
        }
       

        console.log("result:" + result);

        if(result) {
            // 修改 trainBook 
            let tbUpdate = await TB.update(
                { studentId: user.id },
                { 
                    where: { 
                        examDateId: user.classType,
                        teacherId: user.teacher,
                        trainTimeId: user.trainBook
                    }
                } /* where criteria */
              );

              console.log("TBUPDATE:" + JSON.stringify(tbUpdate));
            if(tbUpdate){
                return {'success': true}
            }
           
            
        }
    },

    updateSingleUser: async (user) => {

        try{
             var result = await User.update({
                passwd: user.passwd,
                stuNum: user.stuNum,
                name: user.name,
                gender: user.gender,
                born: new Date(user.born).getTime(),
                addrNum: user.addrNum,
                addr: user.addr,
                tel: user.tel,
                mobile: user.mobile,
                source: user.source,
                carType: user.carType,
                trainScore: user.trainScore,
                examScore: user.examScore,
                roadScore: user.roadScore,
                memo: user.memo,
                trainTimeId: user.trainTimeId,
                teacher: user.teacher,
                classType: user.classType,
                trainId: '000'
            },
            {
                where: {id: user.id}
            }
            );

        }catch(e){
            console.log(e);
        }
       

        console.log("result:" + result);

        if(result) {
            // 刪除 舊的book
            await TB.update(
                {studentId: ''},
                {
                    where: {
                        studentId: user.Id
                    }
                }
            )
            // 修改 trainBook 
            let tbUpdate = await TB.update(
                { studentId: user.id },
                { 
                    where: { 
                        examDateId: user.classType,
                        teacherId: user.teacher,
                        trainTimeId: user.trainBook
                    }
                } /* where criteria */
              );

              console.log("TBUPDATE:" + JSON.stringify(tbUpdate));
            if(tbUpdate){
                return {'success': true}
            }
           
            
        }
    },

    getTeachers: () => {
        let result = Teacher.findAll();
        return JSON.stringify(result);
    }
};
