const z = require('zod')

const urlValidator = z.string().url()

const signupInput = z.object({
    username : z.string().array().nonempty(),
    email : z.string().email().array().nonempty(),
    password: z.string().min(6)
})
const signinInput = z.object({
    email : z.string().email().array().nonempty(),
    password: z.string().min(6)
})


module.exports = {
    urlValidator,
    signinInput,
    signupInput
}