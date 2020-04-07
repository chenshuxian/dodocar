// store user as database:
import model from '../model';
//const Sequelize = require('sequelize');

let MCar = model.MCar;

var carCreate = async (user) => {
  
    try{ 
        return await MCar.create({
            id: user.id,
            car_number: user.car_number,
            car_maker: user.car_maker,
            engin_id: user.engin_id,
            born_date: new Date(user.born_date).getTime(),
            ins_date: new Date(user.ins_date).getTime(),
            cc: user.cc,
            color: user.color,
            lic_status: user.lic_status,
            hand_auto: user.hand_auto,
            road_car: user.road_car
        });
    } catch(e) {
        console.log(e);
    }
   
}


module.exports = {
  

    delete: async (ids) => {
        try{
            let result = await MCar.destroy({
                where:{id:ids}
            });
        }catch(e){
            console.log(e);
        }
    },

    dataStore: async () => {
        
        let dgData = await MCar.findAll();

        let data = {
            dgData: JSON.stringify(dgData),
        };
        return JSON.stringify(data);
               
    },

    addSingleCar: async (user) => {
        console.log(user.id);
        try{
             var result = await carCreate(user);
        }catch(e){
            console.log(e);
        }
       
        console.log("result:" + result);
            
    },

    updateSingleCar: async (user) => {

        try{
             var result = await MCar.update({
                car_number: user.car_number,
                car_maker: user.car_maker,
                engin_id: user.engin_id,
                born_date: new Date(user.born_date).getTime(),
                ins_date: new Date(user.ins_date).getTime(),
                cc: user.cc,
                color: user.color,
                lic_status: user.lic_status,
                hand_auto: user.hand_auto,
                road_car: user.road_car
            },
            {
                where: {id: user.id}
            }
            );

        }catch(e){
            console.log(e);
        }
        console.log("result:" + result);
        return {'success': true}

    }
};
