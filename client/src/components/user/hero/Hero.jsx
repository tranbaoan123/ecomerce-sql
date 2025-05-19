import { Link } from "react-router-dom"

const Hero = () => {
    return (
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white md:py-24">
            <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2 md:items-center">
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Buy Your PC Components</h1>
                    <p className="max-w-[600px] text-lg text-gray-300">
                        High-performance components at competitive prices. Free shipping on orders over $999.
                    </p>
                    <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                        <Link to={'/shop'} className="rounded-md bg-emerald-500 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-600">

                            Shop Now
                        </Link>
                    </div>
                </div>
                <div className="relative h-[300px] md:h-[400px]">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-OJxq9qYqVqZZYPyqnpXa2C0UlKZrtkGnuA&s"
                        alt="Gaming PC"
                        className="object-contain w-full"
                    />
                </div>
            </div>
        </section>
    )
}

export default Hero