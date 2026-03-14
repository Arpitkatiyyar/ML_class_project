require('dotenv').config()
const express=require('express')
const cors=require('cors')
const {spawn} =require('child_process')
const axios=require('axios')
const movieList=require("./movies.json")
const app=express()

app.use(cors())
app.use(express.json())

const TMDB_KEY=process.env.TMDB_API_KEY;

app.get("/search",(req,res)=>{
    const query=req.query.q.toLowerCase()
    const results=movieList.filter(movie=>movie.toLowerCase().includes(query)).slice(0,10)
    res.status(200).json(results)
})


app.post("/recommend",(req,res)=>{
    const movie=req.body.movie

    if(!movieList.includes(movie)){
        return res.json({error:"Movie not in database"})
    }

    const py = spawn("python",["src/recommend.py",movie])

    let result=""

    py.stdout.on("data",(data)=>{
        result+=data.toString()
    })


    py.stderr.on("data",(data)=>{
    console.error("Python error:", data.toString())
    })

    py.on("close",async()=>{
        const movies = JSON.parse(result)
        const finalMovies=[]
        for(const m of movies){
            try {

                const tmdb = await axios.get(
                `https://api.themoviedb.org/3/movie/${m.movie_id}?api_key=${TMDB_KEY}`,{ timeout: 5000 }
                )

        finalMovies.push({
        title: tmdb.data.title,
        poster: "https://image.tmdb.org/t/p/w500"+tmdb.data.poster_path,
        genres: tmdb.data.genres.map(g=>g.name)
        })

        } catch(error){

        // console.log("TMDB request failed for movie:", m.movie_id)

        finalMovies.push({
        title: m.title,
        poster: "",
        genres: []
        })

}
        }
        res.json(finalMovies)
    })
})

app.listen(3000,()=>{
    console.log("server is running at port 3000")
})