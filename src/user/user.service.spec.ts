import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

// Mock du modèle User
const mockUserModel = {
  create: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
};

// Mock du UserRepository
const mockUserRepository = {
  create: jest.fn(),
  findByEmail: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: 'User', useValue: mockUserModel },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user and return the created user', async () => {
      const createUserDto = { username: 'testuser', email: 'test@example.com', password: 'password' };

      mockUserRepository.create.mockImplementation((data) => Promise.resolve(data));

      const result = await service.createUser(createUserDto.username, createUserDto.email, createUserDto.password);

      expect(result.username).toEqual(createUserDto.username);
      expect(result.email).toEqual(createUserDto.email);
      expect(result.password).toMatch(/^\$2b\$10\$/);
    });

  });


  describe('validateUser', () => {
    it('should validate a user with correct credentials', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = { email, password: hashedPassword };

      mockUserRepository.findByEmail.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async (password: string, hash: string): Promise<boolean> => {
        return true;
      })

      const result = await service.validateUser(email, password);

      expect(result).toEqual(user);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
    });

    it('should return null for incorrect credentials', async () => {
      const email = 'test@example.com';
      const password = 'wrongpassword';
      mockUserRepository.findByEmail.mockResolvedValue(null);

      const result = await service.validateUser(email, password);

      expect(result).toBeNull();
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
    });
  });

  describe('findAll', () => {
    it('should return all users without passwords', async () => {
      const users = [
        { username: 'user1', email: 'user1@example.com', password: 'hashedpassword1' },
        { username: 'user2', email: 'user2@example.com', password: 'hashedpassword2' },
      ];

      mockUserRepository.findAll.mockResolvedValue(users);
      const result = await service.findAll();

      expect(result).toEqual([
        { username: 'user1', email: 'user1@example.com' },
        { username: 'user2', email: 'user2@example.com' },
      ]);
      expect(mockUserRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const user = { id: '1', username: 'user1', email: 'user1@example.com' };
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.findOne('1');

      expect(result).toEqual(user);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith('1');
    });

    it('should return null if user does not exist', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      const result = await service.findOne('999');

      expect(result).toBeNull();
      expect(mockUserRepository.findOne).toHaveBeenCalledWith('999');
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const data = { username: 'updatedUser' };
      await service.updateUser('1', data);

      expect(mockUserRepository.update).toHaveBeenCalledWith('1', data);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const user = { id: '1', destroy: jest.fn() };
      mockUserRepository.findOne.mockResolvedValue(user);


      await service.deleteUser('1');

      expect(user.destroy).toHaveBeenCalled();
    });

    it('should not throw an error if user does not exist', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.deleteUser('999')).resolves.toBeUndefined();
      expect(mockUserRepository.findOne).toHaveBeenCalledWith('999');
    });
  });
});
