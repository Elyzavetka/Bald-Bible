import likebutton from './static/like.png';
import { useState } from 'react';
import './likeButton.css';
import LikeAmountDisplay from '../LikesAmountDisplay/LikesAmountDisplay';
import baseUrl from '../../../util/baseUrl';
import { useNavigate } from 'react-router-dom';



//Make one request to the backend - Is the UserID in the array of liked images? Yes - remove it, No - add it. Display array length as likes amount

const LikeButton = (props) => {
    const [reRender, setReRender] = useState("");
    const navigate = useNavigate();
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

            const response = await fetch(`${baseUrl}/api/image/${props.imageId}/likes`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'userId': userId,
                },
                body: JSON.stringify({ 
                    imageId: props.imageId,
                    userId: userId 
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                setReRender(responseData.message);
            } else {
                console.error('Failed to access userID array');
                console.log(props.imageId)
                console.log(userId)
            }
        } catch (error) {
            console.error('Error in fetching or parsing data:', error);
            // Redirect to the login page
            // window.location.href = `/login`;
            const userDecision = window.confirm(
            'You need to be logged in to like the image. Do you want to go to the login page?'
        );

        if (userDecision) {
              // If the user clicks OK, navigate to the login page
            navigate('/login');
        } else {
              // If the user clicks Cancel, you can handle it here (e.g., do nothing or show a message)
            console.log('User decided to stay on the post page without liking the image.');
        }
        }
    };


    const handleSubmitLikes = async (e) => {
    e.preventDefault();
        checkIfUserHasLikedImage()
    };

    return (
    <>
    <div className='likescontainer'>
        <form onSubmit={handleSubmitLikes}>
            <button
            className='likeButton'
            type='submit'
            onClick={handleSubmitLikes}
            >
            <img src={likebutton} alt='Like' />
            </button>
        </form>
    
        <LikeAmountDisplay className='likeamount' imageId={ props.imageId } rerender={ reRender } />
        </div>
        </>
    );
};

export default LikeButton;