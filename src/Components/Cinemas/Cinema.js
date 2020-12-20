import React from 'react';
import fakedata from '../../fakeData/fakeData';
import SingleMovie from '../SingleMovie/SingleMovie';
import singleMovie from '../SingleMovie/SingleMovie';

const Cinema = () => {
    return (
        <div>
            {
                fakedata.map(singleCinema=><SingleMovie singleCinema={singleCinema}></SingleMovie>)
            }
        </div>
    );
};

export default Cinema;