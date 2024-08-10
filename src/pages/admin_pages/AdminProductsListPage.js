import { Table, Image, Button } from "react-bootstrap";
import { useState } from "react";
import AddProductPage from "./AddProductPage";

const AdminProductsListPage = () => {
  const [showingAdd, setShowingAdd] = useState(false)
  const localProducts = localStorage.getItem('products')
  const products = JSON.parse(localProducts)
  const localCategories = localStorage.getItem('categories')
  const categories = JSON.parse(localCategories)
  const rows = products.map(product => {
    const category = categories.find(category => {
      const matching = category.id === product.category
      return matching
    })
    return (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>
          <Image
            src={product.image}
            width={200}
            height={200}
          />
        </td>
        <td>{product.description}</td>
        <td>{category.name}</td>
        <td>{product.price}</td>
        <td>{product.quantity}</td>
      </tr>
    )
  })
  function handleShowAdd () {
    setShowingAdd(true)
  }
  if (showingAdd) {
    return <AddProductPage />
  }
  return (
    <>
      <Button onClick={handleShowAdd}>Show Add</Button>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    </>
  )
};

export default AdminProductsListPage;
