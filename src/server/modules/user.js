// store user as database:
import model from '../model';

let User = model.Users;

module.exports = {
    getUser: async (name,pw) => {
        try {
            let user = await User.findOne({
                where: {name: name, passwd:pw}
            });
            //console.log('user: ' + JSON.stringify(user));
            return JSON.stringify(user);
        }
        catch (e) {
            console.log('there was an error');
            console.log(e);
        }
        
    },

    getProduct: (id) => {
        var i;
        for (i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                return products[i];
            }
        }
        return null;
    },

    createProduct: (name, manufacturer, price) => {
        var p = new Product(name, manufacturer, price);
        products.push(p);
        return p;
    },

    deleteProduct: (id) => {
        var
            index = -1,
            i;
        for (i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            // remove products[index]:
            return products.splice(index, 1)[0];
        }
        return null;
    }
};
