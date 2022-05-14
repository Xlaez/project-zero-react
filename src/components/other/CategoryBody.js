import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { apiHost } from '../../utils/Api';

function CategoryBody({ articles }) {
    const navigate = useNavigate();
    const [id, setId] = useState(undefined);
    const handleSinglePage = async (ids) => {
        setId(ids)
    }
    const handleSinglePageNav = async () => {
        localStorage.setItem('x-eoeo-dddd-dddd-eoeo-axax', id);
        navigate('/single')
    }
    return (
        <Wrapper>
            <div className="ow-article-show">
                {
                    articles.map((article) => {
                        return (
                            <div className='ow-article' key="article._id">
                                <Link to="#" className="effect-lily">
                                    <div>
                                        <img src={`${apiHost}/${article.image}`} alt="" onClick={() => handleSinglePage(article._id)} onDoubleClick={() => handleSinglePageNav()} />
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
                                </Link>
                            </div>
                        )
                    })
                }
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
.ow-article-show{
    padding: 5rem 8rem;
    margin:0 auto;
    max-width:90vw;
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
            height:350px;
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
.Footer{
    padding:2rem;
    background:rgb(4, 10,24);
    text-align:center;
    color:#fff;
    border-top:1px solid #00000076;
}
@media(max-width:500px){
    .ow-article-show{
    padding: 5rem 3rem;
    grid-template-columns:repeat(1, 1fr);
    gap:2rem;

    .ow-article{
        img{
            height:220px;
        }
    }
}
}
`

export default CategoryBody