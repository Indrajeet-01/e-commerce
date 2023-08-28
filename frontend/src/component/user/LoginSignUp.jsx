import React, { Fragment, useEffect, useRef, useState } from 'react'
import "./loginSignup.css"
import { MdFace, MdFace2, MdFace3, MdLockOpen, MdMailOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, login } from '../../redux/actions/userActions'



const LoginSignUp = () => {
    const dispatch = useDispatch()
   
    const {loading,isAuthenticated} = useSelector((state) => state.user)

    const loginTab = useRef(null)
    const switcherTab = useRef(null)
    const registerTab = useRef(null)

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
    })
    const {name,email,password} = user

    const [avatar,setAvatar] = useState()
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png")

    const loginSubmit =(e) => {
        e.preventDefault()
        dispatch(login(loginEmail, loginPassword))
    }
    const registerSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name",name)
        myForm.set("eamil",email)
        myForm.set("password",password)
        myForm.set("avatar",avatar)
        console.log("sign up form submitted")
    }

    const registerDataChange = (e) => {
        if(e.target.name === "avatar"){
            const reader = new FileReader()
            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } 
        else{
            setUser({...user, [e.target.name]: e.target.value})
        }

    }

    useEffect(() => {
        
    },[dispatch,isAuthenticated])
    

    const switchTabs = (e,tab) => {
        if(tab === "login"){
            switcherTab.current.classList.add("shiftToNeutral")
            switcherTab.current.classList.remove("shiftToRight")

            registerTab.current.classList.remove("shiftToNeutralForm")
            loginTab.current.classList.remove("shiftToLeft")
        }
        if(tab === "register"){
            switcherTab.current.classList.add("shiftToRight")
            switcherTab.current.classList.remove("shiftToNeutral")

            registerTab.current.classList.add("shiftToNeutralForm")
            loginTab.current.classList.add("shiftToLeft")
        }
    }

  return (
    <Fragment>
        <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
                <div>
                    <div className="login_signUp_toggle">
                        <p onClick={(e) => switchTabs(e,"login")}>Log In</p>
                        <p onClick={(e) => switchTabs(e,"register")}>Register</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>
                <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                    <div className="loginEmail">
                        <MdMailOutline/>
                        <input 
                            type="email"
                            placeholder='Email'
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            />
                    </div>
                    <div className="loginPassword">
                        <MdLockOpen/>
                        <input 
                            type="password"
                            placeholder='password'
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            />
                    </div>
                    <Link to="/password/forgot">Forget Password ?</Link>
                    <input type="submit" value="Login" className="loginBtn" />

                </form>
                <form
                    className='signUpForm'
                    ref={registerTab}
                    encType='multipart/form-data'
                    onSubmit={registerSubmit}
                    >
                        <div className="signUpName">
                            <MdFace/>
                            <input 
                                type="text" 
                                placeholder='name'
                                required
                                name='name'
                                value={name}
                                onChange={registerDataChange}
                                />
                        </div>
                        <div className="signUpEmail">
                        <MdMailOutline/>
                        <input 
                            type="email"
                            placeholder='Email'
                            required
                            name='email'
                            value={email}
                            onChange={registerDataChange}
                            />
                    </div>
                    <div className="signUpPassword">
                        <MdLockOpen/>
                        <input 
                            type="password"
                            placeholder='password'
                            required
                            name='password'
                            value={password}
                            onChange={registerDataChange}
                            />
                    </div>
                    <div id="registerImage">
                        <img src={avatarPreview} alt="avatar" />
                        <input 
                            type="file"
                            name='avatar'
                            accept='image/*'
                            
                            onChange={registerDataChange}
                            />
                    </div>
                    <input 
                        type="submit"
                        value="Register"
                        className='signUpBtn'
                        />
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default LoginSignUp