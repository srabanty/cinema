import React from 'react';

const SingleMovie = (props) => {
    console.log(props);
    const {movieName, time} = props.singleCinema;
    return (
        <div className="pl-3">
            <h2>{movieName}</h2>
            <h4>{time}</h4>
            <br/>
        </div>
    );
};

export default SingleMovie;