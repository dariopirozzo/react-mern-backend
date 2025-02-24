  const { response } = require('express')
  const User = require('../models/user.js')
  const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt.js')

  const createUser =async (req,res = response)=>{

    const {email, password} = req.body

    try {
         let user = await User.findOne({email})

         if(user){
            res.status(400).json({
                ok:false,
                msg:'The email is already exist'
            })
         }

        user = new User(req.body)

        const salt = bcrypt.genSaltSync()

        user.password = bcrypt.hashSync( password, salt)

        await user.save()

        const token = await generateJWT(user.id, user.name)
    
            res.status(201).json({
                ok:true,
                mdg:"User created",
                name: user.name,
                id: user.id,
                token
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong'
        })
    }
}

const loginUser = async (req,res = response)=>{

    const {email, password} = req.body

    try {
        let user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                ok: false,
                msh: 'The user doesnt exist with this email'
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password)
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: "Password wrong"
            })
        }
        const token = await generateJWT(user.id, user.name)

        res.json({
            ok:true,
            id: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong'
        })
    }
}

const revalidateUser = async (req,res)=>{
    const {id, name} = req

    const token = await generateJWT(id, name)

    res.json({
        ok:true,
        name,
        token
    })
}


module.exports = {
    createUser,
    loginUser,
    revalidateUser
}