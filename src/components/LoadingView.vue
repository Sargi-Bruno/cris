<template>
  <div class="loading-container">
    <div class="lds-dual-ring"></div>
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
  height: 70vh;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid var(--color-primary);
  border-color: var(--color-primary) transparent var(--color-primary) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>