const jwt = require('jsonwebtoken')

const generateJWT = (id, name)=>{

    return new Promise((resolve, reject)=>{
        const payload = {id, name}
        jwt.sign(
            payload, 
            process.env.SECRETE_JWT_SEED,{
            expiresIn:'2h'},
            (err,token)=>{
                if(err){
                    console.log(err)
                    reject('the token cant be generated')
                }
                resolve(token)})
    })

}

module.exports={
    generateJWT
}