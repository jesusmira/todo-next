import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from '@/auth/auth/auth-actions';



export const authOptions:NextAuthOptions = {
  adapter: PrismaAdapter( prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Correo electrónico', type: 'email', placeholder: 'example@email.com' },
          password: { label: 'Contraseña', type: 'password', placeholder: '******' },
        },
        async authorize(credentials, req) {
          // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
          const user = await signInEmailPassword(credentials!.email, credentials!.password);

          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return user
          }
          return null;
        } 
      }),
  ],

  session: {
    strategy: 'jwt',
  },

 
  
  callbacks: {

    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },

    async jwt({ token, user, account, profile }) {

      const dbUser = await prisma.user.findFirst({
        where: { email: token.email ?? 'no-email' }
      });
      if ( dbUser?.isActive === false ) {
        throw Error('User is not active');
      }
        token.roles = dbUser?.roles ?? ['no-roles'];
        token.id    = dbUser?.id ?? 'no-id';

      return token;
    },
    async session({ session, token, user }) {
      if ( session && session.user ) {
        session.user.id = token.id;
        session.user.roles = token.roles;
      }
      return session;
    },

  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };