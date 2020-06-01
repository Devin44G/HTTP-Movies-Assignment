import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const initialItem = {
	title: "",
	director: "",
	metascore: "",
	stars: []
};

const UpdateMovie = props => {
	const [movie, setMovie] = useState(initialItem);
	const { id } = useParams();

	useEffect(() => {
		const movieToUpdate = props.movieList.find(thing => `${thing.id}` === id);

		if (movieToUpdate) {
			setMovie(movieToUpdate);
		}
	}, [props.setMovie, id]);

	const changeHandler = e => {
		e.persist();
		let targetVal = e.target.value;
    
		if (e.target.name === 'metascores') {
			targetVal = parseInt(targetVal, 10);
    } else if (e.target.name === 'stars') {
        targetVal = targetVal.split(',')
      }

		setMovie({
			...movie,
			[e.target.name]: targetVal
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		axios
			.put(`http://localhost:5000/api/movies/${id}`, movie)
			.then(res => {
				console.log(res)
                props.getMovieList();
				props.history.push(`/movies/${id}`);
			})
			.catch(err => console.log(err));
	};

  const deleteHandler = e => {
   e.preventDefault();
   axios
     .delete(`http://localhost:5000/api/movies/${id}`)
     .then(() => {
       props.getMovieList();
       props.history.push('/');
     });
 };

	return (
		<div>
			<h2>Update Movie</h2>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="title"
					onChange={changeHandler}
					placeholder="Title"
					value={movie.title}
    />


				<input
					type="text"
					name="director"
					onChange={changeHandler}
					placeholder="Director"
					value={movie.director}
    />


				<input
					type="number"
					name="metascore"
					onChange={changeHandler}
					placeholder="Metascore"
					value={movie.metascore}
    />


				<input
					type="string"
					name="stars"
					onChange={changeHandler}
					placeholder="Stars"
					value={movie.stars}
    />

        <button type="submit">Edit</button>
			</form>
      <button onClick={deleteHandler}>Delete</button>
		</div>
	);
};

export default UpdateMovie;
