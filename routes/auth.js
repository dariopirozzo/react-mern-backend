const {Router} = require('express')
const { check } = require('express-validator')
const { createUser, loginUser, revalidateUser } = require('../controllers/auth')
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-token')

const router = Router()


router.post(
    '/', 
    [
        check('email', 'The field is required').not().isEmpty(),
        check('password', 'The Password must have 5 caracters').isLength({min: 5}),
        validateFields
    ],
    loginUser)

router.post(
    '/new', 
    [
        check('name', 'The field is required').not().isEmpty(),
        check('email', 'The field is required').not().isEmpty(),
        check('password', 'The Password must have 5 caracters').isLength({min: 5}),
        validateFields
    ],
    createUser )

router.get('/renew', validateJWT, revalidateUser)

module.exports = router;