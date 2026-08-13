import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './views/Main'
import UpdateMember from './views/UpdateMember'
import Privacy from './views/Privacy'

function App() {
  const path = window.location.pathname.replace(/\/+$/, '')

  if (path === '/update') {
    return <UpdateMember />
  }

  if (path === '/privacy') {
    return <Privacy />
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
