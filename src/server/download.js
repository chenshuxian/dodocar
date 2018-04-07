import path from 'path';
import { Parser } from 'json2csv';
import fs from 'fs';
import send from 'koa-send';
import { setTimeout } from 'timers';
var EasyZip = require('easy-zip').EasyZip;

const downloadPath = path.join(__dirname,'./static/download/');
const company = '/260002';

module.exports = {
    csv: async (obj, fileName) => {
        //const filePath = path.join(__dirname,`./static/download/`);
        obj.opts.quote = '';
        const json2csvParser = new Parser(obj.opts);
        const JsonStr = JSON.stringify(obj.csvJson);
        const JsnoP = JSON.parse(JsonStr);
        const csv = await json2csvParser.parse(JsnoP);
        const filePath = downloadPath + fileName;

        console.log(`filePath:${filePath}`);

        await fs.exists(filePath, function (exists) {
            //util.debug(exists ? "it's there" : "no file!");
            if (exists) {
                fs.writeFile(filePath + company + fileName + "_" + obj.type + ".csv", csv, 'utf8', (err) => {
                    if (err) throw err;
                    console.log('file saved' + downloadPath);
                });
            } else {
                fs.mkdir(filePath ,'0777', function (err) {
                    if (err) throw err;
                    fs.writeFile(filePath + company + fileName + "_" + obj.type + ".csv", csv, 'utf8', (err) => {
                        if (err) throw err;
                        console.log('file saved' + downloadPath);
                    });
                });
            }
          });

       
    },
    zip: async (fileName) => {
        var zip = new EasyZip();
        const filePath = downloadPath + fileName +'.zip';
        //const cb = send(ctx, 'csv.zip', { root: downloadPath })();
        zip.zipFolder(downloadPath + fileName, async () =>{
            await zip.writeToFileSycn(filePath);
        });
    },
    send: async (ctx, fileName) => {
        const filePath = downloadPath + fileName + '.zip';
        //send(ctx, fileName + '.zip', { root: downloadPath });
        console.log(`send : ${filePath}`);
        fs.exists(filePath, async (exists) => {
            if (exists) {
                console.log(`sendexists : ${filePath}`);
                return send(ctx, fileName + '.zip', { root: downloadPath });
                //return {message: '下载成功'};
                //ctx.rest();
            } else {
                ctx.rest({message: fileName + '档案尚未建立，请先单击建立CSV'});
            } 
        });
    }
}