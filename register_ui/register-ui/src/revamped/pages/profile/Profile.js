import './profile.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';

import EmailIcon from '@mui/icons-material/Email';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // more info

const Profile = () => {
  return (
    <div className="profile">
      <div className='images'>
        <img src="https://www.purdue.edu/uns/images/2021/campus-imageLO.jpg" alt='' className='cover' />
        <img src="https://business.purdue.edu/masters/images/2023_kal_798611.jpg" alt='' className='profilePic' />
        <div className='profileContainer'>
          <div className='uInfo'>

            <div className='left'>
              <a href="https://www.facebook.com/">
                <FacebookIcon fontSize='large' />
              </a>
              <a href="https://www.twitter.com/">
                <TwitterIcon fontSize='large' />
              </a>
              <a href="https://www.instagram.com/">
                <InstagramIcon fontSize='large' />
              </a>
              <a href="https://www.linkedin.com/">
                <LinkedInIcon fontSize='large' />
              </a>
            </div>

            <div className='center'>
              <span>Username</span>
              <div className='info'>
                <div className='item'>
                  <PlaceIcon/>
                  <span>USA</span>
                </div>
                <div className='item'>
                  <LanguageIcon/>
                  <span>English</span>
                </div>
              </div>
              <button>Follow</button>
            </div>

            <div className='right'>
              <EmailIcon/>
              <MoreVertIcon/>
            </div>

          </div>

          <div className='bioInfo'>

          </div>
          <div className='bioInfo'>

          </div>
          
        </div>

      </div>
    </div>
  )
}

export default Profile