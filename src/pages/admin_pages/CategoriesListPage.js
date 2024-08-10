import { Button, Table } from 'react-bootstrap'
import { useState } from 'react'
import AddCategoryPage from './AddCategoryPage';

const CategoriesListPage = () => {
  const [showingAdd, setShowingAdd] = useState(false)
  const localCategories = localStorage.getItem('categories')
  const categories = JSON.parse(localCategories)
  const rows = categories.map((category) => {
    return (
      <tr key={category.id}>
        <td>{category.id}</td>
        <td>{category.name}</td>
        <td>{category.description}</td>
      </tr>
    )
  })
  function handleShowAdd () {
    setShowingAdd(true)
  }
  if (showingAdd) {
    return <AddCategoryPage />
  }
  return (
    <>
      <Button onClick={handleShowAdd}>Add Category</Button>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    </>
  )
};

export default CategoriesListPage;
