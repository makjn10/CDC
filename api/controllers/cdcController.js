const cdcDb = require('../Models/cdcModels');

module.exports.createReg = async function(req,res){
    console.log(req.body);
    req.body.permitted = false;
    await cdcDb.insertReg(req.body);
    res.send('Company registration done')
}

module.exports.getRegs = async function(req,res){
    const list = await cdcDb.selectRegs();
    console.log(list);
    return res.json({
        list
    })
}

module.exports.updateReg = async function (req,res){
    await cdcDb.updateReg(req.body);
    return res.json({
        message: "Update complete"
    });
}

module.exports.login = async function(req,res){
    let obj = await cdcDb.authenticate(req.body);
    if(obj.length==0) return res.json({message:"Email incorrect"});
    if(obj[0].password!==req.body.password) return res.json({message:"Password incorrect"});
    return res.json({ id:obj[0].id , permitted : obj[0].permitted, message:"Login successful"});
}

module.exports.getINF = async function(req,res){
    let responses = await cdcDb.selectINF(req.body);
    console.log(responses);
    return  res.json({
        responses
    })
}

module.exports.updateINF = async function(req,res){
    console.log("------------bye--------------");
    console.log(req.body);
    await cdcDb.updateINF(req.body.responses, req.body.id);
    return  res.json({
        message:"INF uploaded"
    })
}

module.exports.jnf = async function(req,res){
    //await cdcDb.updateINF(req.body.responses, req.body.id);
    return  res.json({
        message:"JNF uploaded"
    })
}