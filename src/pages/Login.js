import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { api } from '../utils/Api';

function Login() {

    const navigate = useNavigate();
    const [isVaid, setIsValid] = useState(true);
    useEffect(() => {
        if (localStorage.getItem("x-eoeo-dddd-dddd-eoeo")) {
            navigate('/');
        }
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        let email = document.getElementById('email').value;
        formData.append('email', email);
        let password = document.getElementById('password').value;
        formData.append('password', password)
        if (password.length < 7) {
            setIsValid(false);
            setTimeout(() => {
                setIsValid(true);
                password = '';
                email = '';
            }, 2000);
        }
        else {
            const req = await fetch(`${api}/auth/login`, {
                method: "POST",
                body: formData,
            });
            var res = await req.json();
            if (req.status === 200) {
                localStorage.setItem('x-eoeo-dddd-dddd-eoeo', res.data.token);
                localStorage.setItem('x-eoeo-dddd-dddd-eoeo-eeee', res.data._id);
                navigate('/');
            } else {
                setIsValid('error')
                setTimeout(() => {
                    setIsValid(true);
                    password = '';
                    email = '';
                }, 2000);
            }

        }
    }
    return (
        <Wrapper>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-container">
                    {
                        isVaid && (
                            <strong>Login as an author</strong>
                        )
                    }
                    {
                        isVaid === false && (
                            <strong className="error">Password does not meet requirement</strong>
                        )
                    }
                    {
                        isVaid === "error" && (
                            <strong className="error">Your login details is incorrect</strong>
                        )
                    }
                    <div className="elements">

                        <div className="el"><input type="email" id="email" placeholder="Your valid emial address please" /></div>
                        <div className="el"><input type="password" id="password" placeholder="Your password, 7 characters or more" /></div>
                    </div>
                </div>
                <div className="btn">
                    <button type="submit">Login</button>
                </div>
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.main`
    background:#000211;
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    .error{
        color:red !important;
    }
    .form{
        display:flex;
        flex-direction:column;
        gap:2rem;
        .btn{
            display:flex;
            flex-direction:column;
            width:100%;
            button{
                padding:15px;
                background:rgb(4,10,24);
                width:100%;
                color:#ccc;
                /* text-align:left; */
                cursor:pointer;
                font-size:15px;
                font-weight:700;
                border:2px solid #fff;
                border-radius:5px;
            }
        }
    }
    .form-container{
        width:30vw;
        border:3px solid #ccc;
        background:rgb(4, 10,24);
        display:flex;
        flex-direction:column;
        padding:1rem;
        border-radius:5px;

        strong{
            font-size:1.1rem;
            color:#ccc;
            padding-top:1rem;
            text-align:center;
            padding-bottom:1rem;
        }

        .elements{
            width:100%;
            .el{
                padding:10px 0;
                input{
                    width:100%;
                    height:40px;
                    background:transparent;
                    border:2px solid #ccc;
                    color:#ccc;
                    border-radius:5px;
                    &::placeholder{
                        padding-left:3px;
                    }
                    &:focus{
                        outline:none;
                        padding-left:3px;
                    }
                }
            }
        }
    }
@media(max-width:1400px){
     .form-container{
        width:50vw;
    }
}
@media(max-width:1200px){
    .form-container{
        width:60vw;
    }
}
@media(max-width:500px){
    .form-container{
        width:80vw;
    }
}
`
export default Login;