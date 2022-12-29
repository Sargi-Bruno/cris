<script setup lang="ts">
import { computed } from 'vue'
import { ToastAttackInterface } from '../types'

const props =  defineProps<{toast: ToastAttackInterface}>()

const greenColor = '#5cb85c'
const redColor = '#d9534f'
const whiteColor = '#fff'

const attackColor = computed(() => {
  if(props.toast.critical === 1) return greenColor
  if(props.toast.critical === -1) return redColor
  return whiteColor
})
</script>

<template>
  <div class="toast">
    <div class="toast-content">
      <img
        class="toast-icon"
        src="../assets/d20-icon.png" 
        alt="d20"
      >
      <div class="text">
        <h3 class="title">
          {{ toast.title }}
        </h3>
        <div class="result">
          <div class="attack-container">
            <div class="attack-tooltip">
              <div class="tooltip-container">
                <h5>{{ toast.attackTooltip }}</h5>
                <h5>{{ toast.attackRollTooltip }}</h5>
              </div>
            </div>
            <h3>{{ toast.totalAttack }}</h3>
            <h4>ATAQUE</h4>
          </div>
          <div class="divider" />
          <div class="damage-container">
            <div class="damage-tooltip">
              <div class="tooltip-container">
                <h5>{{ toast.damageTooltip }} | {{ toast.criticalTooltip }}</h5>
                <h5>{{ toast.damageRollTooltip }}</h5>
              </div>
            </div>
            <h3>{{ toast.totalDamage }}</h3>
            <h4>DANO</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast {
  padding: .5rem;
  background-color: var(--color-dark-gray);
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border: 1px solid var(--color-primary);
  border-radius: 4px;
}
.toast-content {
  display: flex;
  align-items: center;
  height: 4.5rem;
}
.text {
  margin-left: .5rem;
}
.title {
  font-size: 16px;
  color: var(--color-white);
  margin: 0;
  width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.result {
  width: 11.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.result h3 {
  width: 2.25rem;
  margin: 0;
  font-size: 24px;
  text-align: center;
}
.result h4 {
  margin: 0;
  font-size: 12px;
  color: var(--color-off-white);
  text-align: center;
}
.attack-container {
  position: relative;
  width: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.attack-tooltip {
  position: absolute;
  top: -80px;
  opacity: 0;
  background-color: var(--color-smoky-black);
  border-radius: 8px;
  border: 1px solid var(--color-gray);
  display: none;
  width: 14rem;
  height: 4rem;
  padding: .5rem;
}
.tooltip-container {
  margin: 0 auto;
  margin-top: auto;
  margin-bottom: auto;
}
.tooltip-container h5 {
  color: var(--color-white);
  margin: 0 auto;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 12px;
  font-weight: normal;
  text-align: center;
}
.tooltip-container h5:first-of-type {
  color: var(--color-off-white);
}
.attack-container:hover > .attack-tooltip {
  opacity: 1;
  display: flex;
  transition: opacity 150ms ease-in;
}
.attack-container h3 {
  color: v-bind(attackColor);
}
.damage-container {
  position: relative;
  width: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.damage-tooltip {
  position: absolute;
  top: -80px;
  opacity: 0;
  background-color: var(--color-smoky-black);
  border-radius: 8px;
  border: 1px solid var(--color-gray);
  display: none;
  width: 14rem;
  height: 4rem;
  padding: .5rem;
}
.damage-tooltip span {
  color: var(--color-white);
  margin: 0 auto;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 12px;
  font-weight: normal;
}
.damage-container:hover > .damage-tooltip {
  opacity: 1;
  display: flex;
  transition: opacity 150ms ease-in;
}
.divider {
  height: 2.75rem;
  margin-bottom: auto;
  border-left: 1px solid var(--color-off-white);
}
.toast-icon {
  height: 1.5rem;
  margin-right: .5rem;
}
</style>