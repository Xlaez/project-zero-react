import React, { useEffect, useState } from 'react'
import { api } from '../../utils/Api';
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { BsGithub, BsLinkedin, BsPersonCircle } from 'react-icons/bs'

export default function Profile() {
    const navigate = useNavigate();
    const articleId = localStorage.getItem('x-eoeo-dddd-dddd-eoeo-axax');
    const [author, setAuthor] = useState(null);
    const [authorDetails, setAuthorDetails] = useState(null);

    async function getAuthor(id) {
        const req = await fetch(`${api}/articles/${id}`);
        const res = await req.json();
        if (req.ok) {
            setAuthor(res.data.author);
        } else {
            navigate('/single');
        }
    };

    async function getAuthorDetails(name) {
        const req = await fetch(`${api}/auth/name/${name}`);
        const res = await req.json();
        if (req.ok) {
            setAuthorDetails(res.data);
        } else {
            getAuthor(articleId);
        };
    };

    useEffect(() => {
        getAuthor(articleId);
    }, []);

    useEffect(() => {
        if (author !== null) {
            getAuthorDetails(author);
        }
    }, [author]);

    return (
        <Wrapper>
            {
                authorDetails !== null && (
                    <div className="author-profile">
                        <div className="img-section">
                            {
                                authorDetails.isProfile ? (
                                    <BsPersonCircle />
                                ) : (
                                    <img src={authorDetails.profile} alt="avatar" />
                                )
                            }
                            <span>{authorDetails.name}</span>
                        </div>
                        <div className="text-section">
                            <ul>
                                <li><a href={authorDetails.github}>
                                    <BsGithub /> </a><span>Github </span></li>
                                <li>
                                    <a href={authorDetails.linkedin}>
                                        <BsLinkedin /> </a><span>LinkedIn </span></li>
                                <li><span>Stack: </span> <small>React | JavaScript | Scss | Vue</small></li>
                            </ul>
                        </div>
                    </div>
                )
            }
            <div className="back">
                <button>
                    <Link to='/single'>back</Link>
                </button>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    background:#131324;
    .author-profile{
        width:40vw;
        background:#00000076;
        padding:2rem;
        border:2px solid #131324;
        border-radius:10px;
        display:grid;
        grid-template-columns:56% 40%;
        gap:1rem;
        .img-section{
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            gap:1rem;

            span{
                color:#999;
                font-size:1.1rem;
                font-weight:700;
            }
        }
        img{
            width:9rem;
            height:9rem;
        };
        svg{
            font-size:9rem;
            color:#999;
        }
    }
    .text-section{
        padding:.1rem;
        ul{
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:left;
            gap:.8rem;
            li{
                color:#ffffff37;
                svg{
                    font-size:1rem !important; 
                }
                a{
                    cursor:pointer;
                    text-decoration:none;
                    color:#ccc;
                }
                list-style:none;
            }
        }
    }
.back{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    padding:2rem;
    button{
        background:#ffffff37;
        color:#131313;
        padding:10px 20px;
        border-radius:5px;
        border:1px solid transparent;
        cursor:pointer;
        a{
        text-decoration:none;
        color:#131324;
        }
    }
}
@media(max-width:990px){
    .author-profile{
        width:80vw;
        .img-section{
            img{
                width:6.5rem;
                height:6.5rem;
            }
            svg{
                font-size:6.5rem;
            }
        }
    }
}
@media(max-width:500px){
    .author-profile{
        display:flex;
        flex-direction:column;
        gap:2rem;
        width:80vw;
        .img-section{
            img{
                width:4rem;
                height:4rem;
            }
            svg{
                font-size:4rem;
            }
        }
    }
}
`