const models = require("../Models");
const { DataTypes } = require("sequelize");

const Reg = models.define("Reg", {
  contactName: DataTypes.TEXT,
  contactEmail: DataTypes.TEXT,
  designation: DataTypes.TEXT,
  companyName: DataTypes.TEXT,
  password: DataTypes.TEXT,
  companyWebsite: DataTypes.TEXT,
  contactNumber: DataTypes.INTEGER,
  permitted: DataTypes.BOOLEAN,
});

const INF = models.define("Inf", {
  companyID : DataTypes.INTEGER,
  companyName: DataTypes.TEXT,
  companyWebsite: DataTypes.TEXT,
  companyType : DataTypes.TEXT,
  submitted: DataTypes.BOOLEAN,
  approved: DataTypes.BOOLEAN
});

const insertReg = async (data) => {
  await Reg.sync();
  const reg = await Reg.create(data);
  console.log(reg.id);  
  const dummyINF = { "companyID": reg.id, "submitted": false, "approved": false};
  await INF.sync();
  await INF.create(dummyINF);
  console.log("Registration complete");
};

const selectRegs = async () => {
  const fields = [
    "contactName",
    "contactEmail",
    "designation",
    "companyName",
    "companyWebsite",
    "contactNumber",
    "permitted",
    "id"
  ];
  return Reg.findAll({ attributes: fields });
};

const updateReg = async (data) => {
    data.every(async (item)=>{
        await Reg.update({permitted:item.permitted},{
            where:{
                id:item.id
            }
        })
    });
}

const authenticate = async(data) => {
  console.log(data);
  let res = Reg.findAll({
    attributes:['id','password','permitted'],
    where:{ contactEmail: data.loginEmail }
  });
  return res;
}

const selectINF = async (data) => {
 
  console.log("hello----------------------");
  console.log(data);
    const responses = await INF.findAll({
      attributes : { exclude : ['id','companyID','createdAt','updatedAt']},
      where : { companyID : data.id}
    });
    return responses[0];
}

const updateINF = async (responses, id)=>{
    // data.id data.responses
    await INF.update(responses,{
      where : { companyID : id}
    });
}

module.exports = {
  insertReg,
  selectRegs,
  updateReg,
  authenticate,
  selectINF,
  updateINF
};
