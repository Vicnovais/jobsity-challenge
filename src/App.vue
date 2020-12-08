<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
@import "./styles/variables.less";

* {
  box-sizing: border-box;
  font-family: @font-family;
}

html,
body {
  padding: 0;
  margin: 0;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
}

body {
  font-size: 16px;
}
</style>