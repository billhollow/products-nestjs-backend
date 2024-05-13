import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/user.dto';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, ){}

    createUser(userDto: CreateUserDto): Promise<User> {
        const user: User = new User();
        user.username = userDto.username;
        user.email = userDto.email;
        user.password = encodePassword(userDto.password);
        return this.userRepository.save(user);
    }

    findAllUser(): Promise<User[]> {
        return this.userRepository.find();
    }

    viewUser(id: number): Promise<User>{
        return this.userRepository.findOneBy({id});
    }

    updateUser(id: number, userDto: CreateUserDto): Promise<User> {
        const user: User = new User();
        user.username = userDto.username;
        user.email = userDto.email;
        user.password = encodePassword(userDto.password);
        user.id = id;
        return this.userRepository.save(user);
    }

    removeUser(id: number): Promise<{affected?: number}>{
        return this.userRepository.delete(id);
    }
}
