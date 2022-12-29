<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { CampaignLog, ToastAttackInterface, ToastRoll } from '../types'
import CampaignLogToastDice from './CampaignLogToastDice.vue'
import CampaignLogToastAttack from './CampaignLogToastAttack.vue'

interface Props {
  campaignLog: CampaignLog,
  masterScreen?: boolean
}

const props = defineProps<Props>()

defineEmits(['handleCloseCampaignLog'])

const bottom = ref<null | HTMLDivElement>(null)

const getDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const day = date.getDate()
  const dayString = day < 10 ? `0${day}` : day.toString()
  const month = date.getMonth() + 1
  const monthString = month < 10 ? `0${month}` : month.toString()
  const year = date.getFullYear().toString().substring(2, 4)
  const hours = date.getHours()
  const hoursString = hours < 10 ? `0${hours}` : hours.toString()
  const minutes = date.getMinutes()
  const minutesString = minutes < 10 ? `0${minutes}` : minutes.toString()

  return `${dayString}/${monthString}/${year} ${hoursString}:${minutesString}`
}

const bigScreenContentHeight = computed(() => {
  if(props.masterScreen) return '52rem'
  return '55rem'
})

onMounted(() => {
  bottom.value?.scrollIntoView()
})

watch(() => props.campaignLog.campaignLogMessages, () => {
  bottom.value?.scrollIntoView({ behavior: 'smooth' })
})
</script>

<template>
  <div 
    :class="[masterScreen ? 'campaign-log-container-master-screen' : 'campaign-log-container-sheet']"
  >
    <div class="campaign-log-content">
      <div class="header">
        <div class="title">
          Resultados
        </div>
        <button
          v-if="!masterScreen"
          @click="$emit('handleCloseCampaignLog')"
        >
          <img
            class="close-icon"
            src="../assets/close-icon.svg" 
            alt="fechar"
          >
        </button>
      </div>
      <div class="log-messages-container">
        <div 
          v-for="(log, index) in campaignLog.campaignLogMessages"
          :key="index"
          class="log-messages"
        >
          <div class="log-sender">
            {{ log.sender }}
          </div>
          <CampaignLogToastDice
            v-if="log.contentType === 'roll'"
            :toast="(log.content as ToastRoll)"
          />
          <CampaignLogToastAttack
            v-if="log.contentType === 'attackRoll'"
            :toast="(log.content as ToastAttackInterface)"
          />
          <div class="date">
            {{ getDate(log.timestamp) }}
          </div>
        </div>
        <div ref="bottom" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.campaign-log-container-sheet {
  position: fixed;
  width: 18rem;
  height: calc(100% - 1rem);
  z-index: 3;
  right: 0;
  bottom: 0;
  background-color: var(--color-light-black);
  border-radius: 4px;
}
.campaign-log-container-master-screen {
  width: 18rem;
  background-color: var(--color-light-black);
  border-radius: 4px;
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
}
@media only screen and (max-width: 1280px) {
  .campaign-log-container-master-screen {
    position: sticky;
    top: .25rem;
  }
}
.campaign-log-content {
  padding: 1rem;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}
.title {
  color: var(--color-white);
  font-weight: bold;
  font-size: 14px;
}
.log-messages-container {
  height: v-bind(bigScreenContentHeight);
  overflow: auto;
  overflow-x: hidden;
  margin-top: .75rem;
}
@media only screen and (max-width: 1280px) {
  .log-messages-container {
    height: 35rem;
  }
}
.log-messages-container::-webkit-scrollbar {
  display: none;
}
.log-messages:not(:last-of-type) {
  margin-bottom: .75rem;
}
.log-sender {
  color: var(--color-white);
}
.date {
  color: var(--color-off-white);
  text-align: right;
  padding-right: .25rem;
  font-size: 11px;
}
</style>