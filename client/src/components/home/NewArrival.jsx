import { useEffect, useState } from "react"
import { listProductBy } from "../../api/product"
import ProductCard from "../user/product-card/ProductCard"

const NewArrival = () => {
    const [data, setData] = useState([])
    const fetchData = async () => {
        try {
            const res = await listProductBy('sold', 'desc', 3)
            setData(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <section className="bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">Featured Products</h2>
                <div className="flex flex-wrap gap-4 justify-center">
                    {data.length > 0 && data.map((item) => {
                        return <ProductCard product={item} key={item.id} />
                    })}
                </div>
            </div>
        </section>
    )
}

export default NewArrival