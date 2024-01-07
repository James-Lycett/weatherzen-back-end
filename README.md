#We Love Movies
Thinkful backend capstone. This is an API for an app that displays movies, what theaters they are showing at, and reviews of the movies. This API is built using node.js, express, and knex query builder.

##Links
https://welovemovies-frontend-zsml.onrender.com/

##Tables
###Critics
The critics table represents movie critics who have created reviews for movies. Each critic has the following fields:

critic_id: (Primary Key) A unique ID for the critic.
preferred_name: (String) The critic's preferred first name.
surname: (String) The critic's last name.
organization_name: (String) The name of the organization the critic works for.

###Movies-Theaters
The movies_theaters table is a join table that connects movies with theaters. It represents which movies are being shown in which theaters. It also includes a key that represents whether or not a movie is currently showing at the theater, or if it has in the past.

movie_id: (Foreign Key) A reference ID to a particular movie.
theater_id: (Foreign Key) A reference ID to a particular theater.
is_showing: (Boolean) A representation of whether or not the movie is currently showing in the referenced theater.

###Movies
The movies table represents movies stored in the application database. Each movie has the following fields:

movie_id: (Primary Key) A unique ID for the movie.
title: (String) The title of the movie.
runtime_in_minutes: (Integer) The length of the movie in minutes.
rating: (String) The rating given to the movie.
description: (String) A shortened description of the movie.
image_url: (String) A URL to the movie's poster.

###Reviews
The reviews table represents a review done by a critic of a single movie. It references both a critic and a movie.

review_id: (Primary Key) A unique ID for the review.
content: (Text) The content of the review, written in markdown.
score: (Integer) A numerical representation of the score given to the movie by the critic.
critic_id: (Foreign Key) A reference ID to a particular critic.
movie_id: (Foreign Key) A reference ID to a particular movie.


###Theaters
The theaters table represents movie theaters. Each theater has the following fields:

theater_id: (Primary Key) A unique ID for the theater.
name: (String) The name of the theater.
address_line_1: (String) The first line of the address of the theater.
address_line_2: (String) The second line of the address of the theater.
city: (String) The city in which the theater is located.
state: (String) The state in which the theater is located.
zip: (String) The zip in which the theater is located.

##ROUTES
###Get all movies
This route will return a list of all movies. Different query parameters will allow for limiting the data that is returned.

There are two different cases to consider:

GET /movies
GET /movies?is_showing=true


###Read one movie
These routes will return a single movie by ID.

GET /movies/:movieId
GET /movies/:movieId/theaters
GET /movies/:movieId/reviews
This route should return all the theaters where the movie is playing.

GET /movies/:movieId/theaters
This route should return all the reviews for the movie, including all the critic details added to a critic key of the review.

GET /movies/:movieId/reviews
###Destroy review
This route will delete a review by ID. If the ID is incorrect, a 404 will be returned.

DELETE /reviews/:reviewId
The server will respond with 204 No Content.

###Update review
This route will allow you to partially or fully update a review. If the ID is incorrect, a 404 will be returned.

PUT /reviews/:reviewId
Get all theaters
This route will return a list of all theaters. Different query parameters will allow for additional information to be included in the data that is returned.

GET /theaters
