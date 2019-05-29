import React from 'react';
import {Link} from 'react-router-dom';

const HomePage = () => (
    <div className="jumbotron">
      <h1>Pluralsight administration</h1>
      <p>React, Redux and React Router for ultra resposive web site.</p>

      <Link to="about" className="btn btn-primary btn-lg">
        Learn more
      </Link>
    </div>
);

export default HomePage;