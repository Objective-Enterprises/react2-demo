import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import AlertMessage from '../../components/AlertMessage'
import CategoriesListPage from './CategoriesListPage';

const AddCategoryPage = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
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
  function handleSubmit (event) {
    event.preventDefault()
    const missingName = name === ''
    const missingDescription = description === ''
    const missing = missingName || missingDescription
    if (missing) {
      setFailure('Required field missing')
      return
    }
    const localCategories = localStorage.getItem('categories')
    const categories = JSON.parse(localCategories)
    const categoryIds = categories.map(category => {
      return category.id
    })
    const maximumId = Math.max(...categoryIds)
    const newId = maximumId + 1
    const newCategory = {
      id: newId,
      name,
      description
    }
    categories.push(newCategory)
    const categoriesString = JSON.stringify(categories)
    localStorage.setItem('categories', categoriesString)
    setSuccess('Added category')
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
    return <CategoriesListPage />
  }
  return (
    <>
      <Button onClick={handleShowList}>Show List</Button>
      {successAlert}
      {failureAlert}
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
        <Button type='submit'>Submit</Button>
      </Form>
    </>
  )
};

export default AddCategoryPage;
