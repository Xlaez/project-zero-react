import React from 'react'
import styled from 'styled-components';
import { api } from '../../utils/Api';
import Topbar from './Topbar';
import { useNavigate } from 'react-router-dom'

function Body({ tabState, setTabState }) {
    const navigate = useNavigate();
    const headers = {
        Authorization: localStorage.getItem('x-eoeo-dddd-dddd-eoeo'),
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const title = document.getElementById('title').value;
        const descr = document.getElementById('descr').value;
        const content = document.getElementById('content').value;
        const category = document.getElementById('category').value;
        const image = document.getElementById('image2').files[0];
        if (image === null || title === null || content === null) {
            console.log("please add required fieds");
        } else {
            formData.append('title', title)
            formData.append('descr', descr);
            formData.append('content', content);
            formData.append('image', image);
            formData.append('category', category);
            const req = await fetch(`${api}/articles`, {
                method: "POST",
                headers,
                body: formData,
            });
            if (req.status === 201) {
                navigate('/');
            } else {
                console.log("an error occured");
            }
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const image = document.querySelector('#image').files[0];
        console.log(image);
        if (image) {
            formData.append('image', image)
            const req = await fetch(`${api}/auth`, {
                method: "PUT",
                headers,
                body: formData,
            });
            if (req.status === 201) {
                setTabState("default");
            }
            else if (req.status === 400) {
                console.log("user not found");
            }
            else {
                console.log('An error occured');
            };
        } else {
            console.log('image not found.');
        }
    }
    return (
        <Wrapper>
            <Topbar />
            {
                tabState === 'default' && (
                    ""
                )
            }
            {
                tabState === 'create' && (
                    <div className="ow-post">
                        <form className="form-container" onSubmit={(e) => handleCreatePost(e)}>
                            <div className="elements">
                                <div className="el">
                                    <label htmlFor="title">Article title</label>
                                    <input type="text" id="title" />
                                </div>
                                <div className="el">
                                    <label htmlFor="description">Article description</label>
                                    <input type="text" id="descr" />
                                </div>
                                <div className="el">
                                    <label htmlFor="category">Article category</label>
                                    <select id="category">
                                        <option value="webdev">
                                            Web development
                                        </option>
                                        <option value="linux">
                                            Linux
                                        </option>
                                        <option value="python">
                                            Python
                                        </option>
                                        <option value="ui">
                                            ui/ux
                                        </option>
                                    </select>
                                </div>
                                <div className="el">
                                    <label htmlFor="content">Article content</label>
                                    <textarea cols="30" rows="10" id="content">
                                    </textarea>
                                </div>
                                <div className="el">
                                    <label htmlFor="image">Article image</label>

                                    <input type="file" id="image2" />
                                </div>
                            </div>
                            <div className="btn">
                                <button type="submit">Publish</button>
                            </div>
                        </form>
                    </div>
                )
            }
            {
                tabState === 'profile' && (
                    <div className="profile-body">
                        <form onSubmit={(e) => handleFormSubmit(e)}>
                            <div className="form">
                                <div className="form-container">
                                    <strong>Add Profile Image</strong>
                                    <div className="elements">
                                        <div className="el">
                                            <input type="file" id="image" />
                                        </div>
                                    </div>
                                </div>
                                <div className="btn">
                                    <button type='submit'>Proceed</button>
                                </div>
                            </div>
                        </form>
                    </div>
                )
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
display:flex;
flex-direction:column;
height:100%;
overflow-y:auto;
width:100%;
.profile-body{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    width:100%;
    height:100%;
}
.form{
        display:flex;
        flex-direction:column;
        gap:2rem;
        .btn{
            display:flex;
            flex-direction:column;
            width:100%;
            button{
                padding:15px;
                background:rgb(4,10,24);
                width:100%;
                color:#ccc;
                /* text-align:left; */
                cursor:pointer;
                font-size:15px;
                font-weight:700;
                border:2px solid #fff;
                border-radius:5px;
            }
        }
    }
    .form-container{
        width:30vw;
        border:3px solid #ccc;
        background:rgb(4, 10,24);
        display:flex;
        flex-direction:column;
        padding:1rem;
        border-radius:5px;

        strong{
            font-size:1.1rem;
            color:#ccc;
            padding-top:1rem;
            text-align:center;
            padding-bottom:1rem;
        }

        .elements{
            width:100%;
            .el{
                padding:10px 0;
                input,select{
                    width:100%;
                    height:40px;
                    background:transparent;
                    border:2px solid #ccc;
                    color:#ccc;
                    border-radius:5px;
                    transition:all 1s ease-out;
                    &::-webkit-file-upload-button{
                        padding:1px 20px;
                        height:100%;
                        background:#131324;
                        color:yellow;
                        border:1px solid transparent;
                        cursor:pointer;
                    }
                    &:hover{
                        background:rgb(4, 10, 24);
                    }
                    &::placeholder{
                        padding-left:3px;
                    }
                    &:focus{
                        outline:none;
                        padding-left:3px;
                    }
                }
            }
        }
    }
    .ow-post{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        .form-container{
            width:95%;
            textarea{
                color:#999;
                width:100%;
                background:transparent;
            }
            .el{
                label{
                    display:block;
                    padding-bottom:.3rem;
                    color:#999;
                    font-weight:800;
                }
            }
            .btn{
            display:flex;
            flex-direction:column;
            width:100%;
            button{
                padding:15px;
                background:rgb(4,10,24);
                width:100%;
                color:#ccc;
                cursor:pointer;
                font-size:15px;
                font-weight:700;
                border:2px solid #fff;
                border-radius:5px;
                transition:all .8s ease-out;
                &:hover{
                    background:#131324;
                }
            }
        }
        }
    }
`

export default Body