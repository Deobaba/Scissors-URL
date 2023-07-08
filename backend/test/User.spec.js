
const {register,login,logout,getMe} = require('../controllers/User')
const links = require('../models/link'); 
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')


jest.mock('../models/User' )
jest.mock('../models/link'); 


describe('register', () => {

  // jest.mock('../models/User', () => ({
  //   create: jest.fn().mockResolvedValue({
  //     name: 'John Doe',
  //     email: 'johndoe@example.com',
  //     password: 'password123',
  //     getJwtToken: jest.fn().mockReturnValue('mocked-jwt-token')
  //   })
  // }));
  User.create.mockResolvedValue({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password123',
    getJwtToken: jest.fn().mockReturnValue('mocked-jwt-token')
  })


  it('should create a new user, set the token cookie, and redirect to /me', async () => {

    const req = {
      body: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123'
      }
    };
    const res = {
      cookie: jest.fn(),
      redirect: jest.fn()
    };
    const next = jest.fn();

    await register(req, res, next);

    expect(User.create).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123'
    });

    expect(res.cookie).toHaveBeenCalledWith('token', 'mocked-jwt-token', {
      expires: expect.any(Date),
      httpOnly: true
    });

    expect(res.redirect).toHaveBeenCalledWith('/me');

    expect(next).not.toHaveBeenCalled();
  });
});






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

// logout

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


// get me

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
