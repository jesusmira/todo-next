import prisma from '@/lib/prisma';
import { NextResponse, type NextRequest } from 'next/server'
import * as yup from 'yup';
import { getUserSessionServer } from '@/auth/auth/auth-actions';

export async function GET(request: NextRequest) { 
  
    const searchParams = request.nextUrl.searchParams
    const take = Number(searchParams.get('take') ?? '10');
    const skip = Number(searchParams.get('skip') ?? '0');
    if ( isNaN( take) ) 
        return NextResponse.json({ message: 'Take tiene que ser un número' }, { status: 400 });
    if ( isNaN( skip) ) 
        return NextResponse.json({ message: 'Skip tiene que ser un número' }, { status: 400 });

    const todos = await prisma.todo.findMany({ take, skip });

    return NextResponse.json(todos);
}

const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false)

})

export async function POST(request: NextRequest) {

    const user = await getUserSessionServer();
    if (!user) return NextResponse.json({ message: 'No estás autorizado' }, { status: 401 });
    
    try {
        
        const {complete, description} = await request.json();
        const todo = await prisma.todo.create({ data: { description, complete, userId: user.id } });
     
        return NextResponse.json(todo);
        
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }

}

export async function DELETE(request: NextRequest) {

    const user = await getUserSessionServer();
    if (!user) return NextResponse.json({ message: 'No estás autorizado' }, { status: 401 });

    try {
        await prisma.todo.deleteMany({ where: { complete: true, userId: user.id } });   
        return NextResponse.json({ message: 'Borrados todos los elementos completados' });
        
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}