import model from '../model';
import fs from 'fs';
import path from 'path';
import mcar from '../modules/mcar';
import { uploadFile } from '../upload';

module.exports = {
  'POST /api/car': async (ctx, next) => {
    var formData = ctx.request.body.data;
    console.log('singleCar:' + formData);
    var result = await mcar.addSingleCar(formData);
    //console.log('result:' + result);

    ctx.rest(result);
  },
  'PUT /api/car': async (ctx, next) => {
    var formData = ctx.request.body.data;
    //console.log('singleUser:' + formData.id);
    var result = await mcar.updateSingleCar(formData);
    //console.log('result:' + result);

    ctx.rest(result);
  },
  'DELETE /api/car': async (ctx, next) => {
    console.log(`delete product ${ctx.request.body.rows}...`);
    let ids = ctx.request.body.rows;
    await mcar.delete(ids);
    ctx.rest({ success: true });
  },
  'GET /api/car': async (ctx, next) => {
    console.log('/api/car');
    try {
      var result = await mcar.dataStore();
    } catch (e) {
      console.log(e);
    }

    ctx.rest({ data: result });
  },
  'POST /api/detail': async (ctx, next) => {
    var formData = ctx.request.body.data;
    console.log('PostDetailCar:' + formData);
    var result = await mcar.addDetailCar(formData);
    console.log('result:' + result);

    ctx.rest(result);
  },
  'PUT /api/detail': async (ctx, next) => {
    var formData = ctx.request.body.data;
    //console.log('singleUser:' + formData.id);
    var result = await mcar.updateDetailCar(formData);
    //console.log('result:' + result);

    ctx.rest(result);
  },
  'DELETE /api/detail': async (ctx, next) => {
    console.log(`delete detail ${ctx.request.body.rows}...`);
    let ids = ctx.request.body.rows;
    await mcar.deleteDetail(ids);
    ctx.rest({ success: true });
  },
  'GET /api/detail': async (ctx, next) => {
    var carId = ctx.request.query.id;
    var year = ctx.request.query.year;
    var month = ctx.request.query.month;

    console.log(`/api/Detail ${carId} y: ${year} m: ${month}`);
    try {
      var result = await mcar.dataStoreDetail(carId, year, month);
    } catch (e) {
      console.log(e);
    }

    ctx.rest({ data: result });
  },
};
