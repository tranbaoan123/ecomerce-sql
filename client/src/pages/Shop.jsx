import { useEffect } from "react"
import ProductCard from "../components/user/product-card/ProductCard"
import useEcomStore from "../store/store"
import SearchBar from "../components/user/search-bar/SearchBar"

const Shop = () => {
    const getProductList = useEcomStore(state => state.getProductList)
    const productList = useEcomStore(state => state.products)
    useEffect(() => {
        getProductList()
    }, [])
    return (
        <div className="flex">
            <div className="w-1/4 p-4 bg-gray-100 h-screen overflow-y-auto">
                <SearchBar />
            </div>
            <div className="w-1/2 p-4 overflow-y-auto">
                <h3 className="text-2xl font-semibold mb-4">Shop's Product</h3>
                <div className="flex flex-wrap gap-4 mx-auto">
                    {productList.length > 0 && productList.map((product) => {
                        return <ProductCard key={product.id} product={product} />
                    })}
                </div>
            </div>
            <div className="w-1/4 p-4 bg-gray-100 h-screen overflow-y-auto">
                Carts
            </div>
        </div>
    )
}

export default Shop