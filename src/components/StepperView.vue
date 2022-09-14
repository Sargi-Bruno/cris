<script setup lang="ts">
interface StepperOptions {
  label: string,
  value: number
}

defineProps({
  currentStep: {
    type: Number,
    required: true
  },
  stepperOptions: {
    type: Array<StepperOptions>,
    required: true
  }
})

defineEmits(['handleNavigation'])
</script>

<template>
  <div class="stepper-container">
    <div 
      v-for="(option, index) in stepperOptions" 
      :key="option.value"
      @click="$emit('handleNavigation', option.value)"
    >
      <div 
        v-if="index !== (stepperOptions.length - 1)"
        class="step-wrapper"
      >
        <div class="step-container">
          <h2 class="title" :class="{ active: option.value === currentStep }">
            {{ option.label }}
          </h2>
        </div>
        <div class="line" />
      </div>
      <div v-else>
        <div class="step-container">
          <h2 class="title" :class="{ active: option.value === currentStep }">
            {{ option.label }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stepper-container {
  margin-top: 4rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.step-wrapper {
  display: flex;
  align-items: center;
}
.step-container {
  display: flex;
  justify-content: center;
}
.title {
  color: var(--color-white);
  margin: 0;
  cursor: pointer;
}
.active {
  color: var(--color-primary);
}
.line {
  width: 7rem;
  border-bottom: 1px solid var(--color-white);
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>