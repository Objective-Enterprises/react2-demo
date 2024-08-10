import { useState } from 'react'
import AlertMessage from '../../components/AlertMessage';
import AdminProductsListPage from './AdminProductsListPage';
import { Button, Form, Image, Dropdown } from 'react-bootstrap';

const AddProductPage = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [quantity, setQuantity] = useState('')
  const [success, setSuccess] = useState()
  const [failure, setFailure] = useState()
  const [showingList, setShowingList] = useState(false)
  function handleNameChange (event) {
    setName(event.target.value)
    setSuccess(undefined)
    setFailure(undefined)
  }
  function handleDescriptionChange (event) {
    setDescription(event.target.value)
    setSuccess(undefined)
    setFailure(undefined)
  }
  function handlePriceChange (event) {
    setPrice(event.target.value)
    setSuccess(undefined)
    setFailure(undefined)
  }
  function handleImageChange (event) {
    setImage(event.target.value)
    setSuccess(undefined)
    setFailure(undefined)
  }
  function handleCategoryChange (value) {
    console.log('value', value)
    setCategory(value)
    setSuccess(undefined)
    setFailure(undefined)
  }
  function handleQuantityChange (event) {
    setQuantity(event.target.value)
    setSuccess(undefined)
    setFailure(undefined)
  }
  function handleSubmit (event) {
    event.preventDefault()
  }
  const successAlert = success && (
    <AlertMessage variant='success' message={success} />
  )
  const failureAlert = failure && (
    <AlertMessage variant='danger' message={failure} />
  )
  function handleShowList () {
    setShowingList(true)
  }
  if (showingList) {
    return <AdminProductsListPage />
  }
  const localCategories = localStorage.getItem('categories')
  const categories = JSON.parse(localCategories)
  const options = categories.map(category => {
    return (
      <Dropdown.Item key={category.id} eventKey={category.id}>
        {category.name}
      </Dropdown.Item>
    )
  })
  console.log('categories', categories)
  const selectedCategory = categories.find(localCategory => {
    console.log('category', category)
    const number = parseInt(category.trim())
    console.log('number', number)
    console.log('category.id', localCategory.id)
    const match = localCategory.id === number
    console.log('match', match)
    return match
  })
  console.log('selectedCategory', selectedCategory)
  const categoryName = selectedCategory
    ? selectedCategory.name
    : 'Select Category'
  return (
    <>
      <Button onClick={handleShowList}>Show List</Button>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={handleNameChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            onChange={handleDescriptionChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={price}
            onChange={handlePriceChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control
            value={image}
            onChange={handleImageChange}
          />
          <Image
            src={image}
            width={200}
            height={200}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Dropdown onSelect={handleCategoryChange}>
            <Dropdown.Toggle>
              {categoryName}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {options}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
      </Form>
    </>
  )
};

export default AddProductPage;