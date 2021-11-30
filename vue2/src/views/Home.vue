<template>
  <div class="home">
    <div class="single" v-for="item in blogs" :key="item.src">
      <img class="images" v-lazy="item.src" alt="" />
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      blogs: []
    }
  },
  async created () {
    try {
      const res = await this.$http.get('/getBlogs')
      if (res.code === 'S') {
        this.blogs = res.data
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
<style scoped>
.single {
  height: 160px;
  background-color: rebeccapurple;
  display: flex;
  margin: 10px 0;
}
.images {
  display: block;
  height: 100%;
  width: 240px;
}
</style>
