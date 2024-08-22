import { useState } from 'react'
import './App.css'
import Nav from './components/Nav/Nav'
import Dropbox from './components/Dropbox/Dropbox'
import useLocalStorage from "use-local-storage"





function App() {  

  const [loading, setLoading] = useState(false)
  const [isDark, setIsDark] = useLocalStorage(false)


  return (
    <div className="container" data-theme={isDark ? "dark" : "light"}>
      <Nav isDark={isDark} setIsDark={setIsDark}/>
      <Dropbox loading={loading} setLoading={setLoading}/>
    </div> 

        
  )
}


export default App