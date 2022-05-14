import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { api } from '../../utils/Api';
import ArticleNav from '../other/ArticleNav';
import CategoryBody from '../other/CategoryBody';

function Python() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {

        async function getArticles() {
            const req = await fetch(`${api}/articles/category/python`, {
                method: "GET",
            });
            const res = await req.json();
            if (req.status === 200) {
                setArticles(res.data);
            } else {
                console.log('an errror occured');
            }
        }
        getArticles();
    }, []);

    return (
        <Wrapper>
            <ArticleNav />
            {
                articles.length !== 0 && (
                    <div className="article-body-ow">
                        <CategoryBody articles={articles} />
                    </div>
                )
            }
        </Wrapper>
    )
}

const Wrapper = styled.main`
display:flex;
flex-direction:column;
/* .article-body-ow{
    max-width:90vw;
    margin:0 auto;
} */
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
`

export default Python