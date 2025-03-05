import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="mx-auto mt-10 max-w-6xl text-center sm:mt-32">
        <div>
          <h1 className="max-w-4xl mx-auto text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Welcome to Our <span className="text-blue-600">Hospital</span> <br /> Your Health, Our Priority
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 sm:text-xl">
            Providing compassionate care and advanced medical services to our community.
          </p>
        </div>

        {/* Call to Action Buttons (Centered) */}
        <div className="mt-6 flex justify-center items-center">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              className={buttonVariants({
                size: "lg",
                className: "inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition",
              })}
              href="/auth/signin"
            >
              Signin <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              className={buttonVariants({
                size: "lg",
                className: "inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition",
              })}
              href="/auth/signup"
            >
              SignUp <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="mx-auto h-screen mt-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">
              Our Departments
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We offer a wide range of medical specialties and services:
            </p>
          </div>
        </div>

        {/* Department List */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-blue-600">Cardiology</h3>
            <p className="mt-2 text-gray-600">Expert care for your heart.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-blue-600">Neurology</h3>
            <p className="mt-2 text-gray-600">Comprehensive neurological care.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-blue-600">Pediatrics</h3>
            <p className="mt-2 text-gray-600">Caring for your children's health.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
