import pickle
import sys
import json
import os

BASE_DIR = os.path.dirname(__file__)

movies = pickle.load(open(os.path.join(BASE_DIR,"movies.pkl"),"rb"))
similarity = pickle.load(open(os.path.join(BASE_DIR,"similarity.pkl"),"rb"))

# if len(sys.argv) < 2:
#     print("No movie provided")
#     sys.exit()

movie=sys.argv[1]

# if movie not in  movies['title'].values:
#     print("movie not found")
#     sys.exit()

movie_index = movies[movies['title']==movie].index[0]

distances =similarity[movie_index]
movie_list = sorted(list(enumerate(distances)),reverse=True,key=lambda x:x[1])[1:6]
recommended_movies=[]
for i in movie_list:
    recommended_movies.append({
        "movie_id":int(movies.iloc[i[0]].movie_id),
        "title":movies.iloc[i[0]].title
    })

print(json.dumps(recommended_movies))



