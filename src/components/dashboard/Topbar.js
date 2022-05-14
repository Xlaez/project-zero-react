import React from 'react'
import styled from 'styled-components';

function Topbar() {
    return (
        <Wrapper>
            <strong>Author's dashboard</strong>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    height:15vh;
    background:rgb(4, 10, 24);
    color:#fff;
    display:flex;
    flex-direction:column;
    justify-content:center;
    strong{
        font-size:1rem;
        padding-left:1rem;
    }
    @media(max-width:900px){
        display:none;
    }
`

export default Topbar