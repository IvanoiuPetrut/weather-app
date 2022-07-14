<template>
  <canvas class="canvas"></canvas>
</template>

<script>
export default {
  name: "GraphicTemp",
  data() {
    return {
      // points: [32, 35, 30, 22, 25, 18, 15, 20.5],
      points: [100, 0, 100, 0, 100, 0, 100, 0],
    };
  },
  methods: {
    drawLines(ctx, points) {
      ctx.beginPath();
      ctx.moveTo(0, points[0]);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(i * 20, points[i]);
      }
      ctx.lineWidth = 5;
      ctx.stroke();
    },
    draw() {
      let canvas = document.querySelector(".canvas");
      let ctx = canvas.getContext("2d");
      this.drawLines(ctx, this.points);
    },
  },
  mounted() {
    this.draw();
  },
};
</script>

<style lang="scss" scoped>
.canvas {
  border: 3px solid limegreen;
  width: 600px;
  height: 100px;
}
</style>
