import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './views/Main'
import UpdateMember from './views/UpdateMember'

function App() {
  const path = window.location.pathname.replace(/\/+$/, '')

  if (path === '/update') {
    return <UpdateMember />
  }

  return (
    <div>
        <Header />
        <Main/>
        <Footer/>
    </div>

  )
}

export default App
