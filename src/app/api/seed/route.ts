import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

    await prisma.todo.deleteMany(); // delete * from todos
    await prisma.user.deleteMany(); // delete * from users

   const  user = await prisma.user.create({
        data: {
            name: 'Jesús',
            email: 'test1@test.com',
            password: bcrypt.hashSync('123456'),
            roles: ['admin','client', 'user'],
            todos: {
                create:[
                    { description: 'Piedra del alma' },
                    { description: 'Piedra del poder' },
                    { description: 'Piedra del tiempo'},
                    { description: 'Piedra del espacio' },
                    { description: 'Piedra del realidad' },
                ]
            }
        }
   });

    // const todo = await prisma.todo.createMany({
    //     data: [
    //         { description: 'Piedra del alma',complete: true },
    //         { description: 'Piedra del poder' },
    //         { description: 'Piedra del tiempo'},
    //         { description: 'Piedra del espacio' },
    //         { description: 'Piedra del realidad' },
    //     ]
    // });


    return NextResponse.json({ 
        message: 'Seed executed'    
    });
}   