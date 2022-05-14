import React, { useState, useEffect } from 'react'
import { BsArrowLeft } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { api, apiHost } from '../../utils/Api';
import ArticleNav from './ArticleNav';

export default function SingleArticle() {
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const id = localStorage.getItem('x-eoeo-dddd-dddd-eoeo-axax');

    const headers = {
        Authorization: localStorage.getItem('x-eoeo-dddd-dddd-eoeo'),
    }

    useEffect(() => {
        async function setViews() {
            await fetch(`${api}/articles/views/${id}`, {
                method: "POST",
            });
        }
        setViews();
    }, [])
    const handleFormDelete = async (e) => {
        e.preventDefault();
        const req = await fetch(`${api}/articles/${id}`, {
            method: 'DELETE',
            headers,
        });
        if (req.ok) {
            navigate('/');
            localStorage.removeItem('x-eoeo-dddd-dddd-eoeo-axax');
        } else {
            navigate('/');
        }
    }
    useEffect(() => {

        async function getArticle() {
            if (!id) {
                navigate('/');
            } else {
                const req = await fetch(`${api}/articles/${id}`, {
                    method: "GET",
                });
                const res = await req.json();
                if (req.status === 200) {
                    // localStorage.removeItem('x-eoeo-dddd-dddd-eoeo-axax');
                    setArticle(res.data);
                } else if (req.status === 400) {
                    navigate('/');
                } else {
                    navigate('/');
                }
            }
        }
        getArticle();
    }, []);
    return (
        <Wrapper>
            <ArticleNav />
            {
                article !== null && (
                    <div className="ow-blog-single">
                        <div className="article">
                            <strong>{article.title}</strong>
                            <small>By {article.author}</small>
                            <small>Published on: {new Date(article.updatedAt).toDateString()}</small>
                            {/* <small>Views: {article.views}</small> */}
                            <div>
                                <img src={`${apiHost}/${article.image}`} alt="" />
                            </div>
                            <p>{article.content}</p>
                            <span onClick={() => navigate('/')}>
                                <BsArrowLeft />
                                back to home
                            </span>
                        </div>
                        {
                            headers.Authorization && (
                                <div className="article-split">
                                    <div>
                                        <Link to="/edit-article">Edit</Link>
                                    </div>
                                    <form onSubmit={(e) => handleFormDelete(e)}>
                                        <button type="submit">Delete</button>
                                    </form>
                                </div>
                            )
                        }
                    </div>
                )
            }
            <div className="Footer">
                <div>
                    <span>All rights reserved, OwaBlog &copy; copyright 2022</span>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.main`
display:flex;
flex-direction:column;

.article-nav{
    display:flex;
    align-items:center;
    justify-content:space-between;
    background:rgb(4, 10, 24);
    padding:1rem 4rem;
    .logo{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        span{
            font-size:1.5rem;
            cursor:pointer;
            color:#fff;
        }
    }
    .home-page{
        display:flex;
        align-items:center;
        justify-content:center;
        gap:1.2rem;
        span{
            cursor:pointer;
            transition:all 1s ease-out;
            font-size:16px;
            border-bottom:2px solid transparent;
            color:#fff;
            &:hover{
                border-bottom:2px solid #999;
            }
        }
    }
    .socials{
        ul{
        display:flex;
        align-items:center;
        justify-content:center;
        gap:.8rem;
        li{
            list-style:none;
            cursor:pointer;
            padding:.5rem;
            background:#131324;
            border-radius:.3rem;
        }
        a{
            text-decoration:none;
            color:#fff;
        }
        }
    }
}
.ow-blog-single{
    max-width:90vw;
    margin:0 auto;
    margin-top:2rem;
    .article-split{
        display:flex;
        margin:2rem 0; 
        flex-direction:row;
        align-items:center;
        justify-content:center;
        gap:3rem;
        div{
            a{
                color:#ccc;
                text-decoration:none;
            }
            padding:20px 40px;
            border-radius:5px;
            background:#131324;
            transition:all .5s ease-out;
            cursor:pointer;
                &:hover{
                    opacity:0.7;
                }
        };
        form{
            display:flex;
            flex-direction:column;
            align-items:center;
            button{
                padding:20px 40px;
                border-radius:5px;
                background:red;
                cursor:pointer;
                color:#131313;
                border:1px solid transparent;
                transition:all .5s ease-out;
                &:hover{
                    opacity:0.7;
                }
            }
        }
    }
    .article{
        background:#131324;
        padding:2rem 3rem;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        strong{
            font-size:1.3rem;
            color:#999;
            padding-bottom:1rem;
            text-transform:capitalize;

        }
        small{
            font-size:15px;
            font-weight:700;
            color:yellow;
            padding-bottom:2rem;
        }
        span{
            color:yellow;
            display:flex;
            align-items:center;
            justify-content:center;
            gap:.5rem;
            cursor:pointer;
            transition:all 1s ease-in-out;
            &:hover{
                opacity:0.7;
            }
        }
        div{
            width:100%;
            img{
                width:100%;
                max-height:400px;
                padding-bottom:1rem;
            }
        }
        p{
            width:100%;
            color:#999;
            line-height:1.7;
            overflow-wrap:break-word;
            text-align:center;
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
    .ow-blog-single{
    max-width:96vw;
    .article-split{
        gap:2rem;
        div{
            padding:10px 20px;
            border-radius:3px;
        };
        form{
            button{
                padding:10px 20px;
                border-radius:3px;
            }
        }
    }
    .article{
        background:#131324;
        padding:2rem 1rem;
        strong{
            font-size:1.2rem;
            text-align:center;
        }
        small{
            font-size:14px;
        }
    
    }
}
}
`