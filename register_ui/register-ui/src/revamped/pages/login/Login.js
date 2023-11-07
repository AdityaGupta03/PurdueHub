import { Link } from 'react-router-dom'
import './login.scss'

const Login = () => {
  return (
    <div className='login'>
      <div className="card">
        <div className="left">
          <h1>Welcome To PurdueHub</h1>
          <p>An application targeted to students of Purdue University to enrich their lives!</p>
          <span>Don't have an account?</span> 
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
      
  )
}

export default Login