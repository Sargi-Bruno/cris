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
})

const emit = defineEmits(['handleRemove', 'handleOpenSheet', 'handleShareCharacter'])

const creationDate = computed(() => {
  const date = new Date(props.timestamp * 1000);
  const day = date. getDate()
  const month = date.getMonth() + 1
  const monthString = month < 10 ? `0${month}` : month.toString()
  const year = date.getFullYear().toString().substring(2, 4)

  return `${day}/${monthString}/${year}`
})

const handleShareCharacter = () => {
  emit('handleShareCharacter', props.charId)
}
</script>

<template>
  <div class="card">
    <div class="header">
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
      <div>
        <button 
          class="button-naked share-button"
          @click="handleShareCharacter"
        >
          <img src="../../assets/share-icon.png" alt="compartilhar">
        </button>
      </div>
    </div>
    <div class="footer">
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
  justify-content: space-between;
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
  margin-left: 1.5rem;
}
.content h3 {
  width: 280px;
  margin: 0;
  margin-top: 1rem;
  font-size: 26px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.content h4 {
  margin: 0;
  font-weight: normal;
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
  margin-top: 1rem;
  margin-left: 1.5rem;
}
.sheet-button {
  height: 2rem;
  width: 4rem;
}
</style>