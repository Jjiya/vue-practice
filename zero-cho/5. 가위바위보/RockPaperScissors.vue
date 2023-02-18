<template>
  <!-- v-on => @ 축약 가능 / v-bind => : 축약 가능 -->
  <!--  v-bind의 class와 style은 객체 형식 지원 -->
  <!--  <div id="computer" :class="{state: true, hello: false}" :style="{backgroundImage:'',fontSize:'14px'}"></div>-->
  <div id="computer" :style="{...computedStyleObject}"></div>

  <div>
    <button @click="onClickButton('바위')">바위</button>
    <button @click="onClickButton('가위')">가위</button>
    <button @click="onClickButton('보')">보</button>
  </div>
  <div>{{ result }}</div>
  <div>현재 {{ score }}점</div>
</template>

<script>
const rspCoordinate = {
  "바위": "0",
  "가위": "-142px",
  "보": "-284px"
};

export default {
  data() {
    return {
      result: "",
      score: 0,
      imgCoordinate: rspCoordinate.바위,
    };
  },
  computed: {
    computedStyleObject() {
      return {
        background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoordinate} 0`,
        width: "150px",
        height: "243px"
      }
    }
  },
  methods: {
    onClickButton(choice) {
      this.imgCoordinate = rspCoordinate[choice];
    }
  }
}
</script>

<style scoped>
</style>