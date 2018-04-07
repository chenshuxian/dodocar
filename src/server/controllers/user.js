import user from '../modules/user';
import { APIError } from '../rest';
import model from '../model';
import { uploadFile } from '../upload';
import path from 'path';
import auth from '../modules/auth';
import download from '../download';
import send from 'koa-send';
import fs from 'fs';



const User = model.Users;
const Teacher = model.Teachers;
const ExamDate = model.ExamDate;

//ExamDate.hasMany(User);
Teacher.hasMany(User);
User.belongsTo(Teacher);

async function getExamDate(seasonId) {
    var examDate =  await ExamDate.findAll({
        attributes: ['examDate'],
        where: {name: seasonId}
    });
    
    examDate = JSON.stringify(examDate);
    examDate = JSON.parse(examDate);
    examDate = (examDate[0].examDate).replace(/\//g,"");

    //console.log(examDate);
    return examDate;
}

function dateFormat(date) {
    var y = (date.getFullYear() - 1911);
    y = y < 100 ? "0"+y : y;
    var m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m; 
    var d = date.getDate();
    d = d < 10 ? "0" + d : d;
    var newDate = y+""+m+""+d;
    return newDate;
}

function dateTransfer(csvJson) {
    
        var carType = {
            1: "A",
            2: "M"
        };

        for(var i in csvJson) {
            if (csvJson[i].born !== null){
                var date = new Date(csvJson[i].born);
                csvJson[i].born= dateFormat(date);
                csvJson[i].source = "A";
                csvJson[i].carType = carType[csvJson[i].carType];
            }       
        }

        for(var i in csvJson) {
            if (csvJson[i].teacher.born !== null){
                var date = new Date(csvJson[i].teacher.born);
                csvJson[i].dataValues['tborn']= dateFormat(date);
                csvJson[i].dataValues['tId']= csvJson[i].teacher.id;
                delete csvJson[i].dataValues.teacher;
            } 
        }

    return csvJson;
}

function dateExamRoad(csvJson, examDate) {

            for(var i in csvJson) {
                //console.log(`i : ${i}`);
                var date = new Date(csvJson[i].born);
                var group = Math.ceil(i/25);
                group = group == 0 ? 1 : group;
                csvJson[i].born= dateFormat(date);
                csvJson[i].dataValues['group'] = "0" + group;
                csvJson[i].dataValues['examDate'] = examDate;
                csvJson[i].dataValues['gNum'] = parseInt(i)+1;
            }
    
        return csvJson;
    }

// [身分證字號10碼],[出生日期6~7碼],[姓名],[電話10碼],[學號7碼以下],[來源 1 碼],[手自排 1 碼],[教練身分證字號 10 碼],[教練生日 6~7 碼] 
async function start(seasonId) {
    var csvJson = await User.findAll({
        'include': [
            {
                'model': Teacher,
                'attributes' : ['id','born']
            }
        ],
        attributes: ['id','born','name','tel','stuNum','source','carType'],
        where: {seasonType: seasonId},
        order: ['stuNum']
    });

    csvJson = dateTransfer(csvJson);
    const fields = ['id','born','name','tel','stuNum','source','carType','tId','tborn'];
    const opts = {fields, header: false};
    const type = 'B';

    return {
        csvJson,
        opts,
        type
    };
}
//[身分證字號 10 碼],[出生日期 6~7 碼],[手自排 1 碼],[教練身分證字號 10 碼],[教練生日 6~7 碼]
async function finish(seasonId) {
    var csvJson = await User.findAll({
        'include': [
            {
                'model': Teacher,
                'attributes' : ['born','id']
            }
        ],
        attributes: ['id','born','carType'],
        where: {seasonType: seasonId},
        order: ['stuNum']
    });
    csvJson = dateTransfer(csvJson);
    const fields = ['id','born','carType','tborn','tId'];
    const opts = {fields, header: false};
    const type = 'C';

    return {
        csvJson,
        opts,
        type
    };
}
//[上課期別代碼 3~6 碼],[身分證字號 10 碼],[出生日期 6~7 碼],[組別],[筆試日期 6~7 碼],[組序號 1~3 碼(必為數字 1~999)] 
async function exam(seasonId) {
    var csvJson = await User.findAll({
        attributes: ['seasonType','id','born'],
        where: {seasonType: seasonId},
        order: ['stuNum']
    });

    var examDate = await getExamDate(seasonId);
    //console.log(examDate);
    csvJson = dateExamRoad(csvJson, examDate);
    const fields = ['seasonType','id','born','group','examDate','gNum'];
    const opts = {fields, header: false};
    const type = 'D';

    return {
        csvJson,
        opts,
        type
    };
}

//[上課期別代碼 3~6 碼][身分證字號 10 碼][出生日期 6~7 碼][組別][路考日期 6~7 碼][組序號 1~3 碼(必為數字 1~999)] [路考項目 1 碼 (1:只考道路考;2:場考+道路考;3:只考場考)] （使用逗號區隔）
async function road(seasonId) {
    var csvJson = await User.findAll({
        attributes: ['seasonType','id','born'],
        where: {seasonType: seasonId},
        order: ['stuNum']
    });

    var examDate = await getExamDate(seasonId);
    //console.log(examDate);

    for(var i in csvJson) {
        //console.log(`i : ${i}`);
        var date = new Date(csvJson[i].born);
        var group = Math.ceil(i/25);
        group = group == 0 ? 1 : group;
        csvJson[i].born= dateFormat(date);
        csvJson[i].dataValues['group'] = "0" + group;
        csvJson[i].dataValues['examDate'] = examDate;
        csvJson[i].dataValues['gNum'] = parseInt(i)+1;
        csvJson[i].dataValues['roadItem'] = 2;
    }
    
    const fields = ['seasonType','id','born','group','examDate','gNum','roadItem'];
    const opts = {fields, header: false};
    const type = 'E';

    return {
        csvJson,
        opts,
        type
    };
}

module.exports = {
    'GET /api/csv': async (ctx, next) => {
        //console.log('csv');

        const seasonId = ctx.request.query.seasonId;
        try {
            //开训名单
            var startObj = await start(seasonId);
            await download.csv(startObj,seasonId);
            //结训名单
            var finishObj = await finish(seasonId);
            await download.csv(finishObj,seasonId);
            //考试名单
            var examObj = await exam(seasonId);
            await download.csv(examObj,seasonId);
            //路考名单
            var roadObj = await road(seasonId);
            await download.csv(roadObj,seasonId);
            await download.zip(seasonId);

            ctx.rest({message:'建档完成'});

        }catch (e) {
            console.log('there was an error');
            console.log(e);
        }
       
    },

    'GET /api/csvDownload': async (ctx, next) => {
        //console.log('csv');

        const fileName = ctx.request.query.seasonId;
        const downloadPath = path.join(__dirname,'../static/download/');
        try {
            return ctx.body =  send(ctx, fileName + '.zip', { root: downloadPath });
        //     //开训名单
        //    let msg = await download.send(ctx, fileName);
        //    console.log(`msg : ${msg}`);
        //    ctx.rest(msg);
        //var fileName = req.params.fileName;
       

        }catch (e) {
            console.log('there was an error');
            console.log(e);
        }
       
    },
    
    // 新增使用者
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
                request = {
                    success : 'false',
                    message : '驗證失敗，使用者不存在' 
                }
                ctx.rest(request);
            }

        }
        catch (e) {
            console.log(e);
        }
        

    }
};
