import { useEffect, useState } from "react"
import useEcomStore from "../../../store/store"

const SearchBar = () => {
  const getProductList = useEcomStore(state => state.getProductList)
  const productList = useEcomStore(state => state.products)
  const searchFilters = useEcomStore(state => state.searchFilter)
  const [text, setText] = useState('')
  useEffect(() => {
    const delay = setTimeout(() => {
      searchFilters({ query: text })
      if (!text) getProductList()
    }, 300)
    return () => clearTimeout(delay)
  }, [text])
  return (
    <div>
      <h1 className="text-2xl font-semibold">Filter Products</h1>
      <div>
        <input type="text" className="border rounded-md px-2 py-1" placeholder="Search Product.... " onChange={(e) => setText(e.target.value)} />

      </div>
    </div>
  )
}

export default SearchBar