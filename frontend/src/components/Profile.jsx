import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from './header';
import Footer from './footer';
import tate from '../image/atate.jpg';
import andrew from '../image/andrew.jpeg';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiWindow2Line } from 'react-icons/ri';
import ViewFollowers from '../modals/viewFollowerModal';
import ViewFollow from '../modals/viewFollowModal';
import { Link } from 'react-router-dom';

const Profile = () => {
    const user = useSelector(state => state.user.user);
    const followersCount = Array.isArray(user.user.followers) ? user.user.followers.length : 0;
    const followingsCount = Array.isArray(user.user.following) ? user.user.following.length : 0;

    const [openModal, setOpenModal] = useState(false);
    const [currentFollowers, setCurrentFollowers] = useState(user.user.followers || []);
   
   const [openFollowingModal, setOpenFollowingModal] = useState(false)
    const [currentFollowing, setCurrentFollowing] = useState(user.user.following || []);
    
    const handleFollowersClick = () => {
        setOpenModal(true);
    };

    const [posts,setPosts] = useState([])

    const getPosts = async (userId) => {
        try {
            const response = await fetch(`/api/post/getuserpost/${user.user._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            setPosts(data.posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    
getPosts()
    const handleFollowingClick = () => {
        setOpenFollowingModal(true);
    };

    return (
        <div>
            <Header />
            <div className='flex justify-center'>
                <div className='grid mt-[20px]'>
                    <div>
                        <div className='flex justify-around flex-wrap gap-y-3'>
                            <div>
                                <img className='rounded-full w-[165px] h-[165px]' src={user.user.profilePic} alt='Profile' />
                            </div>
                            <div className='flex flex-col gap-y-5'>
                                <div className='flex items-center justify-between'>
                                    <p className='font-bold text-2xl'>{user.user.userName}</p>
                                    <Link to="/settings">
                                    <i className='text-2xl cursor-pointer'><IoSettingsOutline /></i>
                                    </Link>
                                </div>
                                <div className='flex gap-3'>
                                    <div className='flex gap-1'><p className='font-bold'>0</p> gönderi</div>
                                    <div className='flex gap-1 cursor-pointer' onClick={handleFollowersClick}><p className='font-bold'>{followersCount}</p>followers</div>
                                    <div className='flex gap-1 cursor-pointer' onClick={handleFollowingClick}><p  className='font-bold'>{followingsCount}</p>following</div>
                                </div>
                                <div>
                                    <p className='font-semibold'>{user.user.fullName}</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center mt-[96px] border-t border-black pt-[15px]'>
                            <div className='flex items-center gap-1'>
                                <p><RiWindow2Line /></p>
                                <h1>POSTS</h1>
                            </div>
                        </div>
                        <div className='mt-8 flex flex-wrap ml-0 lg:ml-[70px]'>
                            <div className='flex gap-1 justify-center lg:justify-start flex-wrap max-w-screen-lg'>
                                {posts.map((post) => (
                                    <a href="" key={post._id}>
                                        <img className='w-[307px] h-[307px] object-cover' src={post.body} alt='Post' />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
            <Footer />

            <ViewFollowers
                openModal={openModal}
                setOpenModal={setOpenModal}
                currentFollowers={currentFollowers}
            />
            <ViewFollow
            openFollowingModal={openFollowingModal}
            setOpenFollowingModal={setOpenFollowingModal}
            currentFollowing={currentFollowing}
            />
        </div>
    );
};

export default Profile;
