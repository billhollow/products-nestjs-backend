import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

const passwordRegEx = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

export class UserDto {
    username: string;
    email: string;
    password: string;
}

export class CreateUserDto {
    @IsString()
    @MinLength(2, { message: '"username" must have atleast 2 characters.' })
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail(undefined, { message: 'Please provide a valid email.' })
    email: string;

    @IsNotEmpty()
    @Matches(passwordRegEx, {
        message: `Password must contain one digit from 1 to 9, 
        one lowercase letter, one uppercase letter, 
        one special character, 
        no space, 
        and it must be 8-16 characters long`
    })
    password: string;
}