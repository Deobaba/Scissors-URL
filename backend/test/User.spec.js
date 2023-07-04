const {register} = require('../controllers/User')

const User = require('../models/User')


const mockRequest = () =>{
    return {
        body:{
            name:"test user",
            email:"testuser@gmail.com",
            password:"1234567"
        }
    }
}

const mockUser = {
    _id:'cfghjhjkjka',
    name:"test user",
    email:"testuser@gmail.com",
    password:"1234567"

}

afterEach(()=>{
    jest.resetAllMocks()
})


describe('register User',() =>{
    it('it should register',async()=>{

        jest.spyOn(User,'create').mockResolvedValueOnce(mockUser)

        const mockReq = mockRequest()

        let mockRes
        // console.log(mockReq)
        // expect(2+2).toBe(4)

        await register(mockReq,mockRes )

        expect(User.create).toHaveBeenCalledWith({
            name:"test user",
            email:"testuser@gmail.com",
            password:"1234567"
        })

    })

    

})