import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faO, faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BsDashCircleFill, BsHouseFill, BsTelephoneFill, BsFacebook, BsTwitter, BsGithub, BsYoutube, BsPeopleFill, BsMenuButtonFill } from 'react-icons/bs';
import '../styles/HomeBase.css';
import { api } from '../utils/Api';
import Contact from './Contact';
import About from './About';
import uuid from '../utils/Random';
import EmptyArticles from '../components/other/EmptyArticles';
import Footer from '../components/other/Footer';

function HomeBase() {
    const [body, changeBody] = useState(null);
    const [id, setId] = useState(undefined);
    let [totalItems, setTotalItems] = useState(0);
    let [nav, setNav] = useState(false);
    let [nav2, setNav2] = useState(false);
    let [currentPage, setCurrentPage] = useState(1);
    let [disablePageNav, setDisablePageNav] = useState(false);
    const articlesPerPage = 4;

    const [articles, setArticles] = useState([]);
    const navigate = useNavigate()
    const handleSignout = () => {
        localStorage.removeItem("x-eoeo-dddd-dddd-eoeo");
        navigate('/login')
    }
    const handleSinglePage = async (ids) => {
        setId(ids)
    }
    const handleSinglePageNav = async () => {
        localStorage.setItem('x-eoeo-dddd-dddd-eoeo-axax', id);
        navigate('/single')
    }


    const handleChangeNav = () => {
        setNav(!nav);
    }
    const handleMoveNav = () => {
        setNav2(!nav2)
        setNav(!nav)
    }
    let page = currentPage;
    const accessToken = localStorage.getItem('x-eoeo-dddd-dddd-eoeo');
    useEffect(() => {
        async function getArticles() {
            const req = await fetch(`${api}/articles?page=${page}`, {
                method: "GET",
            });
            const res = await req.json();
            if (req.ok) {
                setArticles(res.data);
                setTotalItems(res.totalItems);
            } else {
                console.log('an error occured')
            }
        }
        getArticles();
    }, []);
    const setCurrentPage1 = async (page) => {
        setCurrentPage(page);
        const req = await fetch(`${api}/articles?page=${page}`, {
            method: "GET",
        });
        const res = await req.json();
        if (req.ok) {
            setArticles(res.data);
        } else {
            console.log('an error occured')
        }
    }

    const setCurrentPageNext = async () => {
        const nextPage = currentPage + 1;
        const req = await fetch(`${api}/articles?page=${nextPage}`, {
            method: "GET",
        });
        const res = await req.json();
        if (req.ok) {
            setArticles(res.data);
            setCurrentPage(nextPage)
        } else {
            console.log('an error occured')
        }
    }

    const setPreviousPage = async () => {
        const nextPage = currentPage - 1;
        if (currentPage > 1) {
            const req = await fetch(`${api}/articles?page=${nextPage}`, {
                method: "GET",
            });
            const res = await req.json();
            if (req.ok) {
                setArticles(res.data);
                setCurrentPage(nextPage)
            } else {
                // setDisablePageNav
                console.log('an error occured')
            }
        } else {
            setDisablePageNav(true);
        }
    }

    return (
        <Wrapper>
            {
                nav === false && (
                    <nav className="ow-nav">
                        <div className="ow-about">
                            <div className="circle">
                                <p> <FontAwesomeIcon icon={faO} color="yellow" /> </p>
                            </div>
                            <div className="name">
                                <strong>OwaBlog</strong>
                            </div>
                        </div>
                        <div className="nav-links">
                            <div className="link-n">
                                <div className="link" onClick={() => changeBody(null)}>
                                    <BsHouseFill />
                                    BlogHome
                                </div>
                                {
                                    accessToken ? (
                                        <div className="link" onClick={() => navigate('/dash')}>
                                            <BsDashCircleFill />
                                            Dashboard
                                        </div>
                                    ) : (
                                        <div className="link" onClick={() => changeBody('contact')}>
                                            <BsPeopleFill />
                                            About Us
                                        </div>

                                    )
                                }
                                <div className="link" onClick={() => changeBody('about')}>
                                    <BsTelephoneFill />
                                    Contact Us
                                </div>

                            </div>
                            {
                                accessToken && (
                                    <div className="link-sep">
                                        <div className="link">
                                            <FontAwesomeIcon icon={faSignIn} color="white" />
                                            <Link to='/login'>
                                                Admin SignIn
                                            </Link>
                                        </div>
                                        <div className="link"
                                            onClick={() => handleSignout()}>
                                            <FontAwesomeIcon icon={faSignOut} color="white" />
                                            Admin Signout
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </nav>
                )
            }
            {
                nav && <div>
                    {
                        nav2 && (
                            <div className="section-nav">
                                <div className="nav-links">
                                    <div className="link-n">
                                        <div className="link" onClick={() => changeBody(null)}>
                                            <BsHouseFill />
                                            BlogHome
                                        </div>
                                        {
                                            accessToken ? (
                                                <div className="link" onClick={() => navigate('/dash')}>
                                                    <BsDashCircleFill />
                                                    Dashboard
                                                </div>
                                            ) : (
                                                <div className="link" onClick={() => changeBody('contact')}>
                                                    <BsPeopleFill />
                                                    About Us
                                                </div>

                                            )
                                        }
                                        <div className="link" onClick={() => changeBody('about')}>
                                            <BsTelephoneFill />
                                            Contact Us
                                        </div>

                                    </div>
                                    {
                                        accessToken && (
                                            <div className="link-sep">
                                                <div className="link">
                                                    <FontAwesomeIcon icon={faSignIn} color="white" />
                                                    <Link to='/login'>
                                                        Admin SignIn
                                                    </Link>
                                                </div>
                                                <div className="link"
                                                    onClick={() => handleSignout()}>
                                                    <FontAwesomeIcon icon={faSignOut} color="white" />
                                                    Admin Signout
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                    {
                        nav2 === false && (
                            <div className="sections-articles">
                                <strong>Categories we write on</strong>
                                <small>click to navigate the sections</small>
                                <div className="dropdown-result">
                                    <div onClick={() => navigate('/category/webdev')}>web development</div>
                                    {/* <div>mobile development</div> */}
                                    <div onClick={() => navigate('/category/design')}>web design</div>
                                    <div onClick={() => navigate('/category/python')}>python programming</div>
                                    <div onClick={() => navigate('/category/linux')}>linux and bash scripting</div>
                                </div>
                            </div>
                        )
                    }
                </div>
            }

            {
                body === null && (
                    <section className="ow-section">
                        <div className="ow-nav-essential">
                            <div className="dropdown">
                                <ul>
                                    <li>
                                        <GiHamburgerMenu className="menu-bar" onClick={() => handleChangeNav()} />

                                    </li>
                                    <li>
                                        <BsMenuButtonFill className="menu-bar-mini" onClick={() => handleMoveNav()} />
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
                                        <Link to="https://github.com/Xlaez">
                                            <BsGithub />
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                        </div>
                        {
                            articles.length !== 0 ? (
                                <div className="ow-article-show">
                                    {
                                        articles.map((article) => {
                                            return (
                                                <div className='ow-article' key={uuid()}>
                                                    <li className="effect-lily">
                                                        <div>
                                                            <img src={article.image} alt="" onClick={() => handleSinglePage(article._id)} onDoubleClick={() => handleSinglePageNav()} />
                                                        </div>
                                                        <small>double click on the image to view </small>
                                                        <strong>{article.title}</strong>
                                                        <p>
                                                            {article.descr}
                                                        </p>
                                                        <legend>
                                                            <span>In {article.category}</span>

                                                            <span>{new Date(article.createdAt).toDateString()}</span>
                                                        </legend>
                                                        <legend className="legend2">
                                                            <span>{article.views} views</span>
                                                            <span>by {article.author}</span>
                                                        </legend>
                                                    </li>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <EmptyArticles />
                            )
                        }

                        {
                            totalItems > 0 && (
                                <div className="pre-footer">
                                    <div className="first-btn">
                                        <button className={`exp ${disablePageNav === false ? 'exp-n' : ''}`} onClick={() => setPreviousPage()}>Previous</button>
                                        <button className={`btn-2 ${articles.length < articlesPerPage ? 'exp-dis' : ''}`} onClick={() => setCurrentPageNext()}>Next</button>
                                    </div>
                                    <div className="second-btn">
                                        <button className="exp">pages</button>
                                        <button onClick={() => setCurrentPage1(1)}>1</button>
                                        <button onClick={() => setCurrentPage1(2)}>2</button>
                                        <button onClick={() => setCurrentPage1(3)}>3</button>
                                        <button onClick={() => setCurrentPage1(4)}>4</button>
                                    </div>
                                    <div className="third-btn">
                                        <span>Total Items: {totalItems}</span>
                                    </div>
                                </div>
                            )
                        }
                        <Footer />
                    </section>
                )
            }
            {
                body === 'contact' && (
                    <Contact handleChangeNav={handleChangeNav} />
                )
            }
            {
                body === "about" && (
                    <About handleChangeNav={handleChangeNav} changeBody={changeBody} />
                )
            }

        </Wrapper>
    )
};

const Wrapper = styled.main`
height:100vh;
width:100vw;
overflow-x:hidden;
overflow-y:auto;
display:grid;
grid-template-columns:25% 75%;
background:#000211;
transition:all 1s ease-out;
.second-btn{
    padding-right:2rem;
}
.third-btn{
    color:#888;
}
.show-nav{
    background:#131324;
    display:flex !important;
    flex-direction:column !important;
}
.ow-nav{
    background:transparent;
    display:flex;
    overflow-x:hidden;
    flex-direction:column;
    gap:2rem;
    height:100vh;
    overflow-y:auto;
    width:100%;
    &::-webkit-scrollbar{
    width:.3rem;
    background:#131324;
    cursor:pointer;
    border-radius:.3rem;
    &-thumb{
        background:#999;
        width:.2rem;
        border-radius:.3rem;
    }
    
}
    .ow-about{
        display:flex;
        /* height:50%: */
        flex-direction:column;
        padding-top:4rem;
        border-bottom:1px solid #fff;
        padding-bottom:5rem;
        align-items:center;
        justify-content:center;
        width:100%;
        gap:.3rem;
        .circle{
            height:5rem;
            width:5rem;
            border-radius:50%;
            background:#131324;
            color:yellow;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            p{
                color:#131324;
                svg{
                    color:yellow;
                    font-size:2.5rem;
                }
            }

        }
        .name{
            color:#fff;
            font-size:1.8rem;
            padding-top:2rem;
            display:flex;
            flex-direction:column;

        }
    }
     
}
.nav-links{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        width:100%;
        gap:.3rem;
        .link{
            width:100%;
            height:50px;
            background:transparent;
            display:flex;
            align-items:center;
            justify-content:center;
            gap:1rem;
            color:#fff;
            font-size:1.3rem;
            cursor:pointer;
            &:hover{
                color:yellow;
                svg{
                    color:yellow;
                }
                a{
                    color:yellow;
                }
            }
            svg{
                color:#fff;
                font-size:1.3rem;
            }
            a{
                color:#fff;
                text-decoration:none;
            }
        }  
        .link-n{
            padding:1rem 0;
            .link{
                padding:1rem 0; 
            }
        }
        .link-sep{
            padding-top:3rem;
        }      
    }
.ow-section{
    background:#fff;
    display:flex;
    flex-direction:column;
    overflow-y:scroll;
    max-height:100vh;
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
            ul{
                display:flex;
            align-items:center;
            justify-content:center;
            gap:2rem;
            }
            .menu-bar, .menu-bar-mini{

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
            .menu-bar, .menu-bar-mini{
                color:#131324;
                font-size:1.3rem;
            }
        }
    }
}
.sections-articles{
    display:flex;
    flex-direction:column;
    justify-content:center;
    color:#fff;
    height:100%;
    width:100%;
    strong{
        padding-bottom:1rem;
        text-transform:capitalize;
        font-size:1.4rem;
        padding-left:2rem;
    }
    small{
        color:yellow;
        padding-bottom:2rem;
        padding-left:2rem;
    }
    .dropdown-result{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:1rem;
        width:100%;
        background:#00000037;
        padding:2rem;
        div{
            list-style:none;
            width:100%;
            font-size:1rem;
            cursor:pointer;
            &:hover{
                color:yellow;
            }
        }
    }
}
.ow-article-show{
    padding: 5rem 8rem;
    display:grid;
    grid-template-columns:repeat(2, 1fr);
    gap:6rem;
    .ow-article{
        border-bottom:4px solid #131313;
        padding-bottom:3rem;
        margin-bottom:2rem;
        text-decoration:none;
        div{
            display:block;
            position:relative;
            
        }
        strong{
            color:#001;
            padding:1rem 0 2rem 0;
            font-size:1.4rem;
            font-weight:500;
            text-decoration:none;
        }
        p{
            padding:1rem 0 2rem 0;
            line-height:1.7;
            text-decoration:none;
            color:#999;
            opacity:0.9;
              overflow-wrap: break-word;

        }
        img{
            padding-bottom:2rem;
        }
        small{
            /* padding-bottom:2rem; */
            color:rgb(4, 10,24);
            font-size:12px;
            display:block;
            font-size:700;
        }
        legend{
            display:flex;
            align-items:center;
            justify-content:space-between;
            color:#222;
            border-bottom:1px solid #999;
            padding-bottom:1.5rem;
            margin-bottom:1.3rem;
        }
        .legend2{
            margin-bottom:0;
            padding-bottom:0;
            color:#999;
            border-bottom:none;
        }
    }
}

.pre-footer{
    margin-top:4rem;
    padding-bottom:2rem;
    display:flex;
    padding-left:3rem;
    padding-right:3rem;
    align-items:center;
    justify-content:space-between;
    .first-btn{
        display:flex;
        align-items:center;
        justify-content:center;
        gap:2rem;
        .exp{
            background:transparent;
            color:#888;
            border:none;
            cursor:not-allowed;
        }
        .exp-dis{
            cursor:not-allowed;
        }
        button{
            padding:20px 30px;
            border-radius:5px;
            color:#fff;
            cursor:pointer;
            background:#131324;
            border:1px solid transparent;
        }
    }
    .second-btn{
        display:flex;
        align-items:center;
        justify-content:center;
        gap:1rem;
        button{
            color:#fff;
            border-radius:5px;
            background:#131324;
            font-size:1.1rem;
            padding:1rem 1.4rem;
            cursor:pointer;
            border:1px solid transparent;
        }
        .exp{
            background:transparent;
            color:#888;
            border:none;
            cursor:not-allowed;
        }
        .exp-n{
            cursor:pointer !important;
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
@media(min-width:1001px){
    .menu-bar-mini{
        display:none !important;
    }
}
@media(max-width:1000px){
    grid-template-columns:99%;
    .menu-bar-mini{
        display:initial !important;
    }
    .ow-nav{
        display:none;
    }
    .second-btn{
        padding-right:0;
        padding-bottom:2rem;
    }
    .sections-articles{
    transition:all 1s ease-out;
    strong{
        padding-top:2rem;
    }
    }
    .nav-links{
        display:flex;
        flex-direction:column;
        align-items:left !important;
        justify-content:left !important;
        padding:1rem 0;
        max-height:200px;
        overflow-y:hidden; 
    }
}
@media(max-width:440px){
    width:100vw;
    .nav-links{
        gap:.1rem;
        .link{
            height:20px;
            gap:1rem;
            font-size:1rem;
            svg{
                font-size:1rem;
            }
        }  
        .link-n{
            padding:.5rem 0;
            .link{
                padding:.5rem 0; 
            }
        }
        .link-sep{
            padding-top:1rem;
            .link{
                padding:.5rem 0;
            }
        }      
    }
    .ow-article-show{
    padding: 5rem 3rem;
    display:grid;
    grid-template-columns:repeat(1, 1fr);
    gap:2rem;
    .ow-article{
        border-bottom:3px solid #131313;
        padding-bottom:2rem;
        margin-bottom:1rem;
        
    }

}
  .pre-footer{
    margin-top:1rem;
    padding-bottom:1.5rem;
    padding-left:.1rem;
    padding-right:.1rem;
    align-items:center;
    justify-content:space-between;
    flex-direction:column;
    .first-btn{
        padding-bottom:2rem;
        gap:1rem;
        button{
            padding:7px 15px;
            border-radius:3px;
        }
        padding-bottom:1rem;
    }
    .second-btn{
        gap:1rem;
        button{
            border-radius:3px;
            font-size:1rem;
            padding:7px 15px;
        }
    }
}
}}  
}
@media(max-width:410px){
    .ow-section{
    .ow-nav-essential{
    
        .socials{
            padding-right:.1rem;
            
        }
        .dropdown{
            .menu-bar, .menu-bar-mini{
                font-size:1rem;
            }
        }
    }
}
}
`

export default HomeBase