import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <p className="text-white text-2xl font-bold">Task Manager</p>
        </Link>
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
    </nav>
  );
};

export default Navbar;
