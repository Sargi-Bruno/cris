<script setup lang="ts">
import { computed, watch } from 'vue'

const props = defineProps<{
  disabledSheet: boolean,
  type: 'pv' | 'pe' | 'san',
  maxValue: number,
  currentValue: number,
  marks?: boolean[],
  markMode?: boolean,
  masterScreen?: boolean,
}>()

const emit = defineEmits(['handleChangeCharNumber', 'handleChangeCharNumberButton', 'handleChangeCharMark', 'handleChangeMarkModeToTrue', 'handleMarkHeal'])

const typeInfo = {
  pv: {
    labelBarMode: 'VIDA',
    labelMarkMode: 'MORRENDO',
    currentValue: 'currentPv',
    maxValue: 'maxPv',
    color: '#B22222', // #B22222 // #29A51B
    halfColor: '#621A1A', // #8B0000 // #008000
  },
  san: {
    labelBarMode: 'SANIDADE',
    labelMarkMode: 'ENLOUQUECENDO',
    currentValue: 'currentSan',
    maxValue: 'maxSan', 
    color: '#8A2BE2',
    halfColor: '#46295A',
  },
  pe: {
    labelBarMode: 'ESFORÇO',
    currentValue: 'currentPe',
    maxValue: 'maxPe',
    color: '#F81', // #F81
    halfColor: '#BD6508', // #BD6508
  },
}

const infoBarFillWidth = computed(() => {
  const result = Math.floor((props.currentValue / props.maxValue) * 100)

  if(result > 100) return `${100}%`

  if(result < 0) return `${0}%`

  return `${result}%`
})

const infoBarFillColor = computed(() => {
  const result = Math.floor((props.currentValue / props.maxValue) * 100)

  if(result < 50) return typeInfo[props.type].halfColor

  return typeInfo[props.type].color
})

const handleChangeCharNumber = (e: Event, key: string) => {
  emit('handleChangeCharNumber', e, key)
}

const handleChangeCharNumberButton = (value: number, key: string) => {
  emit('handleChangeCharNumberButton', value, key)
}

watch(() => props.currentValue, () => {
  if(props.type !== 'pe') {
    if(props.currentValue === 0) emit('handleChangeMarkModeToTrue', props.type)
  }
})
</script>

<template>
  <div :class="[masterScreen ? 'master-info-bar-container' : 'info-bar-container']">
    <div class="info-bar-label" :class="{ 'master-info-bar-label' : masterScreen}">
      {{ typeInfo[type].labelBarMode }}
    </div>
    <div v-if="!markMode">
      <div class="info-bar" :class="{ 'master-info-bar' : masterScreen}">
        <div class="info-bar-fill">
        </div>
        <div class="info-bar-components" :class="{ 'master-info-bar-components' : masterScreen}">
          <div 
            v-if="!masterScreen"
            class="buttons-container"
          >
            <button 
              class="info-bar-button button-naked" 
              :disabled="disabledSheet"
              @click="handleChangeCharNumberButton((currentValue - 5), typeInfo[type].currentValue)"
            >
              <img
                class="invert-icon"
                src="../../../assets/navigate-double-icon.png" 
                alt="diminuir"
              >
            </button>
            <button 
              class="info-bar-button button-naked" 
              :disabled="disabledSheet"
              @click="handleChangeCharNumberButton((currentValue - 1), typeInfo[type].currentValue)"
            >
              <img
                class="invert-icon"
                src="../../../assets/navigate-icon.png"
                alt="diminuir"
              >
            </button>
          </div>
          <div class="inputs-container">
            <input 
              type="number" 
              class="info-bar-input left-input"
              :class="{ 'master-info-bar-input' : masterScreen}"
              :disabled="disabledSheet"
              :value="currentValue"
              @blur="e => handleChangeCharNumber(e, typeInfo[type].currentValue)"
            >
            <div class="input-divider" :class="{ 'master-input-divider' : masterScreen}">
              /
            </div>
            <input 
              type="number" 
              class="info-bar-input"
              :class="{ 'master-info-bar-input' : masterScreen}"
              :disabled="disabledSheet"
              :value="maxValue"
              @blur="e => handleChangeCharNumber(e, typeInfo[type].maxValue)"
            >
          </div>
          <div
            v-if="!masterScreen"
            class="buttons-container"
          >
            <button 
              class="info-bar-button button-naked" 
              :disabled="disabledSheet"
              @click="handleChangeCharNumberButton((currentValue + 1), typeInfo[type].currentValue)"
            >
              <img 
                src="../../../assets/navigate-icon.png" 
                alt="aumentar"
              >
            </button>
            <button 
              class="info-bar-button button-naked" 
              :disabled="disabledSheet"
              @click="handleChangeCharNumberButton((currentValue + 5), typeInfo[type].currentValue)"
            >
              <img 
                src="../../../assets/navigate-double-icon.png" 
                alt="aumentar"
              >
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="info-bar" :class="{ 'master-info-bar' : masterScreen}">
        <div class="info-bar-fill">
        </div>
        <div class="info-bar-components" :class="{ 'master-info-bar-components-mark' : masterScreen}">
          <div class="marks-container" :class="{ 'master-marks-container' : masterScreen}">
            <div
              v-for="(mark, i) in marks"
              :key="i"
              class="mark-container"
            >
              <button 
                class="mark-button button-naked"
                :class="{ 'master-mark-button' : masterScreen}"
                @click="() => $emit('handleChangeCharMark', type, i)"
              >
                <div class="mark-button-circle" :class="{ 'master-mark-button-circle' : masterScreen}">
                  <div :class="{ 'mark-button-fill' : mark, 'master-mark-button-fill' : masterScreen }"></div>
                </div>
              </button>
            </div>
          </div>
          <div 
            v-if="!masterScreen"
            class="heal-button-wrapper"
          >
            <button 
              class="heal-button button-naked"
              @click="() => $emit('handleMarkHeal', type)"
            >
              CURAR
            </button>
          </div>
          <div class="inputs-container">
            <input 
              type="number" 
              class="info-bar-input-mark left-input"
              :class="{ 'master-info-bar-input' : masterScreen}"
              :disabled="disabledSheet"
              :value="currentValue"
              @blur="e => handleChangeCharNumber(e, typeInfo[type].currentValue)"
            >
            <div class="input-divider" :class="{ 'master-input-divider' : masterScreen}">
              /
            </div>
            <input 
              type="number" 
              class="info-bar-input-mark"
              :class="{ 'master-info-bar-input' : masterScreen}"
              :disabled="disabledSheet"
              :value="maxValue"
              @blur="e => handleChangeCharNumber(e, typeInfo[type].maxValue)"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info-bar-container {
  margin-left: 2rem;
  margin-right: 1rem;
}
.master-info-bar-container {
  margin: 0;
}
.info-bar-label {
  text-align: center;
  color: var(--color-off-white);
  font-size: 14px;
  font-weight: bold;
}
.master-info-bar-label {
  font-size: 10px;
}
.info-bar {
  border: 1px solid grey;
  height: 2.5rem;
  position: relative;
}
.master-info-bar {
  height: 1.5rem;
}
.info-bar-fill {
  position: absolute;
  background-color: v-bind(infoBarFillColor);
  height: 100%;
  width: v-bind(infoBarFillWidth);
  transition: width 1s ease-in-out;
}
.info-bar-components {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2.5rem;
  padding-left: .25rem;
  padding-right: .25rem;
}
.master-info-bar-components {
  height: 1.5rem;
  justify-content: center;
}
.master-info-bar-components-mark {
  height: 1.5rem;
}
.buttons-container {
  display: flex;
  align-items: center;
  gap: .25rem;
}
.info-bar-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 2rem;
  z-index: 1;
}
.info-bar-button img {
  height: 1.5rem;
}
.info-bar-button:disabled {
  background-color: transparent;
  cursor: default;
}
.inputs-container {
  display: flex;
  align-items: center;
  z-index: 1;
}
.info-bar-input {
  width: 6rem;
  height: 2rem;
  font-size: 16px;
  background-color: transparent;
  color: var(--color-white);
  padding-top: .15rem;
  border: none;
}
.marks-container {
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.master-marks-container {
  height: 1.5rem;
}
.mark-container {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}
.mark-button {
  height: 1.75rem;
  width: 1.75rem;
}
.master-mark-button {
  height: 1rem;
  width: 1rem;
  cursor: default;
}
.mark-button-circle {
  height: 1.5rem;
  width: 1.5rem;
  background-color: transparent;
  border-radius: 50%;
  border: 2px solid var(--color-off-white);
  display: flex;
  align-items: center;
  justify-content: center;
}
.master-mark-button-circle {
  height: .75rem;
  width: .75rem;
}
.mark-button-fill {
  width: .5rem;
  height: .5rem;
  background-color: var(--color-off-white);
  border-radius: 50%;
}
.master-mark-button-fill {
  width: .25rem;
  height: .25rem;
}
.left-input {
  text-align: right;
}
.input-divider {
  color: var(--color-white);
  font-size: 20px;
}
.master-input-divider {
  font-size: 16px;
}
.invert-icon {
  transform: rotateY(180deg)
}
.heal-button-wrapper {
  z-index: 3;
}
.heal-button {
  color: var(--color-green);
  border: 1px solid var(--color-green);
  height: 1.75rem;
  background-color: var(--color-smoky-black);
  border-radius: 4px;
}
.heal-button:hover {
  filter: brightness(150%);
}
.info-bar-input-mark {
  width: 2.5rem;
  height: 2rem;
  font-size: 16px;
  background-color: transparent;
  color: var(--color-white);
  padding-top: .15rem;
  border: none;
}
.master-info-bar-input {
  font-size: 14px;
  height: 1.5rem;
}
</style>