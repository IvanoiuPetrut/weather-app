<template>
  <div class="card">
    <div>
      <p class="margin-bottom--sm">Air Quality</p>
      <p>22</p>
    </div>
    <div>
      <p class="margin-bottom--sm">Precipitation</p>
      <p>22</p>
    </div>
    <div>
      <p class="margin-bottom--sm">Wind</p>
      <p>22</p>
    </div>
    <div>
      <p class="margin-bottom--sm">Pressure</p>
      <p>22</p>
    </div>
    <div>
      <p class="margin-bottom--sm">Visibility</p>
      <p>22</p>
    </div>
    <div>
      <p class="margin-bottom--sm">UV Index</p>
      <p>2</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin card($theme: DarkGray) {
  background-color: $theme;
  padding: 1rem;
  border-radius: 0.5rem;
}

@mixin flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@mixin glass-morph {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(34, 34, 35, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 0.6rem;
  row-gap: 1rem;
  color: #f1f3f5;
  div {
    @include flex-column();
    @include card();
    @include glass-morph();
  }
}
</style>
