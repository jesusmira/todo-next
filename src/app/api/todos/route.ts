import prisma from '@/lib/prisma';
import { NextResponse, type NextRequest } from 'next/server'
import * as yup from 'yup';

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
    
    try {
        
        const {complete, description} = await request.json();
        const todo = await prisma.todo.create({ data: { description, complete } });
     
        return NextResponse.json(todo);
        
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }

}

export async function DELETE(request: NextRequest) {
    try {
        await prisma.todo.deleteMany({ where: { complete: true } });
        return NextResponse.json({ message: 'Borrados todos los elementos completados' });
        
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}