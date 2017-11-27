// store user as database:
import model from '../model';
import fs from 'fs';
import path from 'path';


let Exam = model.Exams,
    Score = model.Score;

module.exports = {
    getExam: async () => {
        try {
            let exam = await Exam.findAll();
            console.log('exam: ' + JSON.stringify(exam));
            return JSON.stringify(exam);
        }
        catch (e) {
            console.log('there was an error');
            console.log(e);
        }
    },
    score: async () => {
        try {
            let score = await Exam.findAll(
                {
                    attributes: ['answer']
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
    createExam: async (url) => {
        let result = {
            sucess: true,
            message:'建檔成功'
        };
        try {
            fs.readFile(path.resolve(__dirname, url), async function(err, data){
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
            result.message = '建檔失敗';
        }

        return result;
    }
};
