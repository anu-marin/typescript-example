# Load stories from csv file
```
./loadstories <filename>
```

OR
```
npm run loadfile <filename>
```

# API ENDPOINTS

## Start Server 
```
npm start
```
Server will run on PORT 7000

# API ENDPOINTS
1. GET /privacy/:privacy/likes/:minlikes
Get all stories that are “public” and have more than 20 likes

eg: http://localhost:7000/stories/privacy/public/likes/20

2. POST /stories/story
Create a story record

eg: http://localhost:7000/stories/story
{
  "launch_date": "2011-07-30",
  "title": "NEW STORY",
  "privacy": "public",
  "likes": 99
}