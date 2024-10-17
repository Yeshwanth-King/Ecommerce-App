import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db";

const adminEmails = ["yeshuyeshwanth2005@gmail.com"];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      httpOptions: {
        timeout: 10000, // Increase timeout to 10 seconds
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      httpOptions: {
        timeout: 10000, // Increase timeout to 10 seconds
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn({ user }) {
      if (adminEmails.includes(user.email)) {
        return true; // Allow sign-in
      } else {
        return false; // Deny sign-in
      }
    },
    async session({ session, user }) {
      return session; // Customize the session object here if needed
    },
  },
  // Optionally, set session strategy, theme, etc.
};

export const isAdmin = async (session) => {
  if (!session || !adminEmails.includes(session?.user?.email)) {
    throw new Error("You are not authorized to access this page");
  }
};


export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);

