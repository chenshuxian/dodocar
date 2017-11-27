//const products = require('../products');
const APIError = require('../rest').APIError;
import {browserHistory} from 'react-router';
import model from '../model';


module.exports = {

    'GET /api/notice': async (ctx, next) => {
        ctx.rest({
            page: 'noitce'
        });
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
