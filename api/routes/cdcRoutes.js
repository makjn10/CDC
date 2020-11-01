const express = require('express');
const router = express.Router();
const {createReg,getRegs,updateReg,login,getINF,updateINF,jnf} = require("../controllers/cdcController");

router.post("/createReg",createReg);
router.get("/getRegs",getRegs);
router.post("/updateReg",updateReg);

router.post("/login",login);
router.post("/getINF",getINF);
router.post("/updateINF",updateINF);

router.post("/jnf",jnf)

module.exports = router;
