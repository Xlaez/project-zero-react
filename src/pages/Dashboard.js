import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import Sidebar from '../components/dashboard/Sidebar';
import Dashbody from '../components/dashboard/Body';
import { api } from '../utils/Api';
import { useNavigate } from 'react-router-dom';
function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [tabState, setTabState] = useState('default');
    const userId = localStorage.getItem('x-eoeo-dddd-dddd-eoeo-eeee')
    const accessToken = localStorage.getItem('x-eoeo-dddd-dddd-eoeo');
    const headers = {
        Authorization: accessToken,
    }

    useEffect(() => {
        async function getUser() {
            const req = await fetch(`${api}/auth/${userId}`, {
                method: "GET",
                headers,
            });
            if (req.status === 400) {
                localStorage.removeItem('x-eoeo-dddd-dddd-eoeo')
                localStorage.removeItem('x-eoeo-dddd-dddd-eoeo-eeee')
                navigate('/login');
            } else if (req.status === 200) {
                const res = await req.json();

                setUser(res.data);
            } else {
                localStorage.removeItem('x-eoeo-dddd-dddd-eoeo')
                localStorage.removeItem('x-eoeo-dddd-dddd-eoeo-eeee')
                navigate('/login');
            };
        }
        getUser();
    }, []);

    return (
        <Wrapper>
            {user.name && (
                <Sidebar user={user} setTabState={setTabState} tabState={tabState} />
            )}
            <Dashbody tabState={tabState} setTabState={setTabState} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
display:grid;
height:100vh;
width:100vw;
overflow-x:hidden;
overflow-y:hidden;
grid-template-columns:20% 80%;
@media(max-width:900px){
    display:flex;
    flex-direction:column;
}
`

export default Dashboard