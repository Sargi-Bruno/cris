<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Character, Power, Background } from '../../../../types'
import Backgrounds from '../../../../data/backgrounds'
import PowerCard from '../../../../components/PowerCard.vue'

const props = defineProps<{character: Character}>()

const emit = defineEmits(['handleAddPower'])

const background = ref<Background>()

const handleAddPower = (power: Power) => emit('handleAddPower', power)

onMounted(() => {
  const backgroundChar = Backgrounds.find((ele) => props.character.backgroundName === ele.name)

  if(!backgroundChar) return

  background.value = backgroundChar
})
</script>

<template>
  <div class="class-abilities-container">
    <div
      v-if="background"
      class="class-abilities-content"
    >
      <div class="class-abilitie-card">
        <PowerCard
          :power="background.power"
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
.class-abilities-content {
  margin-top: 1rem;
  border-radius: 4px;
  padding: .5rem;
  background-color: var(--color-smoky-black);
}
</style>