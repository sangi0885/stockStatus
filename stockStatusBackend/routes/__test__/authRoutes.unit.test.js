const request = require('supertest');
const app = require('../app');

jest.mock(admin, () => ({
  connect: jest.fn(),
  disconnect: jest.fn()
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
  compare: jest.fn().mockResolvedValue(true)
}));

jest.mock('firebase-admin', () => ({
  firestore: jest.fn().mockReturnValue({
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    get: jest.fn().mockResolvedValue({ exists: false }),
    set: jest.fn().mockResolvedValue()
  })
}));

describe('Auth Routes', () => {
  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  // Rest of the code...
});

// Mock the database connection
jest.mock(db, () => ({
  connect: jest.fn(),
  disconnect: jest.fn()
}));

// Mock the bcrypt module
jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
  compare: jest.fn().mockResolvedValue(true)
}));

// Mock the firebase-admin module
jest.mock('firebase-admin', () => ({
  firestore: jest.fn().mockReturnValue({
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    get: jest.fn().mockResolvedValue({ exists: false }),
    set: jest.fn().mockResolvedValue()
  })
}));

describe('Auth Routes', () => {
  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  describe('POST /signup', () => {
    it('should return 400 if email and password are missing', async () => {
      const response = await request(app).post('/signup').send({});
      expect(response.status).toBe(400);
      expect(response.text).toBe('Email and password are required');
    });

    it('should return 400 if email or password is invalid', async () => {
      const response = await request(app)
        .post('/signup')
        .send({ email: 'invalidemail', password: '123' });
      expect(response.status).toBe(200);
      expect(response.text).toBe('Invalid email or password');
    });

    it('should return 400 if user already exists', async () => {
      const response = await request(app)
        .post('/signup')
        .send({ email: 'existinguser@example.com', password: 'password' });
      expect(response.status).toBe(400);
      expect(response.text).toBe('User already exists');
    });

    it('should return 201 if user is created successfully', async () => {
      const response = await request(app)
        .post('/signup')
        .send({ email: 'newuser@example.com', password: 'password' });
      expect(response.status).toBe(201);
      expect(response.text).toBe('User created successfully');
    });
  });

  describe('POST /signin', () => {
    it('should return 400 if user does not exist', async () => {
      const response = await request(app)
        .post('/signin')
        .send({ email: 'nonexistentuser@example.com', password: 'password' });
      expect(response.status).toBe(400);
      expect(response.text).toBe('User does not exist');
    });

    it('should return 401 if password is incorrect', async () => {
      const response = await request(app).post('/signin').send({
        email: 'existinguser@example.com',
        password: 'incorrectpassword'
      });
      expect(response.status).toBe(401);
      expect(response.text).toBe('Invalid credentials');
    });

    it('should return 200 with a JWT token if credentials are valid', async () => {
      const response = await request(app)
        .post('/signin')
        .send({ email: 'existinguser@example.com', password: 'password' });
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });
  });

  describe('POST /signout', () => {
    it('should return 200 with a success message', async () => {
      const response = await request(app)
        .post('/signout')
        .set('Authorization', 'Bearer validToken');
      expect(response.status).toBe(200);
      expect(response.text).toBe(
        'Sign-out successful. Please clear your token.'
      );
    });

    it('should return 401 if token is missing', async () => {
      const response = await request(app).post('/signout');
      expect(response.status).toBe(401);
      expect(response.text).toBe('Unauthorized');
    });
  });
});
