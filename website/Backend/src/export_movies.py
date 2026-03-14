import pickle
import json

movies = pickle.load(open("movies.pkl","rb"))

titles = movies["title"].tolist()

json.dump(titles, open("movies.json","w"))

print("movies.json created successfully")