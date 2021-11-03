import {
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateuserDto } from './dto/Updateuser.dto copy';
import { Users } from './entities/users.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async findOneByUsername(username: string): Promise<Users> {
    const Users = await this.userRepository.findOne({ where: { username: `${username}` } });
    console.log("findOneByUsername");
    return Users
  }

  async findOne(user_id: number): Promise<Users> {
    const Users = await this.userRepository.findOne(user_id);
    if (!Users) {
      throw new NotFoundException(`userid ${user_id} not found`);
    }
    return Users;
  }

  async create(user: Users): Promise<Users> {
    const checking_users = await this.userRepository.findOne({ where: { email: `${user.email}` } });
    if (!checking_users) {
      throw new NotAcceptableException(`This user is invalid`);
    }
    if (checking_users && checking_users.user_id === user.user_id) {
      throw new NotAcceptableException(
        `userid ${user.user_id} already existed`,
      );
    } else {
      console.log("Save user Sucessful");
      return this.userRepository.save(user);
    }

  }

  async update(user_id: number, user: UpdateuserDto) {
    const updateuser = await this.userRepository.findOne(user_id);
    if (!updateuser) {
      throw new NotFoundException(`userid not found`);
    }
    return this.userRepository.save(user);
  }

  async remove(userid: number) {
    const dd = await this.userRepository.findOne(userid);
    if (!dd) {
      throw new NotFoundException(`userid not found`);
    }
    this.userRepository.delete(userid)
    return `Delete User:${userid} Successful `;
  }
  
  
}
