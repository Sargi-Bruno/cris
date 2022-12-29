<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  charId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  charClass: {
    type: String,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  },
  sheetPicture: {
    type: String || undefined,
    required: true
  },
  campaignPage: {
    type: Boolean
  },
  canRemoveFromCampaign: {
    type: Boolean
  },
  joinCampaignMode: {
    type: Boolean
  },
  campaignId: {
    type: String,
    default: ''
  }
})

const emit = defineEmits([
  'handleRemove', 
  'handleOpenSheet', 
  'handleShareCharacter', 
  'handleChooseForCampaign',
  'handleRemoveFromCampaign',
])

const creationDate = computed(() => {
  const date = new Date(props.timestamp * 1000);
  const day = date.getDate()
  const dayString = day < 10 ? `0${day}` : day.toString()
  const month = date.getMonth() + 1
  const monthString = month < 10 ? `0${month}` : month.toString()
  const year = date.getFullYear().toString().substring(2, 4)

  return `${dayString}/${monthString}/${year}`
})

const contentMargin = computed(() => {
  if(props.sheetPicture) return '1rem'
  return '1.5rem'
})

const headerJustifyContent = computed(() => {
  if(!props.campaignPage && !props.joinCampaignMode) return 'space-between'
  return 'flex-start'
})

const handleShareCharacter = () => {
  emit('handleShareCharacter', props.charId)
}
</script>

<template>
  <div class="card">
    <div class="header">
      <div
        v-if="sheetPicture"
        class="card-img-container"
      >
        <img
          class="card-img"
          :src="sheetPicture"
          alt="foto agente"
        >
      </div>
      <div class="content">
        <h3 v-if="name !== ''">
          {{ name }}
        </h3>
        <h3 v-else>
          [Sem nome]
        </h3>
        <h4>{{ charClass }}</h4>
        <h5>Registrado em {{ creationDate }}</h5>
      </div>
      <div v-if="!campaignPage && !joinCampaignMode">
        <button
          class="button-naked share-button"
          @click="handleShareCharacter"
        >
          <img src="../../assets/share-icon.png" alt="compartilhar">
        </button>
      </div>
    </div>
    <div 
      v-if="campaignPage"
      :class="[canRemoveFromCampaign ? 'footer' : 'alternative-footer']"
    >
      <div v-if="canRemoveFromCampaign">
        <button 
          class="button-remove" 
          @click="$emit('handleRemoveFromCampaign', charId)"
        >
          Remover
        </button>
      </div>
      <button 
        class="sheet-button button-primary"
        @click="$emit('handleOpenSheet', charId)"
      >
        Ficha
      </button>
    </div>
    <div v-if="joinCampaignMode">
      <div 
        v-if="campaignId !== '' && campaignId !== undefined"
        class="already-in-campaign-footer"
      >
        Agente já esta em campanha!
      </div>
      <div
        v-else
        class="alternative-footer"
      >
        <button 
          class="sheet-button button-primary"
          @click="$emit('handleChooseForCampaign', charId)"
        >
          Escolher
        </button>
      </div>
    </div>
    <div
      v-if="!campaignPage && !joinCampaignMode"
      class="footer"
    >
      <button 
        class="button-remove"
        @click="$emit('handleRemove', charId)"
      >
        Remover
      </button>
      <button 
        class="sheet-button button-primary"
        @click="$emit('handleOpenSheet', charId)"
      >
        Ficha
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 23rem;
  height: 10rem;
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border-radius: 4px;
  border-left: 3px solid var(--color-primary);
  background-color: var(--color-dark-gray);
}
.header {
  display: flex;
  justify-content: v-bind(headerJustifyContent);
  height: 7.25rem;
}
.card-img-container {
  margin-top: 1.5rem;
  margin-left: 1.5rem;
}
.card-img {
  width: 5rem;
  height: 5rem;
  border: 1px solid var(--color-off-white);
}
.share-button {
  margin-top: .25rem;
  margin-right: .25rem;
}
.share-button img {
  height: 1.5rem;
}
.content {
  display: flex;
  flex-direction: column;
  margin-left: v-bind(contentMargin);
  width: 200px;
}
.content h3 {
  width: 200px;
  margin: 0;
  margin-top: 1rem;
  font-size: 26px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.content h4 {
  margin: 0;
  width: 220px;
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.content h5 {
  margin: 0;
  font-size: 12px;
  font-weight: normal;
  color: var(--color-off-white);
}
.footer {
  display: flex;
  width: 90%;
  justify-content: space-between;
  margin-left: 1.5rem;
}
.alternative-footer {
  display: flex;
  width: 90%;
  justify-content: flex-end;
  margin-left: 1.5rem;
}
.sheet-button {
  height: 2rem;
  width: 4rem;
}
.already-in-campaign-footer {
  width: 100%;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  background-color: var(--color-smoky-black);
  /* border-bottom-right-radius: 4px; */
}
</style>