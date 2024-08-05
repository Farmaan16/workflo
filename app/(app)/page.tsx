import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-6">Welcome to Task Manager</h1>
      <div className="space-x-4">
        <Link href="/auth/sign-in">
          <p className="px-4 py-2 bg-blue-500 text-white rounded-md">Login</p>
        </Link>
        <Link href="/auth/sign-up">
          <p className="px-4 py-2 bg-green-500 text-white rounded-md">
            Sign Up
          </p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
