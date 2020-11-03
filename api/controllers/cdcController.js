const cdcDb = require("../Models/cdcModels");

module.exports.createReg = async function (req, res) {
//   console.log(req.body);
  req.body.permitted = false;
  await cdcDb.insertReg(req.body);
  console.log("Registration completed");
  res.send("Success");
};

module.exports.getRegs = async function (req, res) {
  const list = await cdcDb.selectRegs();
//   console.log(list);
  return res.json({
    list,
  });
};

module.exports.updateReg = async function (req, res) {
  await cdcDb.updateReg(req.body);
  console.log("Registration updated");
  return res.send("Success");
};

module.exports.login = async function (req, res) {
  let loginDetails = await cdcDb.authenticate(req.body);
  if (loginDetails.length == 0) return res.json({ message: "Email incorrect" });
  loginDetails = loginDetails[0];
  if (loginDetails.password !== req.body.password)
    return res.json({ message: "Password incorrect" });
  return res.json({
    id: loginDetails.id,
    permitted: loginDetails.permitted,
    companyName : loginDetails.companyName,
    message: "Login successful",
  });
};

module.exports.getINF = async function (req, res) {
  let responses = await cdcDb.selectINF(req.body);
  let branches = await cdcDb.selectInfEligibleBranch(req.body);
  let cgpa = await cdcDb.selectInfGpa(req.body);
//   console.log(responses);
  return res.json({
    responses,
    branches,
    cgpa,
  });
};

module.exports.updateINF = async function (req, res) {
//   console.log("-----------updateINF()----------");
//   console.log(req.body);
    console.log("INF updated successfully");
  await cdcDb.updateINF(req.body);
  return res.json({
    message: "INF uploaded",
  });
};

module.exports.getINFList = async function (req, res) {
//   console.log("--------------getINFList() called----------------");
  const list = await cdcDb.selectINFList();
//   console.log(list);
  return res.json({
    list,
  });
};

module.exports.updateINFList = async function (req, res) {
//   console.log("-----------updateINFList() called------------");
//   console.log(req.body);
  console.log("INF approvals saved")
  await cdcDb.updateINFList(req.body);
  return res.json({
    message: "Update complete",
  });
};

module.exports.jnf = async function (req, res) {
//   await cdcDb.updateINF(req.body.responses, req.body.id);
//   return res.json({
//     message: "JNF uploaded",
//   });
};
