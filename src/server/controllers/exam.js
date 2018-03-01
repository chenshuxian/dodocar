import user from '../modules/user';
import { APIError } from '../rest';
import model from '../model';
import fs from 'fs';
import path from 'path';
import exam from '../modules/exam';
import { uploadFile } from '../upload';

const Exam = model.Exams;

module.exports = {
    'GET /api/exam': async (ctx, next) => {
        try {
            fs.readFile(path.resolve(__dirname, '../static/sql/exam.json'), async function(err, data){
                var exam = JSON.parse(data);
                for(var i in exam){
                     await Exam.create({
                        examId: exam[i].examId,
                        question: exam[i].question,
                        choice: exam[i].choice,
                        answer: exam[i].answer,
                        img: exam[i].img
                    })
                }
            })
            console.log('create success');
        }
        catch (e) {
            console.log('there was an error');
            console.log(e);
        }
    },
    'GET /api/exams': async (ctx, next) => {
        
        // 取得資料庫試題
        var studId = ctx.request.query.studId;
        var examList = await exam.getExam(studId);

        ctx.rest({
            exam: examList
        });

    },
    'POST /api/exams': async (ctx, next) => {

        let result = { success: false }
        let serverFilePath = path.join(__dirname, '../static/')
    
        // 上传文件事件
        try{
            result = await uploadFile( ctx, {
                fileType: 'json',
                path: serverFilePath
            })

            result = await exam.createExam('../static/json/' + result.fileName);
        }catch(e) {
            console.log(e);
        }
        

        ctx.rest(result);

    },
    'GET /api/trainBook': async (ctx, next) => {
        exam.trainBook();
    },
    'DELETE /api/score/:id': async (ctx, next) => {
        console.log(`delete product ${ctx.params.id}...`);
        let result = exam.delScore(ctx.params.id);
        ctx.rest(result);
    },
    'POST /api/score': async (ctx, next) => {
        try {
            var ansC = ctx.request.body.ansC;
            var examId = ctx.request.body.examId;
	    var ansS = await exam.score(examId),
                props = {
                    userId: ctx.request.body.userId,
                    score: 0,
                    wrong: [],
                    examId: examId
                },
                answer = {},
                wrongAns = [];

            ansS = JSON.parse(ansS);

            //console.log("score:" + JSON.parse(ansS) + "c:" + ansC[0]);
            // 成績計算及錯題記錄
            for (var i in ansS) {
                console.log("score:" + ansS[i].answer + "c:" + ansC[i]);
                if (ansS[i].answer == ansC[i]) {
                    props.score++;
                } else {
                    // 記錄錯誤題目
		    let img = ansS[i].img ? ansS[i].img : 'static/images/yesno.png';
                    answer = {id: i, img:img, q: ansS[i].question, choice: ansS[i].choice, ansC: ansC[i] , ans:ansS[i].answer};
                    wrongAns.push(answer);
                    props.wrong.push(i);
                }
            }

            props.score = props.score * 2.5;
            
            console.log('wrongQ:' + props.wrong);
            await exam.record(props);

            ctx.rest({
                score: props.score,
                wrong: wrongAns
            })

        }
        catch (e) {
            console.log('there was an error');
            console.log(e);
        }
    },
};
