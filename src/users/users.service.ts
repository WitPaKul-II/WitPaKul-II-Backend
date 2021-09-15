import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./users.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    findOne(id: number): Promise<UserEntity> {
        return this.userRepository.findOne(id);
    }

    create(user: UserEntity): Promise<UserEntity> {
        return this.userRepository.save(user);
    }

    async update(id: number, user: UserEntity) {
        await this.userRepository.update(id, user)
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }


}