import React, { useState } from 'react'
import { BsGithub, BsTwitter, BsYoutube, BsFacebook } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import image from '../../public/images/about-01.jpg'
import { api } from '../utils/Api'

function About({ handleChangeNav, changeBody }) {
    let [invalid, setInvalid] = useState(false);
    const sendMsg = async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const passwd = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        const formData = new FormData();
        if (email.length < 5 || passwd.length < 2 || message.length < 5) {
            setInvalid(true);
            setTimeout(() => {
                setInvalid(false);
            }, 2000);
        } else {
            formData.append('email', email)
            formData.append('name', passwd)
            formData.append('message', message)

            const req = await fetch(`${api}/contact`, {
                method: "POST",
                body: formData,
            });
            if (req.ok) {
                changeBody(null);
            }
        };
    }
    return (
        <Wrapper>
            <div className="ow-nav-essential">
                <div className="dropdown">
                    <ul>
                        <li>
                            <GiHamburgerMenu className="menu-bar" onClick={() => handleChangeNav()} />

                        </li>
                    </ul>
                </div>
                <div className="socials">
                    <ul>
                        <li>
                            <Link to="https://google.com">
                                <BsFacebook />
                            </Link>
                        </li>
                        <li>
                            <Link to="https://google.com">
                                <BsTwitter className="i-twitter" />
                            </Link>
                        </li>
                        <li>
                            <Link to="https://google.com">
                                <BsYoutube className="i-youtube" />
                            </Link>
                        </li>
                        <li>
                            <Link to="https://google.com">
                                <BsGithub />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="Header">
                <img src={`${image}`} alt="" />
            </div>
            <div className="Contact">
                <form className="form" onSubmit={(e) => sendMsg(e)}>
                    <div className="form-container">
                        {
                            !invalid && (
                                <strong>Contact OwaBlog</strong>
                            )
                        }
                        {
                            invalid && (
                                <strong className="error">Check your form again</strong>
                            )
                        }
                        <div className="elements">

                            <div className="el"><label htmlFor="name">Full name</label><input type="text" id="name" /></div>
                            <div className="el"><label htmlFor="email">Email address</label><input type="email" id="email" /></div>
                            <div className="el"><label htmlFor="message">Message</label><textarea cols="30" rows="10" id="message"></textarea></div>
                        </div>
                    </div>
                    <div className="btn">
                        <button type="submit">Send</button>
                    </div>
                </form>
            </div>
            <div className="Footer">
                <div>
                    <span>OwaBlog 2022 Copyright &copy;</span>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
height:100vh;
overflow-y:auto;
overflow-x:hidden;
background:#fff;
display:flex;
flex-direction:column;
.error{
    color:red !important;
}
.Header{
    padding:2rem 3rem;
    img{
        width:100%;
    }
}
.ow-nav-essential{
        display:flex;
        align-items:center;
        background:#131324;
        justify-content:space-between;
        padding:.1rem 0;
        position:relative;
        .socials{
            padding-right:3rem;
            ul{
                display:flex;
                flex-direction:row;
                align-items:center;
                justify-content:center;
                gap:1rem;
                li{
                    list-style:none;
                    background:rgb(4, 10, 24);
                    padding:.5rem;
                    border-radius:3px;
                    .i-youtube{
                        color:red;
                    }
                    .i-twitter{
                        color:cornflowerblue;
                    }
                    a{
                        text-decoration:none;
                        color:#fff;
                    }
                }
            }
        }
        .dropdown{

            .menu-bar{

                background:#fff;
                display:inline-block;
                position:relative;
                cursor:pointer;
                padding:.5rem;
                border-radius:.3rem;
            }
            li{
            list-style:none;

            }
            .menu-bar{
                color:#131324;
                font-size:1.3rem;
            }  
        }
}
.Contact{
    display:flex;
    flex-direction:column;   
    width:100%;
    padding:2rem 1rem;
.form{
    width:90%;
    /* margin:0 auto; */
        display:flex;
        flex-direction:column;
        gap:2rem;
        .btn{
            display:flex;
            flex-direction:column;
            width:100%;
            align-items:center;
            justify-content:center;
            button{
                padding:20px 60px;
                background:#131324;
                /* width:100%; */
                color:#ccc;
                /* text-align:left; */
                cursor:pointer;
                font-size:15px;
                font-weight:700;
                border:2px solid #fff;
                border-radius:5px;
                transition:all 1s ease-out;
                &:hover{
                    background:rgb(4,10,24)
                }
            }
        }
    }
    .form-container{
        width:100%;
        /* border:3px solid #ccc; */
        background:transparent;
        display:flex;
        flex-direction:column;
        padding:1rem;
        border-radius:5px;

        strong{
            font-size:1.1rem;
            color:#777;
            padding-top:1rem;
            text-align:center;
            padding-bottom:1rem;
        }

        .elements{
            width:100%;
            .el{
                padding:10px 0;
                label{
                    color:#666;
                    padding-bottom:.3rem;
                    display:block;
                }
                input{
                    width:100%;
                    height:40px;
                    background:transparent;
                    border:2px solid #ccc;
                    color:#000;
                    border-radius:5px;
                    &::placeholder{
                        padding-left:3px;
                    }
                    &:focus{
                        outline:none;
                        padding-left:3px;
                    }
                }
                textarea{
                    width:100%;
                    display:block;
                    background:transparent;
                    border:2px solid #ccc;
                    border-radius:.5rem;
                    padding-top:5px;
                    padding-left:5px;
                    color:#000;
                     &:focus{
                        outline:none;
                        padding-left:3px;
                    }
                }
            }
        }
    }
}
.Footer{
    padding:2rem;
    background:rgb(4, 10,24);
    text-align:center;
    color:#fff;
    border-top:1px solid #00000076;
}
@media(max-width:500px){
    .Header{
    padding:2rem 1rem;
    img{
        width:100%;
        height:300px;
    }
}
.Contact{
.form{
    width:90%;
        gap:1rem;
        .btn{
            button{
                padding:10px 20px;
                font-weight:500;
                border:1px solid #fff;
                border-radius:3px;
            }
        }
    }
    .form-container{
        width:100%;
        background:transparent;
        display:flex;
        flex-direction:column;
        padding:1rem 0;
        .elements{
            .el{
                input{
                    &:focus{
                        padding-left:2px;
                    }
            }
        }
    }
}
}
`

export default About