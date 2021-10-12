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


}