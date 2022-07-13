import { useState, useEffect } from 'react'
import oligoService from './services/oligos'
import geneService from './services/genes'
import plasmidService from './services/plasmids'
import loginService from './services/login'
import Oligos from './components/Oligos'
import Genes from './components/Genes'
import Plasmids from './components/Plasmids'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initializeOligos } from './reducers/oligoReducer'
import { initializeGenes } from './reducers/geneReducer'
import { initializePlasmids } from './reducers/plasmidReducer'


const App = () => {
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    dispatch(initializeOligos())
    dispatch(initializeGenes())
    dispatch(initializePlasmids()) 
  },[dispatch]) 

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log(user.token)
      oligoService.setToken(user.token)
      console.log(user.token)
      geneService.setToken(user.token)
      console.log(user.token)
      plasmidService.setToken(user.token)
      console.log(user.token)
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
      geneService.setToken(user.token)
      plasmidService.setToken(user.token)
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

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    oligoService.setToken(null)
    geneService.setToken(null)
    plasmidService.setToken(null)
    setErrorMessage(["logged out","confirmation"])
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  

  return (
    <div>
      {user !== null && <div>{user.name} logged-in <span><button onClick={()=>handleLogout()}>Log-out</button></span></div>}
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
      <Oligos setErrorMessage={setErrorMessage} user={user} />
      <h1>Genes</h1>
      <Genes setErrorMessage={setErrorMessage} user={user} />
      <h1>Plasmids</h1>
      <Plasmids setErrorMessage={setErrorMessage} user={user} /> 
    </div>
  )
}

export default App;
