import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import AlertMessage from '../components/AlertMessage';

const UserProfilePage = () => {
  const storedUser = sessionStorage.getItem('loggedInUser')
  const user = JSON.parse(storedUser)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState()
  const [failure, setFailure] = useState()
  function handleEmailChange (event) {
    setEmail(event.target.value)
    setSuccess(undefined)
    setFailure(undefined)
  }
  function handlePasswordChange (event) {
    setPassword(event.target.value)
    setSuccess(undefined)
    setFailure(undefined)
  }
  const successAlert = success && (
    <AlertMessage variant='success' message={success} />
  )
  const failureAlert = failure && (
    <AlertMessage variant='danger' message={failure} />
  )
  function handleSubmit (event) {
    event.preventDefault()
    console.log('email', email)
    console.log('password', password)
    const emailMissing = email === ''
    const passwordMissing = password === ''
    const missing = emailMissing || passwordMissing
    if (missing) {
      setFailure('Email and password are required')
      return
    }
    user.email = email
    user.password = password
    const localUsers = localStorage.getItem('users')
    const users = JSON.parse(localUsers)
    const newUsers = users.map(localUser => {
      const loggedIn = localUser.id === user.id
      if (!loggedIn) {
        return localUser
      }
      return user
    })
    const newUsersString = JSON.stringify(newUsers)
    localStorage.setItem('users', newUsersString)
    const localCredentials = localStorage.getItem('credentials')
    const credentials = JSON.parse(localCredentials)
    credentials[user.username] = password
    const credentialsString = JSON.stringify(credentials)
    localStorage.setItem('credentials', credentialsString)
    setSuccess('It worked!')
  }
  return (
    <Form onSubmit={handleSubmit}>
      {successAlert}
      {failureAlert}
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          value={email}
          onChange={handleEmailChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={password}
          onChange={handlePasswordChange}
        />
      </Form.Group>
      <Button type='submit'>
        Submit
      </Button>
    </Form>
  )
};

export default UserProfilePage;
