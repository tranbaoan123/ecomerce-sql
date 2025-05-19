import useEcomStore from "../../../store/store"
import { createSearchParams, useNavigate } from 'react-router-dom';
const Category = () => {
    const navigate = useNavigate();
    const categoryList = useEcomStore((state) => state.categories)
    const handleQueryParams = (categoryId) => {
        navigate({
            pathname: "shop",
            search: createSearchParams({
                categoryId: categoryId
            }).toString()
        });

    }
    return (
        <section className="bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">Shop By Category</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
                    {categoryList.map((category) => (
                        <button
                            onClick={() => handleQueryParams(category.id)}
                            key={category.name}
                            className="group flex flex-col items-center rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <h3 className="text-center font-medium">{category.name}</h3>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Category