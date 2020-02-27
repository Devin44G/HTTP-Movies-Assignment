import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouteMatch, Link } from 'react-router-dom';

const UpdateMovie = props => {
  const [movie, setMovie] = useState(props.movieList);
  console.log('MOVIES ', props);
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
      ...movie.movieList,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = e => {
    e.preventDefault();
    axios
      .put('http://localhost:5000/api/movies/', movie)
      .then(res => console.log('RES ', res))
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
          value={movie.metascore}
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
