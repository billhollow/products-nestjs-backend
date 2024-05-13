import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { comparePassword } from 'src/utils/bcrypt';


@Injectable()
export class AuthService {
    
    constructor(
        private jwtService: JwtService, 
        private readonly userService: UserService
    ) {}

    async validateUser({username, password}: AuthPayloadDto){
        const foundUser = await this.userService.findUserByUsername(username);

        if (!foundUser) return null;
        
        const rightPassword = comparePassword(password, foundUser.password);

        if (rightPassword) {
            const {password, ...user} = foundUser;
            return this.jwtService.sign(user);
        }
        return null;
    }
}
