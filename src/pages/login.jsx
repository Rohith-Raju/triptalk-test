import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/pages/login.module.css';
import GoogleButton from 'react-google-button';
import { useHistory } from 'react-router-dom';
import Slider from '../components/silder';
import gsap from 'gsap';

// custom  hooks import

import { useAuth } from '../contexts/Authcontext';

const login = () => {
  let emailref = useRef('');
  let passwordRef = useRef('');
  const history = useHistory();
  const [error, seterror] = useState();
  const { Googlesignup, currentuser, emailPasswordSignIn } = useAuth();
  var display = useRef();

  const google_popup = async () => {
    Googlesignup()
      .then((res) => console.log(res))
      .catch((err) => seterror(err.message));
  };

  const formSubmit = (e) => {
    e.preventDefault();
    emailPassword(emailref.value, passwordRef.value)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  //const email_signup = async () => {};

  useEffect(() => {
    gsap.to(display, {
      duration: 1,
      css: {
        opacity: 1,
      },
      delay: 2,
    });
  });

  return (
    <React.Fragment>
      <Slider page={'Sign in'} backgroundColor={'#e4cb58'} />
      <div ref={(e) => (display = e)} className={styles.display}>
        <nav className={styles.nav}>
          <img
            onClick={() => history.push('/')}
            src={process.env.PUBLIC_URL + '/icons/tt logo.png'}
            alt="logo"
          />
          <ul>
            <li>
              Not a member? <Link to="/signup">Sign up</Link>
            </li>
          </ul>
        </nav>
        <section className={styles.signin}>
          <div className={styles.sidebar}>
            <header>
              <h3>The world is you're Playground</h3>
            </header>
            <div className={styles.image}>
              <img src={process.env.PUBLIC_URL + '/images/plane.svg'} alt="" />
            </div>
          </div>
          <div className={styles.inputdiv}>
            <h4>{error ? error : ''}</h4>
            <form onSubmit={formSubmit}>
              <h2>Sign in to Trip-Talk</h2>
              <GoogleButton onClick={google_popup} />
              <hr className={styles.borderline} />
              <label htmlFor="Email">Email</label>
              <input ref={(e) => (emailref = e)} type="email" />
              <label htmlFor="Password">Password</label>
              <input ref={(e) => (passwordRef = e)} type="password" />
              <input type="submit" value="Sign in" />
            </form>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default login;