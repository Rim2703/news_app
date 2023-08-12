import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';


const Navbar = () => {

    const handleInterestClick = async (interest) => {
        try {
          const token = localStorage.getItem('token');
    
          // Update user interests in the database
          await axios.post(
            'http://localhost:5000/update',
            { interests: [interest] },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

            // Fetch news based on the updated interests
      const response = await axios.get(`http://localhost:5000/feed/${interest}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('News articles for interest:', response.data);
    } catch (error) {
      console.error('Error updating interests and fetching news:', error);
    }
  };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="#">News Feed</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active text-white" aria-current="page" to='/technology' onClick={() => handleInterestClick('technology')}>Technology</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link active text-white" aria-current="page" to="/sports"  onClick={() => handleInterestClick('sports')}>Sports</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link active text-white" aria-current="page" to="/politics"  onClick={() => handleInterestClick('politics')}>Politics</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link active text-white" aria-current="page" to="/entertainment"  onClick={() => handleInterestClick('entertainment')}>Entertainment</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link active text-white" aria-current="page" to="/health"  onClick={() => handleInterestClick('health')}>Health</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link active text-white" aria-current="page" to="/education"  onClick={() => handleInterestClick('education')}>Education</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar



