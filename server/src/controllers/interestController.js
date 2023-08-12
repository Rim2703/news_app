const axios = require('axios');
const User = require('../models/userModel');
const Interest = require('../models/interestModel');

// Update user interests
const userInterests = async (req, res) => {
    try {
        const userId = req.userData.userId;
        console.log(userId)
        const newInterests = req.body.interests;

        // Find the user's existing interests (if any)
        let userInterests = await Interest.findOne({ userId });

        if (!userInterests) {
            userInterests = new Interest({
                userId,
                interests: newInterests,
            });
            await userInterests.save();
        } else {
            userInterests.interests = newInterests;
            await userInterests.save();
        }

        res.status(200).json({ message: 'Interests updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}

const getInterests = async (req, res) => {
    try {
        const userId = req.userData.userId;
        console.log(userId)
        const userInterests = await Interest.findOne({ userId });

        if (!userInterests) {
            return res.json({ interests: [], selectedInterests: [] });
        }

        return res.json({
            interests: userInterests.interests,
            selectedInterests: userInterests.interests
        });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};


const fetchNews = async (req, res) => {
    try {
        // Get the authenticated user's ID from the request 
        const userId = req.userData.userId;
        console.log(userId)

        // Extract the interest from the URL parameters
        const interest = req.params.interest;
        console.log(interest)
        // Find the user's interests in the Interest model
        const userInterests = await Interest.findOne({ userId })

        if (!userInterests) {
            return res.status(404).json({ message: 'User interests not found' });
        }

        // Use the fetched interests to query the news API
        const apiKey = '4bac6814539f49e1b9a9a1691a752df1';

        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                country: 'in', // Set the country parameter to 'in' for India
                category: interest, // Use the extracted interest as the category
                apiKey,
            },
        });

        const articles = response.data.articles;

        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = { userInterests, fetchNews, getInterests }

