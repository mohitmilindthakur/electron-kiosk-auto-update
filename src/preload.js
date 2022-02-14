const fs = require('fs');
const path = require('path')
const os = require("os")
const { contextBridge, ipcRenderer } = require('electron')

class VideoApi {
    constructor() {
        this.filePath = `C:\\\\Users\\\\${os.userInfo().username}\\\\Videos`
        this.videos = this.initVideos();
    }

    getExtension(path) {
        return path.split('.').pop();
    }

    isFileVideo(path) {
        let fileExtension = this.getExtension(path)
        if (fileExtension === 'mov' || fileExtension === 'mp4') return true;
    }

    initVideos() {
        let videos = fs.readdirSync(this.filePath).filter(v => this.isFileVideo(v))
        let videoStats = videos.map(vPath => {
            let vFullPath = path.join(this.filePath, vPath)
            let videoPath = `video:////${vFullPath}`
            let video = { path: vFullPath, name: vPath, videoPath }
            video.stats = fs.statSync(vFullPath)
            return video;
        })
        return videoStats;
    }

    getVideos() {
        return this.videos;
    }
}

const video = new VideoApi();
// let version = console.log(app.getVersion);
contextBridge.exposeInMainWorld(
    'electron',
    {
        getVideos() {
            return video.videos;
        },
        ipcRenderer,
        ipcRendererOn: ipcRenderer.on
    }
)
