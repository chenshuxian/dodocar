// store user as database:
import model from '../model';
//import JSON2CSVAsyncParser from 'json2csv/JSON2CSVAsyncParser';

let MCar = model.MCar;
let Teacher = model.Teachers;
let MCarDetail = model.MCarDetail;
let FixStore = model.FixStore;

var carCreate = async (user) => {
  try {
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
      road_car: user.road_car,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  delete: async (ids) => {
    try {
      let result = await MCar.destroy({
        where: { id: ids },
      });
    } catch (e) {
      console.log(e);
    }
  },
  deleteDetail: async (ids) => {
    try {
      let result = await MCarDetail.destroy({
        where: { id: ids },
      });
    } catch (e) {
      console.log(e);
    }
  },

  dataStore: async () => {
    let dgData = await MCar.findAll();
    let teacher = await Teacher.findAll({ attributes: ['name', 'id'] });
    let fixStore = await FixStore.findAll({ attributes: ['name', 'id'] });

    [...new Set(dgData)];

    let carNum = [];
    dgData.forEach(function (item, index, array) {
      carNum.push({ id: item.id, name: item.car_number });
    });

    let data = {
      dgData: JSON.stringify(dgData),
      teacher: JSON.stringify(teacher),
      car: JSON.stringify(carNum),
      fixStore: JSON.stringify(fixStore),
    };
    return JSON.stringify(data);
  },

  dataStoreDetail: async (carId) => {
    let dgData = await MCarDetail.findAll({ where: { car_id: carId } });

    let data = {
      dgData: JSON.stringify(dgData),
    };
    return JSON.stringify(data);
  },

  addSingleCar: async (user) => {
    console.log(user.id);
    try {
      var result = await carCreate(user);
    } catch (e) {
      console.log(e);
    }

    console.log('result:' + result);
    return JSON.stringify(result);
  },

  addDetailCar: async (car) => {
    console.log(`DetailAdd-mcar: ${car.id}`);
    try {
      var result = MCarDetail.create({
        car_id: car.car_id,
        teacher_id: car.teacher_id,
        fix_date: new Date(car.fix_date).getTime(),
        fix_store: car.fix_store,
        device: car.device,
        num: car.num,
        price: car.price,
        salary: car.salary,
        totalPrice: car.totalPrice,
      });
    } catch (e) {
      console.log(e);
    }

    console.log('result:' + result);
    return JSON.stringify(result);
  },

  updateSingleCar: async (user) => {
    try {
      var result = await MCar.update(
        {
          car_number: user.car_number,
          car_maker: user.car_maker,
          engin_id: user.engin_id,
          born_date: new Date(user.born_date).getTime(),
          ins_date: new Date(user.ins_date).getTime(),
          cc: user.cc,
          color: user.color,
          lic_status: user.lic_status,
          hand_auto: user.hand_auto,
          road_car: user.road_car,
        },
        {
          where: { id: user.id },
        }
      );
    } catch (e) {
      console.log(e);
    }
    console.log('result:' + result);
    return { success: true };
  },
  updateDetailCar: async (car) => {
    console.log(`DetailUpdate-mcar: ${car.detailId}`);
    try {
      var result = await MCarDetail.update(
        {
          car_id: car.car_id,
          teacher_id: car.teacher_id,
          fix_date: new Date(car.fix_date).getTime(),
          fix_store: car.fix_store,
          device: car.device,
          num: car.num,
          price: car.price,
          salary: car.salary,
          totalPrice: car.totalPrice,
        },
        {
          where: { id: car.detailId },
        }
      );
    } catch (e) {
      console.log(e);
    }

    console.log('result:' + result);
    if (result) {
      return { success: true };
    }
    return { success: false };
  },
};
