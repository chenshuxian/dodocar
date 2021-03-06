// store user as database:
import model from '../model';
import {promisify} from 'util';
import fs from 'fs';
import path from 'path';
import { getTeacher } from '../../common/actions/index';
import { TRAINBOOK } from '../../common/constants/exam';
//const Sequelize = require('sequelize');

let User = model.Users;
let Teacher = model.Teachers;
let TB = model.TrainBook;
let TrainTime = model.TrainTime;
let TypeClass = model.ExamDate;

var getTTID = (user) => {
    return user.seasonType == '99999A' ? '1' : user.trainTimeId;
}

var userCreate = async (user) => {
    user.trainTimeId = getTTID(user);
    user.payDate = user.payDate != undefined ? user.payDate : new Date();
        console.log(`userPayDate: ${user.payDate}`);
        console.log(`trainTimeId: ${user.trainTimeId}`);
    try{ 
        return await User.create({
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
            teacherId: user.teacherId,
            classType: user.classType,
            seasonType: user.seasonType,
            yearType: user.yearType,
            payment: user.payment,
            payDate: new Date(user.payDate).getTime(),
            trainId: '000'
        });
    } catch(e) {
        console.log(e);
    }
   
}

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
                await userCreate(user);
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
    var teacherId = tId ? tId : TRAINBOOK.initTeacher,
        examId = eId ? eId : TRAINBOOK.initExam ;
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
            if(user)
                return JSON.stringify(user);
            else
                return false;
        }
        catch (e) {
            console.log('there was an error');
            console.log(e);
        }
        
    },

    allDgInit: async () => {
        
        let dgData = await User.findAll({order:['stuNum']});
        let teacher = await Teacher.findAll({attributes: ['name','id']});
        let typeClass = await TypeClass.findAll(
            {
                attributes: {exclude:['createdAt', 'updatedAt', 'version']},
                order: ['createdAt']
            });
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
    delete: async (ids) => {
        try{
            let result = await User.destroy({
                where:{id:ids}
            });
            await TB.update(
                { studentId: '' },
                { 
                    where: { 
                       studentId: ids
                    }
                } /* where criteria */
              );
        }catch(e){
            console.log(e);
        }
    },

    addSingleUser: async (user) => {
        console.log(user.id);
        try{
             var result = await userCreate(user);
        }catch(e){
            console.log(e);
        }
       
        console.log("result:" + result);

        if(result && user.seasonType !== '99999A') {
            // 修改 trainBook 
            let tbUpdate = await TB.update(
                { studentId: user.id },
                { 
                    where: { 
                        examDateId: user.seasonType,
                        teacherId: user.teacherId,
                        trainTimeId: user.trainTimeId
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

        user.trainTimeId = getTTID(user);
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
                teacherId: user.teacherId,
                classType: user.classType,
                seasonType: user.seasonType,
                yearType: user.yearType,
                payment: user.payment,
                payDate: new Date(user.payDate).getTime(),
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

        if(result  && user.seasonType !== '99999A') {
            // 刪除 舊的book
            await TB.update(
                {studentId: ''},
                {
                    where: {
                        studentId: user.id
                    }
                }
            )
            // 修改 trainBook 
            let tbUpdate = await TB.update(
                { studentId: user.id },
                { 
                    where: { 
                        examDateId: user.seasonType,
                        teacherId: user.teacherId,
                        trainTimeId: user.trainTimeId
                    }
                } /* where criteria */
              );

              console.log("TBUPDATE:" + JSON.stringify(tbUpdate));
            if(tbUpdate){
                return {'success': true}
            }  
            
        }else {
            return {'success': true}
        }
    },

    getTeachers: () => {
        let result = Teacher.findAll();
        return JSON.stringify(result);
    }
};
