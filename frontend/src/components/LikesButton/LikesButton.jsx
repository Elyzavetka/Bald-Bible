import likebutton from './static/like.png';
import { useState } from 'react';
import './likeButton.css';
import LikeAmountDisplay from '../LikesAmountDisplay/LikesAmountDisplay';
import baseUrl from '../../../util/baseUrl';



//Make one request to the backend - Is the UserID in the array of liked images? Yes - remove it, No - add it. Display array length as likes amount

const LikeButton = (props) => {
    const [reRender, setReRender] = useState("");

    const checkIfUserHasLikedImage = async () => {
        try {
            const userId = window.localStorage.getItem("userId");
            const token = window.localStorage.getItem("token");

            // Check if both user ID and token are available
            if (!userId || !token) {
                // Log the error
                console.error("User ID or token is missing, user not logged in");
                // Throw an error to indicate the missing user ID or token
                throw new Error("User ID or token is missing, user not logged in");
            }

            const response = await fetch(`${baseUrl}/api/images/${props.image_id}/likes`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'userId': userId,
                },
                body: JSON.stringify({ 
                    imageId: props.image_id,
                    userId: userId 
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                setReRender(responseData.message);
            } else {
                console.error('Failed to access userID array');
            }
        } catch (error) {
            console.error('Error in fetching or parsing data:', error);
            // Redirect to the login page
            window.location.href = `/login`;
        }
    };


    const handleSubmitLikes = async (e) => {
    e.preventDefault();
        checkIfUserHasLikedImage()
    };

    return (
    <>
        <form onSubmit={handleSubmitLikes}>
            <button
            className='likeButton'
            type='submit'
            onClick={handleSubmitLikes}
            >
            <img src={likebutton} alt='Like' />
            </button><br />
            <LikeAmountDisplay image_id={ props.image_id } rerender={ reRender } />
        </form>
    </>
    );
};

export default LikeButton;