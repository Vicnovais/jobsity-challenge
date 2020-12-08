<template>
  <ol>
    <li v-for="weekday in weekdays" :key="weekday">
      {{ weekday }}
    </li>
  </ol>
</template>

<script>
export default {
  name: "Weekdays",

  computed: {
    weekdays() {
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    },
  },
};
</script>

<style scoped lang="less">
@import "../styles/variables.less";

ol {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  list-style: none;
  padding: 1px;
  background-color: @light-blue;
  margin: 0;
  border-top: 1px solid @grey-darkborder;
  height: 30px;

  li {
    font-family: @font-family;
    font-weight: bold;
    margin: auto;
  }
}
</style>