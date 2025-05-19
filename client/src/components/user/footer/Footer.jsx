import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-white">TECHPC</h3>
                        <p className="text-sm">
                            Your one-stop shop for all PC components and accessories. Building dreams since 2023.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-4 font-bold text-white">Shop</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/shop" className="hover:text-white">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/deals" className="hover:text-white">
                                    Deals & Offers
                                </Link>
                            </li>
                            <li>
                                <Link href="/new" className="hover:text-white">
                                    New Arrivals
                                </Link>
                            </li>
                            <li>
                                <Link href="/pc-builder" className="hover:text-white">
                                    PC Builder
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 font-bold text-white">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/contact" className="hover:text-white">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-white">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="hover:text-white">
                                    Shipping Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="hover:text-white">
                                    Returns & Refunds
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 font-bold text-white">Contact</h3>
                        <address className="not-italic text-sm space-y-2">
                            <p>123 Tech Street</p>
                            <p>Silicon Valley, CA 94043</p>
                            <p>Email: support@techpc.com</p>
                            <p>Phone: (123) 456-7890</p>
                        </address>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm">
                    <p>© {new Date().getFullYear()} TECHPC. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer