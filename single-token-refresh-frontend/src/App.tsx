import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

axios.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem('token');

  if(accessToken) {
    config.headers.authorization = 'Bearer ' + accessToken;
  }
  return config;
})


axios.interceptors.response.use(
  (response) => {
    console.log(response.headers);
    const newToken = response.headers['token'];
    if(newToken) {
      localStorage.setItem('token ', newToken);
    }
    return response;
  }
)


function App() {
  const [content, setContent] = useState("");

  async function query() {
    try {
      const res = await axios.post("http://localhost:3000/user/login", {
        username: "guang",
        password: "123456",
      });
      console.log(res.data);
      localStorage.setItem('token', res.data);

      const res2 = await axios.get("http://localhost:3000/bbb");
      setContent(res2.data);
    } catch (e: any) {
      console.log(e.response.data.message);
    }
  }

  useEffect(() => {
    query();
  }, []);

  return <div style={{ fontSize: "100px" }}>{content}</div>;
}

export default App;
