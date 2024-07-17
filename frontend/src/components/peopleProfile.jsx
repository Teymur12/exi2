import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Header from './header';
import Footer from './footer';
import Loader from './loader';
import ViewFollowers from '../modals/viewFollowerModal';
import ViewFollow from '../modals/viewFollowModal';
import tate from '../image/atate.jpg';
import andrew from '../image/andrew.jpeg';
import { RiWindow2Line } from 'react-icons/ri';

const fetchUserProfile = async (userId) => {
    try {
        const response = await fetch(`/api/user/${userId}`);
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openFollowingModal, setOpenFollowingModal] = useState(false);

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const userData = await fetchUserProfile(id);
                setUser(userData);
            } catch (error) {
                setError(error.message);
            }
        };

        getUserProfile();
    }, [user]);

    const [posts,setPosts] = useState([])

    const getPosts = async () => {
        try {
            const response = await fetch(`/api/post/getuserpost/${id}`, {
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

    const handleFollowClick = async () => {
        try {
            const response = await fetch(`/api/auth/follow/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error({Error: `${response.status} ${response.statusText} - ${errorText}`});
                throw new Error('Network response was not ok');
            }
            const updatedUser = await response.json();
console.log(user);
            setUser(updatedUser);
        } catch (error) {
            console.error('Error following user:', error);
        }
    }
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>{<Loader />}</div>;

    const handleFollowersClick = () => {
        setOpenModal(true);
    };

    const handleFollowingClick = () => {
        setOpenFollowingModal(true);
    };

    return (
        <div>
            <Header />
            <div className="flex justify-center">
                <div className="grid mt-[20px]">
                    <div>
                        <div className="flex justify-evenly flex-wrap gap-y-3">
                            <div>
                                <img 
                                    className="rounded-full w-[165px] h-[165px]" 
                                    src={user.profilePic} 
                                    alt="Profile"
                                    // onError={(e) => e.target.src = tate} 
                                />
                            </div>
                            <div className="flex flex-col gap-y-5">
                                <div className="flex items-center gap-3">
                                    <p className="font-bold text-2xl">{user.userName}</p>
                                    <button 
                                        onClick={handleFollowClick}
                                        className={`border text-white w-[90px] h-[35px] rounded-[10px] ${user.following ? 'bg-gray-500' : 'bg-[#0095F6]'}`}
                                    >
                                        {user.following ? 'Unfollow' : 'Follow'}
                                    </button>
                                </div>
                                <div className="flex gap-3">
                                    <div className='flex gap-1'><p className='font-bold'>0</p>gonderi</div>
                                    <div className="flex gap-1 cursor-pointer" onClick={handleFollowersClick}>
                                        <p className="font-bold">{user.followers?.length }</p> followers
                                    </div>
                                    <div className="flex gap-1 cursor-pointer" onClick={handleFollowingClick}>
                                        <p className="font-bold">{user.following?.length}</p> following
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold">{user.fullName}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-[96px] border-t border-black pt-[15px]">
                            <div className="flex items-center gap-1">
                                <p><RiWindow2Line /></p>
                                <h1>POSTS</h1>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-wrap ml-0 lg:ml-[70px]">
                            <div className="flex gap-1 justify-center lg:justify-start flex-wrap max-w-screen-lg">
                                {posts.map((post) => (
                                    <a href="#" key={post._id}>
                                        <img className="w-[307px] h-[307px] object-cover" src={post.body} alt="Post" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ViewFollowers
                openModal={openModal}
                setOpenModal={setOpenModal}
                currentFollowers={user.followers || []}
            />
            <ViewFollow
                openFollowingModal={openFollowingModal}
                setOpenFollowingModal={setOpenFollowingModal}
                currentFollowing={user.following || []}
            />
            <Footer />
        </div>
    );
};

export default Profile;
