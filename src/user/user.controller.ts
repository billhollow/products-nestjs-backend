import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('user')
@UsePipes(new ValidationPipe())
export class UserController {

    constructor(private readonly userService: UserService){}

    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.userService.createUser(userDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(){
        return this.userService.findAllUser();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string){
        return this.userService.viewUser(+id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() userDto: CreateUserDto){
        return this.userService.updateUser(+id, userDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string){
        return this.userService.removeUser(+id);
    }

}
