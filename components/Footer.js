import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-white mx-auto border-t border-gray-200 py-8">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Changed to 2 columns */}
                    {/* Logo & Description */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {/* Replace with Hospital Name */}
                            Syam Children And Maternity Hospital
                        </h2>
                        <p className="mt-2 text-gray-600">
                            {/* Replace with Hospital Tagline */}
                            Your trusted partner for quality healthcare.
                        </p>
                    </div>

                    {/* Quick Links & Social Media (Combined) */}
                    <div>
                        <div className="grid grid-cols-2 gap-6"> {/* 2 columns for links */}
                            {/* Quick Links */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
                                <ul className="mt-2 space-y-2">
                                    <li>
                                        <Link href="/" className="text-gray-600 hover:text-gray-900">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/about" className="text-gray-600 hover:text-gray-900">
                                            About Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                                            Contact
                                        </Link>
                                    </li>
                                    {/* Add more quick links as needed */}
                                </ul>
                            </div>

                            {/* Social Media Links */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Follow Us</h3>
                                <div className="mt-2 flex space-x-4">
                                    {/* Replace with actual social media links */}
                                    <Link href="#" className="text-gray-600 hover:text-gray-900">
                                        Facebook
                                    </Link>
                                    <Link href="#" className="text-gray-600 hover:text-gray-900">
                                        Twitter
                                    </Link>
                                    <Link href="#" className="text-gray-600 hover:text-gray-900">
                                        Instagram
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 text-center border-t border-gray-200 pt-4 text-gray-500 text-sm">
                    {/* Replace with Hospital Name */}
                    © {new Date().getFullYear()} Syam Children And Maternity Hospital. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;