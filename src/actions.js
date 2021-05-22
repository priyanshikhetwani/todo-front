import axios from "axios";

export const loginFn = async (email, password) => {
  const res = await axios.post(`${process.env.REACT_APP_API}/api/login`, {
    email,
    password,
  });
  return res;
};

export const register = async (email, password, password_confirmation) => {
  const res = await axios.post(`${process.env.REACT_APP_API}/api/register`, {
    email,
    password,
    password_confirmation,
  });
  return res;
};

export const getList = async (authtoken) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/api/todo`, {
      headers: {
        Authorization: authtoken,
      },
    });
    return res;
  } catch {
    return console.log("Cannot get the list");
  }
};

export const addToList = async (authtoken, title) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/api/todo`,
    { title },
    {
      headers: {
        Authorization: authtoken,
      },
    }
  );
  return res;
};

export const deleteFromList = async (authtoken, id) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/api/delete`,
    { id },
    {
      headers: {
        Authorization: authtoken,
      },
    }
  );
  return res;
};

export const user = async (authtoken, email) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/api/user`,
    { email },
    {
      headers: {
        Authorization: authtoken,
      },
    }
  );
  return res;
};

export const updatedone = async (authtoken, id) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/api/updatetodo`,
    { id },
    {
      headers: {
        Authorization: authtoken,
      },
    }
  );
  return res;
};
export const updateundone = async (authtoken, id) => {
  console.log("in update");
  const res = await axios.post(
    `${process.env.REACT_APP_API}/api/undoupdate`,
    { id },
    {
      headers: {
        Authorization: authtoken,
      },
    }
  );
  return res;
};

export const logout = async (authtoken) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/api/logout`,
    {},
    {
      headers: {
        Authorization: authtoken,
      },
    }
  );
  return res;
};
