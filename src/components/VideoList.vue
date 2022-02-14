<template>
  <div>
    <h1>{{ appVersion }}</h1>
    <h5>{{ message }}</h5>
    <div class="video-list">
      <div
        tabindex="0"
        v-for="video in videos"
        :key="video.path"
        class="video-item"
        @click="onDoubleClick(video)"
      >
        <div>
          <h1>{{ video.name }}</h1>
        </div>

        <div class="overlay" @click="onPlayVideo(video)">play</div>
      </div>
    </div>

    <video
      v-if="selectedVideo"
      :src="selectedVideo.videoPath"
      controls
      autoplay
      class="video"
    />

    <!-- <video
      src="video:///C:/Users/mohit/Videos/Untitled-1.mov"
      controls
      autoplay
      class="video"
    /> -->
  </div>
</template>

<script>
// import VideoPlayer from "./video-player.vue";
import axios from "axios";
export default {
  components: {
    // VideoPlayer,
  },
  data() {
    return {
      videos: window.electron.getVideos(),
      appVersion: "",
      message: "",
      selectedVideo: null,
      videoOptions: {
        autoplay: true,
        controls: true,
        sources: [
          {
            src: "/path/to/video.mp4",
            type: "video/mp4",
          },
        ],
      },
    };
  },

  methods: {
    onDoubleClick() {},

    onPlayVideo(video) {
      let src = {
        src: video,
        type: `video/video.path.split(".").pop()`,
      };
      this.videoOptions.sources = [src];

      this.selectedVideo = video;
    },

    restartApp() {
      window.electron.ipcRenderer.send("restart_app");
    },
  },

  mounted() {
    console.log(window.electron.ipcRenderer);
    axios
      .get("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.data)
      .then((data) => console.log(data));

    window.electron.ipcRenderer.send("app_version");

    window.electron.ipcRenderer.invoke("app_version").then((result) => {
      console.log("appversion render");
      // window.electron.ipcRendererOn.removeAllListeners("app_version");
      let appVersion = "v" + result.version;
      console.log(appVersion);
      this.appVersion = appVersion;
    });

    // window.electron.ipcRenderer.invoke("update_available").then( () => {
    //   this.message = "A new update is available. Downloading now...";
    // });
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.video-list {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}

.video-item {
  border: 1px solid #555;
  width: 250px;
  height: 250px;
  padding: 25px;
  display: inline-block;
  margin-top: 25px;
  margin-right: 25px;
  text-align: center;
  position: relative;
}

.video-item div h1 {
  vertical-align: middle;
  height: 100%;
}

.video-item:focus {
  /* background-color: #efefef; */
}

.video-item .overlay {
  display: none;
}

.video-item:hover {
  /* cursor: pointer; */
}

.video-item:hover .overlay {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 25px;
  cursor: pointer;
}

.video {
  width: 95vw;
  height: auto;
  background-color: black;
}
</style>