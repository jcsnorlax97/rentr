import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { CircularProgress } from "@material-ui/core";

export const RefreshLoader = (props) => {
  const { promiseInProgress } = usePromiseTracker({area: props.area});
  return (
    <span style={{ position: "relative" }}>
      {promiseInProgress === true ? (
        <div>
          <CircularProgress style = {{marginLeft: 10, marginTop: 5}} size={26}/>
          <span
            style = {{
              fontWeight: 600,
              fontSize: 26,
              marginLeft: 10
            }} 
          >
            Fetching Listing Information...
          </span>
        </div>
      ) : (
        <div>
          <span
            style = {{
              fontWeight: 600,
              fontSize: 26,
              marginLeft: 10
            }} 
          >
            No listing information
          </span>
        </div>
      )}
    </span>
  );
};
