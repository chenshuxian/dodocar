// store user as database:
import model from '../model';
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import { TRAINTIME } from '../../common/constants/exam';


let Exam = model.Exams,
    Score = model.Score,
    TB = model.TrainBook,
    ExamDate = model.ExamDate,
    Teacher = model.Teachers;

// 題庫資料轉換
// @params 題庫資料陣列 [{examId:1},{examId:2}...]
// return 轉轉後的列列 [1,2....]
var examAT = (ea) => {
    var arr = [];
    for (var x in ea) {
        arr.push(ea[x]['examId']);
        //console.log(area[x]['examId']);
    }

    return arr;
}

// 考題範圍，依考題取的 examId 分類
// @param 學員id
// return 考題範圍陣列
var examArea = async (readyEx) => {
    //var readyEx = await readyExam(studId)
    var area = await Exam.findAll({
        attributes: ['examId'],
        where:{
            examId: {$notIn: readyEx}
        },
        group: 'examId'
    }),
    arr;

    arr = examAT(area);
    return arr;
}

// 考生已考的考題題號，依考題取的 examId 分類
// @param 學號
// return 已考過之考題 [1,2...]
var readyExam = async (studId) => {
    var area = await Score.findAll({
        attributes: ['examId'],
        where: {
            studentId: studId
        },
        group: 'examId'
    }),
    arr;
    arr = examAT(area);
    if ( arr.length == 0 )
	arr = [1];

    console.log('readyExam:' + JSON.stringify(arr));
    if (arr.length == 0) 
        arr = [99];
    return arr;
}

//亂數取得這次考題
//若題庫只有一題，直接返回，不進行亂數
//@params 題庫
//return 題庫id
var curExamId = (examArr) => {
    var len = examArr.length,
        index = Math.floor((Math.random() * len));

    return examArr[index];
}

module.exports = {
    // 取得考題，examId從題庫中的examId進行亂數取得
    getExam: async (studId) => {
        var re = await readyExam(studId),
            ea = await examArea(re),
            examId = await curExamId(ea);

        try {
            let exam = await Exam.findAll({
                where:{
                    examId: examId
                },
                order: ['createdAt']
            });
            console.log('exam: ' + JSON.stringify(exam));
            return JSON.stringify(exam);
        }
        catch (e) {
            console.log('there was an error');
            console.log(e);
        }
    },
    score: async (eId) => {
        try {
            let score = await Exam.findAll(
                {
		    where:{
		    	examId: eId
		    },
		    order: ['createdAt']
                }
            );
            console.log('exam: ' + JSON.stringify(score));
            return JSON.stringify(score);
        }
        catch (e) {
            console.log('there was an error');
            console.log(e);
        }
    },
    delScore: async (id) => {
        let result = {
            sucess: true,
            message:'建檔成功'
        },
        studentId = 'test';

        if (id) {
            studentId = id;
        }
        
        try{
            await Score.destroy({
                where: {
                    studentId: studentId 
                }
            });

            return result;

        }catch (e) {
            console.log(e);
        }
    },
    record: async (props) => {
        try {
             await Score.create({
                studentId: props.userId,
                score: props.score,
                examId: props.examId,
                wrongQ: props.wrong.toString()
            });
        }
        catch (e) {
            console.log('there was an error');
            console.log(e);
        }
    },
    trainBook: async (props) => {
        let teacher = await Teacher.findAll({
            attributes: ['id']
        });
        let exam = await ExamDate.findAll({
            attributes: ['name']
        });
        let year = new Date().getFullYear();
        let i = 0;

        console.log(JSON.stringify(teacher));
        console.log(JSON.stringify(exam));

        for (var id in teacher) {
            console.log(teacher[id]['id']);
            for (var name in exam) {
                for (var k in TRAINTIME) {
                    i++;
                    console.log(`tId:${teacher[id]['id']},eId:${exam[name]['name']},i:${i}`);
                    TB.create({
                        id:`TB${year}${i}`,
                        trainTimeId: k,
                        examDateId: exam[name]['name'],
                        studentId: '',
                        teacherId: teacher[id]['id']
                    });
                }
            }
        }
    },
    createExam: async (url) => {
        let result = {
            sucess: true,
            message:'建檔成功'
        };
        try {
            fs.readFile(path.resolve(__dirname, url), async function(err, data){
                var exam = JSON.parse(data);
                //console.log('examID:' + exam[1].examId);
                var examId = exam[1].examId;
                //let success;
                // 若題庫存在，就先殺除
                await Exam.destroy({
                    where: {
                        examId: examId
                    }
                });

                for(var i in exam){
                    try {
                        await Exam.create({
                            examId: exam[i].examId,
                            question: exam[i].question,
                            choice: exam[i].choice,
                            answer: exam[i].answer,
                            img: exam[i].img
                        })
                    }catch (e) {
                        console.log(e);
                        console.log('fails');
                    }
                     
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
