<script setup lang="ts">
import { getAuth } from 'firebase/auth'
import { Campaign } from '../../../types'
import { computed } from 'vue'
import DividerView from '../../../components/DividerView.vue'

const props = defineProps<{campaign: Campaign}>()

defineEmits(['handleRemove', 'handleOpenCampaign'])

const auth = getAuth()

const creationDate = computed(() => {
  const date = new Date(props.campaign.timestamp.seconds * 1000);
  const day = date. getDate()
  const dayString = day < 10 ? `0${day}` : day.toString()
  const month = date.getMonth() + 1
  const monthString = month < 10 ? `0${month}` : month.toString()
  const year = date.getFullYear().toString().substring(2, 4)

  return `${dayString}/${monthString}/${year}`
})
</script>

<template>
  <div class="card">
    <div class="content">
      <div class="title">
        {{ campaign.name }}
      </div>
      <div class="date">
        Iniciada em {{ creationDate }}
      </div>
      <div class="players-number-container">
        <div class="players-number">
          {{ campaign.charactersId.length }} 
        </div>
        <div 
          v-if="campaign.charactersId.length !== 1" 
          class="players-number-label"
        >
          JOGADORES
        </div>
        <div
          v-else
          class="players-number-label"
        >
          JOGADOR
        </div>
      </div>
      <div class="dm">
        DM: {{ campaign.dmName.toLocaleUpperCase() }}
      </div>
    </div>
    <div class="footer">
      <DividerView />
      <div :class="[auth.currentUser?.uid === campaign.uid ? 'buttons-container' : 'button-container']">
        <div v-if="auth.currentUser?.uid === campaign.uid">
          <button 
            class="button-remove"
            @click="$emit('handleRemove', campaign.id)"
          >
            Remover
          </button>
        </div>
        <button 
          class="sheet-button button-primary"
          @click="$emit('handleOpenCampaign', campaign.id)"
        >
          Ver Campanha
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 23rem;
  height: 16rem;
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border-radius: 4px;
  background-color: var(--color-dark-gray);
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  margin-top: 1rem;
  color: var(--color-white);
  font-size: 22px;
  width: 340px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
.date {
  color: var(--color-off-white);
  font-size: 14px;
}
.players-number-container {
  text-align: center;
  margin-top: 1rem;
  color: var(--color-white);
}
.players-number {
  font-size: 22px;
}
.players-number-label {
  font-size: 12px;
  color: var(--color-off-white);
}
.dm {
  margin-top: .5rem;
  font-size: 12px;
  color: var(--color-white);
  width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
.footer {
  margin-top: .75rem;
}
.buttons-container {
  padding: 1rem;
  padding-left: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.button-container {
  padding: 1rem;
  padding-left: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>