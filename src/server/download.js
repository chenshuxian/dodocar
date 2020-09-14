import path from 'path';
import { Parser } from 'json2csv';
import fs from 'fs';
import send from 'koa-send';
import { setTimeout } from 'timers';
import json2xls from 'json2xls';
var EasyZip = require('easy-zip').EasyZip;

const downloadPath = path.join(__dirname, './static/download/');
const company = '/260002';

async function write(name, data, filePath, format) {
  fs.exists(filePath, function (exists) {
    //util.debug(exists ? "it's there" : "no file!");
    if (exists) {
      fs.writeFile(name, data, format, (err) => {
        if (err) throw err;
        console.log('file saved' + downloadPath);
      });
    } else {
      fs.mkdir(filePath, '0777', function (err) {
        if (err) throw err;
        fs.writeFile(name, data, format, (err) => {
          if (err) throw err;
          console.log('file saved' + downloadPath);
        });
      });
    }
  });
}

module.exports = {
  csv: async (obj, fileName) => {
    //const filePath = path.join(__dirname,`./static/download/`);
    if (obj.csvJson == '') {
      console.log('建档失敗檔案為空');
    } else {
      obj.opts.quote = '';
      const json2csvParser = new Parser(obj.opts);
      const JsonStr = JSON.stringify(obj.csvJson);
      const JsnoP = JSON.parse(JsonStr);
      const csv = await json2csvParser.parse(JsnoP);
      const filePath = downloadPath + fileName;
      let name = filePath + company + fileName + '_' + obj.type + '.csv';

      console.log(`filePath:${filePath}`);

      write(name, csv, filePath, 'utf8');

      // await fs.exists(filePath, function (exists) {
      //     //util.debug(exists ? "it's there" : "no file!");
      //     if (exists) {
      //         fs.writeFile(filePath + company + fileName + "_" + obj.type + ".csv", csv, 'utf8', (err) => {
      //             if (err) throw err;
      //             console.log('file saved' + downloadPath);
      //         });
      //     } else {
      //         fs.mkdir(filePath ,'0777', function (err) {
      //             if (err) throw err;
      //             fs.writeFile(filePath + company + fileName + "_" + obj.type + ".csv", csv, 'utf8', (err) => {
      //                 if (err) throw err;
      //                 console.log('file saved' + downloadPath);
      //             });
      //         });
      //     }
      // });
    }
  },
  xls: async (jsonFile, fileName) => {
    //console.log(`jsonFile ${JSON.stringify(jsonFile)}`);
    let xlsData = await json2xls(jsonFile);
    const filePath = downloadPath + fileName;
    let name = filePath + '/' + fileName + '.xlsx';
    await write(name, xlsData, filePath, 'binary');
  },
  zip: async (fileName) => {
    var zip = new EasyZip();
    const filePath = downloadPath + fileName + '.zip';
    //const cb = send(ctx, 'csv.zip', { root: downloadPath })();
    zip.zipFolder(downloadPath + fileName, async () => {
      zip.writeToFileSycn(filePath);
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
        ctx.rest({ message: fileName + '档案尚未建立，请先单击建立CSV' });
      }
    });
  },
};
