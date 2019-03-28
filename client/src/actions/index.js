import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";

export const fetchUser = () => {
  return dispatch => {
    axios.get("/api/current_user").then(res =>
      dispatch({
        type: FETCH_USER,
        payload: res.data
      })
    );
  };
};

export const handleToken = token => {
  return dispatch => {
    axios.post("/api/stripe", token).then(res => {
      dispatch({
        type: FETCH_USER,
        payload: res.data
      });
    });
  };
};

export const submitSurvey = (formValues, history) => {
  return dispatch => {
    axios.post("/api/surveys", formValues).then(res => {
      history.push("/surveys");
      dispatch({
        type: FETCH_USER,
        payload: res.data
      });
    });
  };
};

export const fetchSurveys = () => {
  return dispatch => {
    axios.get("/api/surveys").then(res => {
      dispatch({
        type: FETCH_SURVEYS,
        payload: res.data
      });
    });
  };
};
