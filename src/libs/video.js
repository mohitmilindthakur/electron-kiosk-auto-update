const fs = require('fs');
const path = require('path');



class VideoApi {
    constructor() {
        this.filePath = `C:\\\\Users\\\\mohit\\\\Videos`
    }

    getVideos() {
        let videos = fs.readdirSync(this.filePath);
        videos.forEach(v => {
            console.log(fs.statSync(path.join(this.filePath, v)))
        })
    }
}

// new VideoApi().getVideos();

module.exports = VideoApi;