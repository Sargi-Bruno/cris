<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Power } from '../../../../types'
import SearchInput from '../../../../components/SearchInput.vue'
import Backgrounds from '../../../../data/backgrounds'
import PowerCard from '../../../../components/PowerCard.vue'
import { compare } from '../../../../utils/functions'

const emit = defineEmits(['handleAddPower'])

const handleAddPower = (power: Power) => emit('handleAddPower', power)

const powers = ref<Power[]>([])
const searchText = ref('')

onMounted(() => {
  for(const background of Backgrounds) {
    powers.value.push(background.power)
  }
})

const currentPowers = computed<Power[]>(() => {
  return powers.value.filter((ele) => compare(ele.name, searchText.value)).sort((a, b) => a.name.localeCompare(b.name))
})
</script>

<template>
  <div class="class-abilities-container">
    <div class="search-container">
      <SearchInput 
        :value="searchText"
        dark
        @update="value => searchText = value"
      />
    </div>
    <div class="class-abilities-content">
      <div 
        v-for="power in currentPowers"
        :key="power.name"
        class="class-abilitie-card"
      >
        <PowerCard
          :power="power"
          @handle-add="handleAddPower"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.class-abilities-container {
  margin-top: 1rem;
}
.search-container {
  margin-top: 1rem;
}
.class-abilities-content {
  margin-top: 1rem;
  border-radius: 4px;
  padding: .5rem;
  background-color: var(--color-smoky-black);
}
.class-abilitie-card:not(:last-of-type) {
  margin-bottom: .5rem;
}
</style>