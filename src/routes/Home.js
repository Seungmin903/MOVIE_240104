import React from "react";
import axios from "axios";
import Movie from "../components/Movie";
import './Home.css';

class Home extends React.Component{
  state = {
    isLoading : true,
    movies: [],
  };

  getMovies = async () => {//async = getmovies 함수에게 시간이 필요 await = axios.get 시간을 기다려 달라
    const {
      data: {
        data : {movies},
      },
    } =  await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    
    this.setState({movies, isLoading : false});
  };

  componentDidMount(){
    this.getMovies();
  }

  render(){
    const {isLoading,movies} = this.state;
    return(
    <section className = "container">
      {isLoading ?(
        <div className = "loader">
          <span className = "loader__text">Loading...</span>
          </div>
      ) : (
        <div className ="movies">
        {movies.map((movie) => (
        <Movie 
          key ={movie.id}
          id = {movie.id}
          year = {movie.year}
          title = {movie.title}
          summary = {movie.summary}
          poster = {movie.poster}
          genres = {movie.genres}
        />
        ))}
      </div>
    )}
    </section>
    );
  }
}
export default Home;
