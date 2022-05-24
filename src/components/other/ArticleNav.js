import React from 'react'
import { BsFacebook, BsGithub, BsTwitter, BsYoutube } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';

function ArticleNav() {
    const navigate = useNavigate();
    return (
        <div className="article-nav">
            <div className="logo">
                <span onClick={() => navigate('/')}>OwaBlog</span>
            </div>
            <div className="home-page">
                <span onClick={() => navigate('/')}>HomePage</span>
                <span onClick={() => navigate('/category/webdev')}>Web development</span>
                <span onClick={() => navigate('/category/design')}>Web design</span>
                <span onClick={() => navigate('/category/linux')}>Linux</span>
                <span onClick={() => navigate('/category/python')}>Python</span>
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
    )
}

export default ArticleNav