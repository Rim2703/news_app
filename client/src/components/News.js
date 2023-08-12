import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsFeed = ({ interest }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(`Fetching news articles for interest: ${interest}`);
    
    // Fetch news articles based on the clicked interest
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/feed/${interest}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('News articles:', response.data);
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news articles:', error.message);
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, [interest]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="NewsFeed">
      <ul>
        {articles.map((article, index) => (
          
          <li key={index}>
            <h3>{article.title}</h3>
            <img src={article.urlToImage} alt={article.name} />
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsFeed;
