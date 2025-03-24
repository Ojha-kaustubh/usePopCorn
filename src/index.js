import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';

import StarRating from "./StarRating";

function Test() {

  const [movieRating, setMovieRating] = React.useState(0);

  return <div>
    <StarRating maxRating={10} color="blue" onSetRating={setMovieRating}/>
    <p>This Movie Was Rated {movieRating} Stars</p>
  </div>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <App />
  //   {/* <Test />
  //   <StarRating
  //     maxRating={5}
  //     message={["Terrible ", "Bad", "Okay", "Good", "Excellent"]}
  //   />
  //   <StarRating size={24} color="orange" className="test" defaultRating={3} /> */}
  // </React.StrictMode>
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
