import { useReducer, useEffect } from 'react';
import './App.css';

const BASE_URL = "https://66ceca18901aab24841f8da1.mockapi.io/api/";

// Reducer function to manage state transitions
const reducer = (state, action) => {
  switch (action.type) {
    case "success":
      return {
        data: action.data,
        loading: false,
        error: "",
      };
    case "error":
      return {
        data: [],
        loading: false,
        error: action.error.message || "Something went wrong!",
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, {
    data: [],
    loading: true,
    error: ""
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(BASE_URL + "ecomerce");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        dispatch({ type: "success", data });
      } catch (error) {
        dispatch({ type: "error", error });
      }
    };

    getData();
  }, []);

  const { data, loading, error } = state;

  return (
    <div className='container'>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && data.map((ecomerce) => (
        <h1 key={ecomerce.id} className="text-xl font-bold underline">
          {ecomerce.title}
        </h1>
      ))}
    </div>
  );
}

export default App;
