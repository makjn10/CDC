const models = require("../Models");
const { DataTypes } = require("sequelize");

const Reg = models.define("Reg", {
  companyName: DataTypes.TEXT,
  companyWebsite: DataTypes.TEXT,
  contactName: DataTypes.TEXT,
  designation: DataTypes.TEXT,
  contactNumber: DataTypes.BIGINT,
  contactEmail: DataTypes.TEXT,
  password: DataTypes.TEXT,
  permitted: DataTypes.BOOLEAN,
});

const INF = models.define("inf", {
  companyID: DataTypes.INTEGER,
  companyName: DataTypes.TEXT,
  companyCategory: DataTypes.TEXT,
  companyWebsite: DataTypes.TEXT,
  jobDesignation: DataTypes.TEXT,
  place: DataTypes.TEXT,
  test: DataTypes.TEXT,
  salary: DataTypes.INTEGER,
  submitted: DataTypes.BOOLEAN,
  approved: DataTypes.BOOLEAN,
});

const branchNames = [
  "Computer Science and Engineering",
  "Electronics and Communication Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Mining Engineering",
];

let infBranchSchema = { companyID: DataTypes.INTEGER };
for (branch of branchNames) {
  infBranchSchema[branch] = DataTypes.BOOLEAN;
}

const InfEligibleBranch = models.define("InfEligibleBranch", infBranchSchema);

const courses = [
  "Bachelor of Technology",
  "Dual Degree",
  "Master of Technology",
  "Integrated Master of Technology",
];
let infGpaSchema = { companyID: DataTypes.INTEGER };
for (course of courses) {
  infGpaSchema[course] = DataTypes.INTEGER;
}
const InfGpa = models.define("InfGpa", infGpaSchema);

const insertReg = async (data) => {
  await Reg.sync();
  const reg = await Reg.create(data);
  // console.log(reg.id);
  const dummyINF = { companyID: reg.id, submitted: false, approved: false };
  await INF.sync();
  await INF.create(dummyINF);
  const dummy = { companyID: reg.id };
  await InfEligibleBranch.sync();
  await InfEligibleBranch.create(dummy);
  await InfGpa.sync();
  await InfGpa.create(dummy);
};

const selectRegs = async () => {
  return Reg.findAll({ attributes: {exclude : ['createdAt','updatedAt']} });
};

const updateReg = async (data) => {
  data.every(async (item) => {
    await Reg.update(
      { permitted: item.permitted },
      {
        where: {
          id: item.id,
        },
      }
    );
  });
};

const authenticate = async (data) => {
  // console.log(data);
  let res = Reg.findAll({
    attributes: ["id", "password", "permitted","companyName"],
    where: { contactEmail: data.loginEmail },
  });
  return res;
};

const selectINF = async (data) => {
  // console.log("----------selectINF() called------------");
  // console.log(data);
  const responses = await INF.findAll({
    attributes: { exclude: ["id", "companyID", "createdAt", "updatedAt"] },
    where: { companyID: data.companyID },
  });
  return responses[0];
};

const selectInfEligibleBranch = async (data) => {
  // console.log("----------selectInfEligibleBranch called------------");
  // console.log(data);
  const responses = await InfEligibleBranch.findAll({
    attributes: { exclude: ["id", "companyID", "createdAt", "updatedAt"] },
    where: { companyID: data.companyID },
  });
  return responses[0];
};

const selectInfGpa = async (data) => {
  // console.log("----------selectInfGpa called------------");
  // console.log(data);
  const responses = await InfGpa.findAll({
    attributes: { exclude: ["id", "companyID", "createdAt", "updatedAt"] },
    where: { companyID: data.companyID },
  });
  return responses[0];
};

const updateINF = async (data) => {
  // data.id data.responses
  await INF.update(data.responses, {
    where: { companyID: data.companyID },
  });
  await InfEligibleBranch.update(data.branches, {
    where: { companyID: data.companyID },
  });
  await InfGpa.update(data.cgpa, {
    where: { companyID: data.companyID },
  });
};

const selectINFList = async () => {
  const fields = ["companyName", "companyID", "approved"];
  return INF.findAll({ 
    attributes: fields,
    where : { submitted : true }
  });
};

const updateINFList = async (data) => {
  data.every(async (item) => {
    await INF.update(
      { approved: item.approved },
      {
        where: {
          companyID: item.companyID,
        },
      }
    );
  });
};

module.exports = {
  insertReg,
  selectRegs,
  updateReg,
  authenticate,
  selectINF,
  selectInfEligibleBranch,
  selectInfGpa,
  updateINF,
  selectINFList,
  updateINFList,
};
