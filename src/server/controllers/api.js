//const products = require('../products');
const APIError = require('../rest').APIError;
import {browserHistory} from 'react-router';
import user from '../modules/user';
import { read } from 'fs';

module.exports = {

    'GET /api/notice': async (ctx, next) => {
        ctx.rest({
            page: 'noitce'
        });
    },

    'GET /api/init': async (ctx, next) => {
        
        console.log('/api/init');
        try {
            var result = await user.allDgInit()
        } catch (e) {
            console.log(e);
        }    
        
        ctx.rest({data:result});
        
    },

    'GET /api/trainTime': async (ctx, next) => {
        
        let tId = ctx.request.query.tId,
            eId = ctx.request.query.eId,
            sId = ctx.request.query.sId;

            console.log("tid1"+ tId + " eID1" + eId);
        try {
            var result = await user.trainTime(tId, eId, sId);
        } catch (e) {
            console.log(e);
        }    
        
        ctx.rest({data:result});
        
    },

    'DELETE /api/products/:id': async (ctx, next) => {
        console.log(`delete product ${ctx.params.id}...`);
        var p = products.deleteProduct(ctx.params.id);
        if (p) {
            ctx.rest(p);
        } else {
            throw new APIError('product:not_found', 'product not found by id.');
        }
    }
};
