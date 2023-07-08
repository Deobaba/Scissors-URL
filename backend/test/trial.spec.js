// const { register } = require('./your-module'); // Replace './your-module' with the correct path to your module
// const User = require('./user-model'); // Replace './user-model' with the correct path to your User model

// const {register,login} = require('../controllers/User')
// const {login} = require('../controllers/User')

// const User = require('../models/User')
// const ErrorResponse = require('../utils/errorResponse')





// jest.mock('../models/User', () => ({
//   create: jest.fn().mockResolvedValue({
//     name: 'John Doe',
//     email: 'johndoe@example.com',
//     password: 'password123',
//     getJwtToken: jest.fn().mockReturnValue('mocked-jwt-token')
//   })
// }));






// describe('register', () => {
//   it('should create a new user, set the token cookie, and redirect to /me', async () => {
//     const req = {
//       body: {
//         name: 'John Doe',
//         email: 'johndoe@example.com',
//         password: 'password123'
//       }
//     };
//     const res = {
//       cookie: jest.fn(),
//       redirect: jest.fn()
//     };
//     const next = jest.fn();

//     await register(req, res, next);

//     expect(User.create).toHaveBeenCalledWith({
//       name: 'John Doe',
//       email: 'johndoe@example.com',
//       password: 'password123'
//     });

//     expect(res.cookie).toHaveBeenCalledWith('token', 'mocked-jwt-token', {
//       expires: expect.any(Date),
//       httpOnly: true
//     });

//     expect(res.redirect).toHaveBeenCalledWith('/me');

//     expect(next).not.toHaveBeenCalled();
//   });
// });




// login login 


// login


 // Replace './error-response' with the correct path to your ErrorResponse module

// jest.mock('../models/User', () => ({
//   findOne: jest.fn().mockResolvedValue({
//     email: 'johndoe@example.com',
//     comparePassword: jest.fn().mockResolvedValue(true),
//     getJwtToken: jest.fn().mockReturnValue('mocked-jwt-token'),
//     select:jest.fn().mockReturnThis()
//   }),
  

// }));

// describe.only('login', () => {
//   it('should log in a user, set the token cookie, and redirect to /me', async () => {
//     const req = {
//       body: {
//         email: 'johndoe@example.com',
//         password: 'password123'
//       }
//     };
//     const res = {
//       cookie: jest.fn(),
//       redirect: jest.fn()
//     };
//     const next = jest.fn();

//     await login(req, res, next);

//     expect(next).toHaveBeenCalled()
//     // expect(login()).toThrow("Please provide an email and password")

//     expect(User.findOne).toHaveBeenCalledWith({ email: 'johndoe@example.com' });
//     expect(User.findOne({ email: 'johndoe@example.com' }).select).toBeCalledTimes(1)

   

//     // expect(res.redirect).toHaveBeenCalledWith('/me');

    
//   });

  // it('should return an error when email or password is missing', async () => {
  //   const req = {
  //     body: {
  //       email: '',
  //       password: 'password123'
  //     }
  //   };
  //   const res = {};
  //   const next = jest.fn();

  //   await login(req, res, next);

  //   expect(next).toHaveBeenCalledWith(
  //     new ErrorResponse('Please provide an email and password', 400)
  //   );
  // });

  // it('should return an error when user is not found', async () => {
  //   User.findOne.mockResolvedValue(null);

  //   const req = {
  //     body: {
  //       email: 'nonexistentuser@example.com',
  //       password: 'password123'
  //     }
  //   };
  //   const res = {};
  //   const next = jest.fn();

  //   await login(req, res, next);

  //   expect(next).toHaveBeenCalledWith(
  //     new ErrorResponse('Invalid credentials', 401)
  //   );
  // });

  // it('should return an error when password does not match', async () => {
  //   User.findOne.mockResolvedValue({
  //     email: 'johndoe@example.com',
  //     comparePassword: jest.fn().mockResolvedValue(false)
  //   });

  //   const req = {
  //     body: {
  //       email: 'johndoe@example.com',
  //       password: 'incorrectpassword'
  //     }
  //   };
  //   const res = {};
  //   const next = jest.fn();

  //   await login(req, res, next);

  //   expect(next).toHaveBeenCalledWith(
  //     new ErrorResponse('Invalid credentials', 401)
  //   );
  // });
// });


// const {login} = require('../controllers/User')

// const User = require('../models/User');
// const { findOne } = require('../models/link');
// const ErrorResponse = require('../utils/errorResponse')


// jest.mock('../models/User',( )=>({
//  findOne:jest.fn(),
//  select:jest.fn() ,
// }));
// jest.mock('../utils/errorResponse')

// describe('login', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should call select function on User model', async () => {
//     const mockUser = {
//       email: 'test@example.com',
//       password: 'password',
//     //   select: jest.fn().mockReturnThis(),
//     };

//     // User.findOne.mockResolvedValueOnce(mockUser);
//     User.findOne.mockReturnValue({select:jest.fn().mockResolvedValue(mockUser)})

//     const req = {
//       body: {
//         email: 'test@example.com',
//         password: 'password',
//       },
//     };
//     const res = {};
//     const next = jest.fn();

//     await login(req, res, next);

//     expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
//     // expect(User.findOne.select).toHaveBeenCalled();
//     expect(next).not.toHaveBeenCalledWith(expect.any(ErrorResponse));
//   });

//   // it('should return an error if email or password is not provided', async () => {
//   //   const req = {
//   //     body: {},
//   //   };
//   //   const res = {};
//   //   const next = jest.fn();

//   //   await login(req, res, next);

//   //   expect(next).toHaveBeenCalledWith(expect.any(ErrorResponse));
//   //   expect(next.mock.calls[0][0].message).toBe(
//   //     'Please provide an email and password'
//   //   );
//   //   expect(next.mock.calls[0][0].statusCode).toBe(400);
//   // });
// });

// const { getMe } = require('./yourGetMeModule'); // Replace with the path to your getMe module
// const User = require('./User'); // Replace with the path to your User model
// // Replace with the path to your links module

// jest.mock('./User'); // Mocking the User module
// // Mocking the links module


const {login,logout,getMe,updateDetails} = require('../controllers/User')
const links = require('../models/link'); 
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse')


jest.mock('../models/User' )// Mocking the User module
jest.mock('../models/link'); 

describe('login', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    res = {
      cookie: jest.fn(),
      redirect: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if email or password is missing', async () => {
    req.body.email = '';
    await login(req, res, next);
    expect(next).toHaveBeenCalledWith(new ErrorResponse('Please provide an email and password', 400));
  });

  it('should return 401 if user is not found', async () => {
    User.findOne.mockResolvedValueOnce(null);
    await login(req, res, next);
    expect(next).toHaveBeenCalledWith(new ErrorResponse('Invalid credentials', 401));
  });

  it('should return 401 if password is incorrect', async () => {
    const mockUser = {
      comparePassword: jest.fn().mockResolvedValue(false),
    };
    User.findOne.mockResolvedValueOnce(mockUser);
    await login(req, res, next);
    expect(next).toHaveBeenCalledWith(new ErrorResponse('Invalid credentials', 401));
  });

  it('should set cookie and redirect to /me if login is successful', async () => {
    const mockUser = {
      comparePassword: jest.fn().mockResolvedValue(true),
      getJwtToken: jest.fn().mockReturnValue('mockToken'),
    };
    User.findOne.mockResolvedValueOnce(mockUser);
    await login(req, res, next);
    expect(res.cookie).toHaveBeenCalledWith('token', 'mockToken', {
      expires: expect.any(Date),
      httpOnly: true,
    });
    expect(res.redirect).toHaveBeenCalledWith('/me');
  });
});



// const { logout } = require('./yourLogoutModule'); // Replace with the path to your logout module

describe('logout', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set cookie and return success response', async () => {
    await logout(req, res, next);
    expect(res.cookie).toHaveBeenCalledWith('token', 'none', {
      expires: expect.any(Date),
      httpOnly: true,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: {},
    });
  });
});





describe('getMe', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: { id: 'userId123' },
    };
    res = {
      render: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the dashboard view with user and links', async () => {
    const mockUser = { _id: 'userId123', name: 'John Doe' };
    const mockLinks = [{ _id: 'linkId123', url: 'http://example.com' }];

    User.findById.mockResolvedValueOnce(mockUser);
    links.find.mockResolvedValueOnce(mockLinks);

    await getMe(req, res, next);

    expect(User.findById).toHaveBeenCalledWith('userId123');
    expect(links.find).toHaveBeenCalledWith({ user: 'userId123' });
    expect(res.render).toHaveBeenCalledWith('frontend/dashboard', {
      user: mockUser,
      link: mockLinks,
    });
  });
});





describe('updateDetails', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
      user: { id: 'userId123' },
    };
    res = {
      redirect: jest.fn(),
      // Uncomment the following lines if you want to test the response JSON
      // status: jest.fn().mockReturnThis(),
      // json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update user details and redirect to /me', async () => {
    const mockUser = { _id: 'userId123', name: 'John Doe', email: 'john.doe@example.com' };
    User.findByIdAndUpdate.mockResolvedValueOnce(mockUser);

    await updateDetails(req, res, next);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      'userId123',
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
      {
        runValidators: true,
        new: true,
      }
    );
    expect(res.redirect).toHaveBeenCalledWith('/me');
    // Uncomment the following lines if you want to test the response JSON
    // expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith({
    //   success: true,
    //   data: mockUser,
    // });
  });
});
