// pages/index.js
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to the Hospital System</h1>
      <div className="mt-4">
        <Link href="/signin" className="mr-4 text-blue-500">
          Sign In
        </Link>
        <Link href="/signup" className="text-green-500">
          Sign Up
        </Link>
      </div>
      <div className="mt-4">
        <Link href="/admin" className="text-red-500">
          Admin Dashboard
        </Link>
      </div>
    </div>
  );
}

