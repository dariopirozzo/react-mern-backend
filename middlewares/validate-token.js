const {response} = require('express')
const jwt = require('jsonwebtoken')

const validateJWT = (req,res=response,next)=>{
    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({
            ok: false,
            msg:'There is no token'
        })
    }

    try {
        const {id, name} = jwt.verify(
            token,
            process.env.SECRETE_JWT_SEED)

            req.id = id
            req.name = name

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Not valid token'
        })
    }

    next()
}


module.exports ={
    validateJWT
}