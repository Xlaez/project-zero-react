import React from 'react'
import { BsArrowLeftCircleFill, BsPen, BsPersonCircle, BsPersonFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { apiHost } from '../../utils/Api';
//eslint-ignore-next-line
function Sidebar({ user, setTabState, tabState }) {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <div className="profile">
                {
                    user.isProfile ? (
                        <img src={`${apiHost}/${user.profile}`} alt="" />
                    ) : (
                        <BsPersonCircle />
                    )
                }
                <span>{user.name}</span>
            </div>
            <div className="dash-items">
                <div onClick={() => setTabState('profile')}>
                    <BsPersonFill />
                    <span>Profile</span>
                </div>
                <div onClick={() => setTabState('create')}>
                    <BsPen />
                    <span>Create</span>
                </div>
                <div onClick={() => navigate('/')}>
                    <BsArrowLeftCircleFill />
                    <span>Back</span>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
background:#131324;
color:#fff;
height:100vh;
max-height:100vh;
display:flex;
flex-direction:column;

.profile{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    border-bottom:1px solid #999;
    gap:1rem;
    img{
        width:4rem;
        height:4rem;
        border-radius:50%;
    }
    svg{
        font-size:4rem;
        background:#fff;
    }
    span{
        padding-bottom:.5rem;
    }
}
.dash-items{
    width:100%;
    display:flex;
    flex-direction:column;
    background:rgb(4,10,24);
    overflow-y:auto;
    div{
        color:#fff;
        border-bottom:.7px solid #ffffff37;
        padding:30px;
        display:flex;
        align-items:center;
        justify-content:center;
        gap:1rem;
        transition:all 1s ease-out;
        cursor:pointer;
        &:hover{
            background:#ffffff37;

        }
    }
}
@media(max-width:1200px){
    height:30vh;
    max-height:40vh;
    .profile{
        padding:1rem;
    }
}
`

export default Sidebar