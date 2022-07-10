import { useState, useEffect, useRef } from 'react'
import oligoService from './services/oligos'
import loginService from './services/login'
import Oligos from './components/Oligos'
import Genes from './components/Genes'
import Plasmids from './components/Plasmids'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'


const App = () => {
  
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      oligoService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      oligoService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage(['Wrong credentials',"error"])
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  

  return (
    <div>
      {user !== null && <div>{user.name} logged-in</div>}
      <Notification message={errorMessage} />
      {user === null && 
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
      }
      <h1>Oligos</h1>
      <Oligos setErrorMessage={setErrorMessage} user={user}/>
      <h1>Genes</h1>
      <Genes />
      <h1>Plasmids</h1>
      <Plasmids /> 
    </div>
  )
}

export default App;
