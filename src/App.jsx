import cheems from './assets/cheems.png'
import logo from './assets/logo.png'
import './index.css'

function App () {
  return (
    <div>
      <img
        className='logo'
        src={logo}
        alt='Juanse Dev Logo'
      />
      <img
        className='cheems'
        src={cheems}
        alt='Cheems building website'
      />
    </div>
  )
}

export default App
