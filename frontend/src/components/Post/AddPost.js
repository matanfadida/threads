import { useContext, useEffect, useRef, useState } from "react";
import Context from "../context/context";
import classes from "./addPost.module.css";
import { PiPaperclipThin } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import Popup from "../UI/Popup";
import ButtonPost from "../UI/buttonPost";

const AddPost = () => {
  const ctx = useContext(Context);
  const [user, setUser] = useState({});
  const [styleInput, setStyleInput] = useState(true);
  const [showX, setshowX] = useState(false);
  const contentInputRef = useRef();
  const selectOption = useRef();

  useEffect(() => {
    const getUser = async () => {
      try {
        ctx.setLoadingHandler(true);
        const userId = localStorage.getItem("userId");
        const response = await fetch(
          `http://localhost:5000/api/user/get-user?userId=${userId}`,
          {
            headers: { Authorization: "Bearer " + ctx.token },
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw error;
        }

        const result = await response.json();
        setUser(result.data);
        ctx.setLoadingHandler(false);
      } catch (error) {
        ctx.setErrorHandler(error);
        ctx.setLoadingHandler(false);
        console.log("error message: ", error.message);
      }
    };
    if(ctx.showAddPopup){
      getUser();
    }
  }, []);

  const AddPostHandler = async () => {
    const formData = new FormData();
    const enterdContent = contentInputRef.current.value;
    const enterdSelectOption = selectOption.current.value;
    // const enterdImage = imageInputRef.current.files[0];
    formData.append("content", enterdContent);
    formData.append("showTo", enterdSelectOption);
    // formData.append("image", enterdImage);

    try {
      const res = await fetch("http://localhost:5000/api/post/add-post", {
        method: "post",
        body: formData,
        headers: {
          Authorization: "Bearer " + ctx.token,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        throw error;
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log("error message: ", error.message);
      //if user not auth return to sign in page
    }
  };

  const changeInput = (e) => {
    setStyleInput(false);
    if (+e.target.value.length === 0) {
      setshowX(false);
    } else {
      setshowX(true);
    }
    contentInputRef.current.style.height = "inherit";
    contentInputRef.current.style.height = `${contentInputRef.current.scrollHeight}px`;
  };

  const clearInput = () => {
    if (contentInputRef.current) {
      contentInputRef.current.value = "";
    }
    setStyleInput(true);
    setshowX(false);
  };

  const Close = () => {
    ctx.ChangePageHandler("addpost")
  }

  return (
    <Popup onClick={Close} show={ctx.showAddPopup} title={"New Threads"}>
    <div className={classes["post-main"]}>
        <div>
          <NavLink to={`profile/${user._id}`}>
            <img
              className={classes["post-img"]}
              src={"http://localhost:5000/" + user.image}
              alt={user.name}
            />
          </NavLink>
        </div>
        <div className={classes["side-two"]}>
          <div>
            <ul>
              <li className={classes["li-userName"]}>
                <NavLink
                  className={classes.userName}
                  to={`/profile/${user._id}`}
                >
                  <strong className={classes.name}>{user.userName}</strong>
                </NavLink>
                <span
                  onClick={clearInput}
                  className={showX ? "" : "display_none"}
                >
                  x
                </span>
              </li>
              <li>
                <textarea
                  onChange={changeInput}
                  ref={contentInputRef}
                  className={styleInput ? classes.input : classes["input-text"]}
                  placeholder="Start a thread..."
                />
              </li>
              <li className={classes.icon}>
                <PiPaperclipThin size={30} />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={classes["send-post"]}>
        <select className={classes.select} ref={selectOption}>
          <option value="1">Anyone can reply</option>
          <option value="2">Profile you follow</option>
          <option value="3">Mentioned only</option>
        </select>
        <ButtonPost onClick={AddPostHandler} className={showX ? "active" : ""}>Post</ButtonPost>
      </div>
    </Popup>
  );
};

export default AddPost;
