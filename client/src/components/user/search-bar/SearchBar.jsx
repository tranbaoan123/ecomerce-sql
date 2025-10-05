import { useEffect, useState } from "react"
import useEcomStore from "../../../store/store"

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const SearchBar = () => {
  const getProductList = useEcomStore(state => state.getProductList)
  const getCategoryList = useEcomStore(state => state.getCategoryList)
  const productList = useEcomStore(state => state.products)
  const categoryList = useEcomStore(state => state.categories)
  const searchFilters = useEcomStore(state => state.searchFilter)
  const [text, setText] = useState('')
  const [categorySelect, setCategorySelect] = useState([])
  const [price, setPrice] = useState([0, 0])
  const [ok, setOk] = useState(false)

  // Filter By Text
  // useEffect(() => {
  //   const delay = setTimeout(() => {
  //     searchFilters({ query: text })
  //     if (text) searchFilters({ query: text })
  //     else getProductList()
  //   }, 300)
  //   return () => clearTimeout(delay)
  // }, [text])

  //  Filter By Category

  useEffect(() => {
    getCategoryList()
  }, [])
  const handleCheck = (e) => {
    const inCheck = e.target.value
    const inState = [...categorySelect]
    const findCheck = inState.indexOf(inCheck)
    if (findCheck === -1) {
      inState.push(inCheck)
    } else {
      inState.splice(findCheck, 1)
    }
    setCategorySelect(inState)
    if (inState.length > 0) {
      searchFilters({ category: inState })
    } else {
      getProductList()
    }
  }

  // Filter By Price
  useEffect(() => {
    searchFilters({ price })
  }, [ok])

  const handlePrice = (value) => {
    setPrice(value)
    setTimeout(() => {
      setOk(!ok)
    }, 300)
  }
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Filter Products</h1>
      <div>
        <h1 className="text-2xl font-semibold mb-2">Category</h1>
        {categoryList.length > 0 && categoryList.map((category) => {
          return <div key={category.id} className="flex gap-2">
            <input type="checkbox" name={category.name} id={category.name} value={category.id} onChange={handleCheck} />
            <label htmlFor={category.name}>{category.name}</label>
          </div>
        })}
      </div>
      <div>
        <h1 className="text-2xl font-semibold mb-2">Price</h1>
        <div>
          <Slider range min={0} max={1000} defaultValue={[0, 0]} onChange={handlePrice} />
        </div>
      </div>
    </div>
  )
}

export default SearchBar