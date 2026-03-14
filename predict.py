import pickle
import pandas as pd

# load saved files
movies = pickle.load(open('movies.pkl','rb'))
similarity = pickle.load(open('similarity.pkl','rb'))

# recommendation function
def recommend(movie):

    try:
        movie_index = movies[movies['title'] == movie].index[0]
    except:
        print("Movie not found in dataset")
        return

    distances = similarity[movie_index]

    movies_list = sorted(list(enumerate(distances)),
                         reverse=True,
                         key=lambda x: x[1])[1:6]

    print("\nRecommended Movies:\n")

    for i in movies_list:
        print(movies.iloc[i[0]].movie_id)
        print(movies.iloc[i[0]].title)



# take user input
movie_name = input("Enter movie name: ")

recommend(movie_name)