// import { useState } from "react";
// import axios from "axios";

// function App() {

//   const [movie, setMovie] = useState("");
//   const [results, setResults] = useState([]);
//   const [suggestion,setSuggestion]=useState([])

//   const handleSearch = async(value)=>{
//     setMovie(value)

//     if(value.length<2){
//       setSuggestion([])
//       return
//     }
    
//     const res=await axios.get(`http://localhost:3000/search?q=${value}`)

//     setSuggestion(res.data)
//   }

//   const recommend = async () => {

//     try {

//       const res = await axios.post(
//         "http://localhost:3000/recommend",
//         { movie }
//       );

//       setResults(res.data);

//     } catch (error) {
//       console.log(error);
//     }

//   };

//   return (

//     <div style={{background:"black",color:"white",minHeight:"100vh",padding:"20px"}}>

//       <h1 style={{color:"red"}}>Netflix Movie Recommender</h1>

//       <input
//         value={movie}
//         placeholder="Enter movie name"
//         onChange={(e)=>handleSearch(e.target.value)}
//         style={{padding:"10px"}}
//       />

//       <button
//         onClick={recommend}
//         style={{marginLeft:"10px",padding:"10px"}}
//       >
//         Recommend
//       </button>

//       <ul>

//       {suggestion.map((s,i)=>(
//       <li
//       key={i}
//       style={{cursor:"pointer"}}
//       onClick={()=>{
//         setMovie(s)
//         setSuggestion([])
//       }}
//       >
//       {s}
//       </li>
//       ))}

//       </ul>

//       <div style={{
//         display:"flex",
//         gap:"20px",
//         marginTop:"30px",
//         flexWrap:"wrap"
//       }}>

//         {results.map((m,i)=>(
//           <div key={i}>

//             <img
//               src={m.poster}
//               alt={m.title}
//               width="200"
//             />

//             <h3>{m.title}</h3>

//             <p>{m.genres.join(", ")}</p>

//           </div>
//         ))}

//       </div>

//     </div>

//   );

// }

// export default App;


import { useState } from "react";
import axios from "axios";

function App() {

  const [movie, setMovie] = useState("");
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // search suggestions
  const handleSearch = async (value) => {

    setMovie(value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {

      const res = await axios.get(
        // `http://localhost:3000/search?q=${value}`
        `http://10.241.129.90:3000/search?q=${value}`
      );

      setSuggestions(res.data);

    } catch (error) {
      console.log(error);
    }

  };

  // recommendation request
  const recommend = async () => {

    try {

      const res = await axios.post(
        // "http://localhost:3000/recommend",
        "http://10.241.129.90:3000/recommend",
        { movie }
      );

      setResults(res.data);

    } catch (error) {
      console.log(error);
    }

  };

  return (

    <div style={{
      background: "#141414",
      minHeight: "100vh",
      color: "white",
      padding: "30px",
      fontFamily: "Arial"
    }}>

      <h1 style={{
        color: "#e50914",
        fontSize: "40px",
        marginBottom: "20px"
      }}>
        Movie Recommender
      </h1>

      <div style={{position:"relative"}}>

        <input
          value={movie}
          placeholder="Search movie..."
          onChange={(e)=>handleSearch(e.target.value)}
          style={{
            padding:"10px",
            width:"300px",
            borderRadius:"5px",
            border:"none"
          }}
        />

        <button
          onClick={recommend}
          style={{
            marginLeft:"10px",
            padding:"10px 20px",
            background:"#e50914",
            border:"none",
            color:"white",
            borderRadius:"5px",
            cursor:"pointer"
          }}
        >
          Recommend
        </button>

        {/* suggestion dropdown */}

        {suggestions.length > 0 && (

          <ul style={{
            position:"absolute",
            top:"45px",
            width:"300px",
            background:"white",
            color:"black",
            listStyle:"none",
            padding:"0",
            margin:"0",
            borderRadius:"5px",
            overflow:"hidden"
          }}>

            {suggestions.map((s,i)=>(
              <li
                key={i}
                style={{
                  padding:"10px",
                  cursor:"pointer",
                  borderBottom:"1px solid #ddd"
                }}
                onClick={()=>{
                  setMovie(s)
                  setSuggestions([])
                }}
              >
                {s}
              </li>
            ))}

          </ul>

        )}

      </div>

      {/* recommended movies */}

      <div style={{
        display:"flex",
        gap:"25px",
        marginTop:"40px",
        flexWrap:"wrap"
      }}>

        {results.map((m,i)=>(
          <div key={i} style={{width:"200px"}}>

            <img
              src={m.poster}
              alt={m.title}
              style={{
                width:"200px",
                borderRadius:"8px"
              }}
            />

            <h3 style={{marginTop:"10px"}}>
              {m.title}
            </h3>

            <p style={{color:"#ccc"}}>
              {m.genres.join(", ")}
            </p>

          </div>
        ))}

      </div>

    </div>

  );

}

export default App;