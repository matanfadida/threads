import { useContext, useEffect, useState } from "react";
import Context from "../context/context";
import Activity from "./activity";

const Activities = () => {
  const ctx = useContext(Context);
  const [userActivity, setUserActivity] = useState([]);
  const setError = ctx.setError;
  const token = ctx.token;

  useEffect(() => {
    const getActivities = async () => {
      try {
        ctx.setLoadingHandler(true);
        const response = await fetch(
          `http://localhost:5000/api/user/get-activities`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw error;
        }

        const result = await response.json();
        console.log(result);
        setUserActivity(result.data);
        ctx.setLoadingHandler(false);
      } catch (error) {
        ctx.setErrorHandler(error);
        ctx.setLoadingHandler(false);
        console.log("error message: ", error.message);
      }
    };
    getActivities();
  }, [token, setError]);

  const activities = userActivity.map((activity) => {
    return (
      <Activity
        key={activity._id}
        action={activity.action}
        userId={activity.user}
        postId={activity.postId}
      />
    );
  });

  return (
    <div>
      <ul>
      {activities}
      </ul>
    </div>
  );
};

export default Activities;
