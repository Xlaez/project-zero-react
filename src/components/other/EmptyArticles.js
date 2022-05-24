import React from 'react'
import styled from 'styled-components';

function EmptyArticles() {
    return (
        <Container>
            <div className="empty-articles">
                <h4>There are no articles yet</h4>
                <p>The authors are working on publishing articles, soon you would have a lot to read</p>
                <span>&#128578;</span>
            </div>
        </Container>
    )
}

const Container = styled.div`
height:100%;

.empty-articles{
    height:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:1rem;
    h4{
        text-align:center;
        font-size:1.2rem;
        color:#777;
        padding-bottom:1rem;
    }
    p{
        color:#888;
        font-size:16px;
    }
    span{
        display:flex;
        align-items:center;
        font-size:4rem;
    }
}
@media(max-width:500px){
    h4{
        font-size:1rem;
    }
    span{
        font-size:3rem;
    }
}
`

export default EmptyArticles