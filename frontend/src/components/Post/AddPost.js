
const AddPost = (props) => {
    const AddPostHandler = async() => {
        try{
            const res = await fetch('http://localhost:5000/api/post/add-post',{
                method: 'post',
                body: JSON.stringify({
                    content: "asdasdasdasd",
                    imageUrl: "asdasdas",
                }),
                headers: { 'Content-Type': 'application/json',Authorization: 'Bearer ' +  props.token}
            });
    
            if(!res.ok){
                const error = await res.json();
                throw error;
            }
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log('error message: ',error.message);
            //if user not auth return to sign in page
        }
    }
    return <div>
        <div>
        <span>add text</span>
        <span>add image</span>
        </div>
        <div>
            <span>share to</span>
            <button onClick={AddPostHandler}>post</button>
        </div>
    </div>
}

export default AddPost;