import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/user.dto';

@Controller('user')
@UsePipes(new ValidationPipe())
export class UserController {

    constructor(private readonly userService: UserService){}

    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.userService.createUser(userDto);
    }

    @Get()
    findAll(){
        return this.userService.findAllUser();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.userService.viewUser(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() userDto: CreateUserDto){
        return this.userService.updateUser(+id, userDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.userService.removeUser(+id);
    }

}
