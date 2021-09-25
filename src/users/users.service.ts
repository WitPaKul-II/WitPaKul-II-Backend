import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./entities/users.entity";

@Injectable()
export class UserService {
     //  after midterm Service
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
    ) { }

    findAll(): Promise<Users[]> {
        return this.userRepository.find();
    }

    findOne(id: number): Promise<Users> {
        return this.userRepository.findOne(id);
    }

    create(user: Users): Promise<Users> {
        return this.userRepository.save(user);
    }

    async update(id: number, user: Users) {
        await this.userRepository.update(id, user)
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }


}