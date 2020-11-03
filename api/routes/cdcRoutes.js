const express = require("express");
const router = express.Router();
const {
  createReg,
  getRegs,
  updateReg,
  login,
  getINF,
  updateINF,
  getINFList,
  updateINFList,
  jnf,
} = require("../controllers/cdcController");

router.post("/cdc/createReg", createReg);
router.get("/cdc/getRegs", getRegs);
router.post("/cdc/updateReg", updateReg);

router.post("/cdc/login", login);
router.post("/cdc/getINF", getINF);
router.post("/cdc/updateINF", updateINF);

router.get("/cdc/getinflist", getINFList);
router.post("/cdc/updateinflist", updateINFList);

router.post("/cdc/jnf", jnf);

module.exports = router;
