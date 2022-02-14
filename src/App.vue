<template>
  <div id="nav"></div>
  <!-- {{dirName}} -->

  <div>
    <VideoList />
  </div>
  <router-view />
</template>

<script>
// import {ipcRenderer} from 'electron'
import VideoList from '@/components/VideoList.vue'
export default {
  components: {
    VideoList
  },
  data() {
    return {
      // videos: window.electron.getVideos()
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
