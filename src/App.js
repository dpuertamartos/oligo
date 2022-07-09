import { useState, useEffect, useRef } from 'react'
import oligoService from './services/oligos'
import loginService from './services/login'
import Oligos from './components/Oligos'
import Filter from './components/Filter'
import AddOligoForm from './components/AddOligoForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'


const App = () => {
  const [oligos, setOligos] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [newSearch, setNewSearch] = useState("Search sequence")
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    oligoService
      .getAll()
      .then(initialOligos => {
        setOligos(initialOligos)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      oligoService.setToken(user.token)
    }
  }, [])

  const addOligo = (oligoObject) => {
    oligoFormRef.current.toggleVisibility()
    oligoService
      .create(oligoObject)
      .then(returnedOligo => {
        setOligos(oligos.concat(returnedOligo))
        setErrorMessage(
          [`oligo ${oligoObject.sequence} was added to server`,"confirmation"]
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const updateOligo = (id, newsequence) => {
    const oligo = oligos.find(o => o.id === id)
    const changedOligo = {...oligo, sequence: newsequence}

    oligoService
      .update(id, changedOligo)
      .then(returnedOligo =>{
        setOligos(oligos.map(oligo => oligo.id !== id ? oligo : returnedOligo))
      })
      .catch(error => {
        setErrorMessage(
          [`oligo ${oligo.sequence} was already deleted from server`,"error"]
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setOligos(oligos.filter(n=>n.id !== id))
      })
  }

  const deleteOligo = id => {
    const oligo = oligos.find(o => o.id === id)
    if(window.confirm(`do you want delete oligo with ID: ${id} and sequence: ${oligo.sequence}?`)){
      oligoService
        .remove(id)
        .then(()=>{
          setOligos(oligos.filter(n => n.id !== id))
          setErrorMessage(
            [`oligo ${oligo.sequence} was deleted from server`,"confirmation"]
          )
        })
        .catch(error => {
          setErrorMessage(
            [`oligo ${oligo.sequence} was already deleted from server`,"error"]
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setOligos(oligos.filter(n=>n.id !== id))
        })
    }
  }
  
  

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value.toUpperCase())
  }

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

  const oligosToShow = showAll
    ? oligos
    : oligos.filter(oligo=>oligo.sequence.includes(newSearch) )

  const oligoFormRef = useRef()

  return (
    <div>
      <h1>Oligos</h1>
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
      <Filter ipValue={newSearch} ipOnChange={handleSearchChange}/>
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? 'filter OFF, click to activate' : 'FILTER ON, click to deactivate'}
      </button>
      <Oligos oligosToShow = {oligosToShow} editOligo ={updateOligo} deleteOligo = {deleteOligo} />
      {user !== null &&
      <Togglable buttonLabel="new oligo" ref={oligoFormRef}>
        <AddOligoForm
          createOligo={addOligo}
        />
      </Togglable>
      }
      {user !== null && <div>{user.name} logged-in</div>}
    </div>
  )
}

export default App;
