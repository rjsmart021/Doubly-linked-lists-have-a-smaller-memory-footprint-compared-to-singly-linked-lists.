const express = require('express');
const app = express();

const videoTitles = [
    "The Art of Coding",
    "Exploring the Cosmos",
    "Cooking Masterclass: Italian Cuisine",
    "History Uncovered: Ancient Civilizations",
    "Fitness Fundamentals: Strength Training",
    "Digital Photography Essentials",
    "Financial Planning for Beginners",
    "Nature's Wonders: National Geographic",
    "Artificial Intelligence Revolution",
    "Travel Diaries: Discovering Europe"
];

app.use(express.json());

app.get('/search/:title', (req, res) => {
    const { title } = req.params;
    const results = videoTitles.filter(video =>
        video.toLowerCase().includes(title.toLowerCase())
    );

    if (results.length === 0) {
        return res.status(400).json({ error: 'No video titles match your search' });
    }

    res.status(200).json(results.map(video => ({ title: video })));
});

function mergeSort(videos) {
    if (videos.length <= 1) return videos;

    const mid = Math.floor(videos.length / 2);
    const left = mergeSort(videos.slice(0, mid));
    const right = mergeSort(videos.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    const results = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            results.push(left[i]);
            i++;
        } else {
            results.push(right[j]);
            j++;
        }
    }

    return results.concat(left.slice(i), right.slice(j));
}

app.get('/video-list', (req, res) => {
    const sortedVideos = mergeSort(videoTitles);
    res.status(200).json(sortedVideos.map(video => ({ title: video })));
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
