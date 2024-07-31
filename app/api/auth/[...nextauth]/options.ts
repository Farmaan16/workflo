import  { NextAuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectToDatabase from "../../../lib/mongodb";
import User, { IUser } from "../../../models/User";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await connectToDatabase();

        console.log("Received credentials:", credentials);

        try {
          // Find user by email or username
          const user = await User.findOne({ email: credentials?.email });

          if (!user) {
            console.error("No user found with the email:", credentials?.email);
            throw new Error("No user found with the email");
          }

          // Compare provided password with stored hash
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            console.error(
              "Password is incorrect for user:",
              credentials?.email
            );
            throw new Error("Password is incorrect");
          }

          // If everything is correct, return user
          return { id: user._id, email: user.email, fullName: user.fullName };
        } catch (error: any) {
          // If there was an error, throw it
          throw new Error(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.fullName = user.fullName;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.fullName = token.fullName;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

