const {register} = require('../controllers/User')


const mockRequest = () =>{
    return {
        body:{
            name:"test user",
            email:"testuser@gmail.com",
            password:"1234567"
        }
    }
}

const mockResponse = ()=>{
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
}

describe('Register User',()=>{
    it('should register user',async()=>{
        // await register()
    })
})