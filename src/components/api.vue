<template>
  <div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
    mounted() {
        axios.get("https://jsonplaceholder.typicode.com/todos/1")
        .then(response => response.data)
        .then(data => console.log(data));
    }
}
</script>

<style>

</style>