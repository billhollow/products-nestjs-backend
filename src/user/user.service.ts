/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/user.dto';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, ){}

    async createUser(userDto: CreateUserDto): Promise<any> {
        const user: User = new User();
        user.username = userDto.username;
        user.email = userDto.email;
        user.password = encodePassword(userDto.password);

        const {password, ...userData} = await this.userRepository.save(user);
        return userData;
    }

    findAllUser(): Promise<User[]> {
        return this.userRepository.find({select: ['id', 'username', 'email']});
    }

    async viewUser(id: number): Promise<any>{
        const foundUser = await this.userRepository.findOneBy({id});
        if (!foundUser) throw new NotFoundException('User not found with sent id');

        const {password, ...userData} = foundUser;
        return userData;
    }

    async updateUser(id: number, userDto: CreateUserDto): Promise<any> {
        const user: User = new User();
        user.username = userDto.username;
        user.email = userDto.email;
        user.password = encodePassword(userDto.password);
        user.id = id;
        const {password, ...userData} = await this.userRepository.save(user);
        return userData;
    }

    removeUser(id: number): Promise<{affected?: number}>{
        return this.userRepository.delete(id);
    }

    findUserByUsername(username: string): Promise<User | undefined>{
        return this.userRepository.findOne({where: {username}});
    }
}
