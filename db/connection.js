const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connect = async ()=>{
       return await mongoose.connect(process.env.DBURL)
        .then(res=>{
                console.log("connect db");
        })
        .catch(err=>{
                console.log("faild connect to db");
        })
}
module.exports = connect;
