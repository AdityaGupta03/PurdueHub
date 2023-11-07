import { Link } from 'react-router-dom'
import './register.scss'

const Register = () => {
  return (
    <div className='register'>
      <div className="card">
        <div className="left">
          <h1>Register For PurdueHub</h1>
          <p>Come and join in the fun at PurdueHub! Socialize with your friends, customize your own calendar, join clubs, look up class information, and so much more!</p>
          <span>Already have an account?</span> 
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
      
  )
}

export default Register