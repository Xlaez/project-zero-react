import React from 'react'
import styled from 'styled-components';
import coverImage from '../../public/images/about-01.jpg';
import { GiHamburgerMenu } from 'react-icons/gi'
import { BsFacebook, BsTwitter, BsGithub, BsYoutube } from 'react-icons/bs';
import { Link } from 'react-router-dom'
import image2 from '../../public/images/about-02.jpg';
import image3 from '../../public/images/about-03.jpg';
import image4 from '../../public/images/about-04.jpg';
// import image5 from '../../public/images/about-05.jpg';


function Contact({ handleChangeNav }) {
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
                <div>
                    <img src={coverImage} alt="" className="owa-image-spread" />
                </div>
                <h2>About OwaBlog</h2>
                <p>OwaBlog is a blog owned and managed by the <b>BlackCops</b> team of developers who write articles on a daily basis to teach, tutor and give assistant to devlopers out there, mostly targeted at beginners and mid-level develpers.We provide top-notch programming articles and answers to your programming languages and framework comparisons. If you want to join as an author on this blog, <Link to="/signup"> click here</Link></p>.
            </div>
            <div className="Contact">
                <h2>OwaBlog Team</h2>
                <div className="img-glide">
                    <div>
                        <img src={image2} alt="" />
                        <span>Utibeabasi Ekong <small>Software developer | Javascript | Typescript |Python | Bash</small> </span>
                    </div>
                    <div>
                        <img src={image3} alt="" />
                        <span>Ayomide Alonge  <small>Software developer | Python | Django </small> </span>
                    </div>
                    <div>

                        <img src={image4} alt="" />
                        <span>Alexis Dennis, <small>Web developer | Javascript  | React | Vue </small> </span>
                    </div>
                </div>
            </div>
            <div className="Footer">
                <div>
                    <span>All rights reserved, OwaBlog &copy; copyright 2022</span>
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
.Header{
    padding:4rem 5rem;
    display:flex;
    flex-direction:column;
    h2{
        text-align:left;
        font-size:1.6rem;
        color:#777;
        padding:1rem 0;
    }
    div{
        width:100%;
        img{
            width:100%;
            padding-bottom:2rem;
            height:500px;
        }
    }
    p{
        line-height:1.7;
        color:#777;
        a{
            text-decoration:none;
            color:#131324;
            font-size:16px;
        }
    }
}
.Contact{
    padding:2rem 5rem;
    display:flex;
    flex-direction:column;
    h2{
        color:#777;
        text-align:left;
        padding-bottom:1rem;
    }
    .img-glide{
        display:grid;
        grid-template-columns:repeat(3, 1fr);
        gap:2rem;
        div{
            width:100%;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            span{
                font-size:13px;
                color:#888;
            }
        }
    }
    img{
        width:100%;
        height:300px;
        padding-bottom:.5rem;
    }
}
.Footer{
    padding:2rem;
    background:rgb(4, 10,24);
    text-align:center;
    color:#fff;
    border-top:1px solid #00000076;
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
    @media(max-width:500px){
        .Header{
    padding:3rem 1rem;
    h2{
        font-size:1.5rem;
    }
    div{
        width:100%;
        img{
            width:100%;
            padding-bottom:2rem;
            height:300px;
        }
    }
}
.Contact{
    padding:2rem 1rem;
    .img-glide{
        display:grid;
        grid-template-columns:repeat(1, 1fr);
        gap:1.5rem;
    }
    img{
        width:100%;
        height:230px;
        padding-bottom:.5rem;
    }
}
    }
`

export default Contact