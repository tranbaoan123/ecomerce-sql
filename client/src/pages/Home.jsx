import FeaturedProduct from "../components/home/FeaturedProduct"
import Category from "../components/user/category/Category"
import Footer from "../components/user/footer/Footer"
import Hero from "../components/user/hero/Hero"

const Home = () => {
    return (
        <main>
            <Hero />
            <Category />
            <FeaturedProduct />
            <Footer />
        </main>
    )
}

export default Home