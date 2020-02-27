import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouteMatch, Link, useParams } from 'react-router-dom';

const UpdateMovie = props => {
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    metascore: ''
  });
  console.log('MOVIES ', props.movieList);

  const {id} = useParams();

  useEffect(() => {
        const movieToUpdate = props.movieList.find(item => `${item.id}` === id);

        if (movieToUpdate) {
            setMovie(movieToUpdate);
            console.log("Use effect edited updatedMovie to: ", movie)
        }

    }, [props.movieList, id])
  // const match = useRouteMatch();
  //
  // const fetchMovie = id => {
  //   axios
  //     .get(`http://localhost:5000/api/movies/${id}`)
  //     .then(res => setMovie(res.data))
  //     .catch(err => console.log(err.response));
  // };
  // console.log(movie);
  //
  // useEffect(() => {
  //   fetchMovie(match.params.id);
  // }, [match.params.id]);
  //
  // if (!movie) {
  //     return <div>Loading movie information...</div>;
  // }

  const changeHandler = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        console.log('RES ', res);
        props.getMovieList();
        props.history.push('/');
      })
      .catch(err => console.error(err));
  };

  return(
    <section>
      <form onSubmit={submitHandler}>
        <input
          name="title"
          type="text"
          placeholder="Edit Title"
          value={movie.title}
          onChange={changeHandler}
        />
        <input
          name="director"
          type="text"
          placeholder="Edit Title"
          value={movie.director}
          onChange={changeHandler}
        />
        <input
          name="metascore"
          type="text"
          placeholder="Edit Title"
          value={movie.metascore}
          onChange={changeHandler}
        />
        {/* <input
          name="stars"
          type="text"
          placeholder="Edit Title"
        /> */}
        <button type="submit">Edit</button>
      </form>
    </section>
  );
}

export default UpdateMovie;
