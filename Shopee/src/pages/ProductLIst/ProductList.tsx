import ProductFilter from 'src/components/ProductFilter'
import Products from 'src/components/Products'
import SortProduct from 'src/components/SortProduct'

export default function ProductLIst() {
  return (
    <div className='pt-28 flex bg-slate-50 border-b-4 pb-24 border-shopee '>
      <ProductFilter />
      <div className='basis-5/6'>
        <SortProduct />
        <Products />
      </div>
    </div>
  )
}
