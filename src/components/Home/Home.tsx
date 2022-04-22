import React, { useRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { register, login } from '../../state/actions/Books'
import { useNavigate } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import validator from 'validator'
import './Home.scss'

export default function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const err = useTypedSelector((state: any) => state.booksReducer.err)

  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loginError, setLoginError] = useState<string>('')
  const [registerError, setRegisterError] = useState<string>('')

  const loginRef = useRef(document.createElement('form'))
  const registerRef = useRef(document.createElement('form'))
  const buttonRef = useRef(document.createElement('div'))

  useEffect(() => {
    loginRef.current.style.left = '50px'
    registerRef.current.style.left = '450px'
    buttonRef.current.style.left = '0'
  }, [])

  useEffect(() => {
    if (!validator.isEmail(formFields.email)) {
      setLoginError('Enter valid email')
      setRegisterError('Enter valid email')
    } else if (
      formFields.password !== '' &&
      formFields.confirmPassword !== '' &&
      formFields.password !== formFields.confirmPassword
    ) {
      setRegisterError('Password does not match')
    } else if (
      formFields.password !== '' &&
      formFields.confirmPassword !== '' &&
      formFields.email !== ''
    ) {
      setRegisterError('')
    } else if (formFields.password !== '' && formFields.email !== '') {
      setLoginError('')
    } else {
      setLoginError('')
      setRegisterError('')
    }
  }, [formFields])

  const loginHandler = () => {
    loginRef.current.style.left = '50px'
    registerRef.current.style.left = '450px'
    buttonRef.current.style.left = '0'
  }

  const registerHandler = () => {
    loginRef.current.style.left = '-400px'
    registerRef.current.style.left = '50px'
    buttonRef.current.style.left = '110px'
  }

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (formFields.password === '' || formFields.email === '') {
      setLoginError('All fields are required')
      return
    }
    dispatch(login({ email: formFields.email, password: formFields.password }))
    if (err !== '') {
      setLoginError(err)
      return
    } else {
      navigate('/user')
    }
  }

  const onRegister = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      formFields.password === '' ||
      formFields.confirmPassword === '' ||
      formFields.email === ''
    ) {
      setRegisterError('All fields are required')
      return
    }
    dispatch(
      register({ email: formFields.email, password: formFields.password }),
    )
    navigate('/user')
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }
  return (
    <div className="home-section">
      <div className="header">
        <h1>Book Store </h1>
      </div>
      <div className="form-section">
        <div className="button-box">
          <div ref={buttonRef} id="btn"></div>
          <button
            type="button"
            onClick={loginHandler}
            className="toggle-button"
          >
            Login
          </button>
          <button
            type="button"
            onClick={registerHandler}
            className="toggle-button"
          >
            Register
          </button>
        </div>
        <form onSubmit={onLogin} ref={loginRef} className="input-group">
          <input
            className="input-field"
            id="email"
            type="email"
            placeholder="Enter Email"
            name="email"
            value={formFields.email}
            onChange={onChangeHandler}
            required
          />
          <input
            id="password"
            type="password"
            className="input-field"
            placeholder="Enter Password"
            name="password"
            value={formFields.password}
            onChange={onChangeHandler}
            required
          />
          {loginError && <p className="error">{loginError}</p>}
          <button type="submit" onClick={onLogin} className="submit-btn">
            Login
          </button>
        </form>
        <form onSubmit={onRegister} ref={registerRef} className="input-group">
          <input
            className="input-field"
            id="email"
            type="email"
            placeholder="Enter Email"
            name="email"
            value={formFields.email}
            onChange={onChangeHandler}
            required
          />
          <input
            id="password"
            type="password"
            className="input-field"
            placeholder="Enter Password"
            name="password"
            value={formFields.password}
            onChange={onChangeHandler}
            required
          />

          <input
            id="password"
            type="password"
            className="input-field"
            placeholder="Enter Confirm  Password"
            name="confirmPassword"
            value={formFields.confirmPassword}
            onChange={onChangeHandler}
            required
          />
          {registerError && <p className="error">{registerError}</p>}
          <button type="submit" onClick={onRegister} className="submit-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  )
}
