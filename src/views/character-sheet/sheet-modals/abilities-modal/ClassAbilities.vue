<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Character, Class, Power } from '../../../../types'
import classes from '../../../../data/classes'
import TabNav from '../../../../components/TabNav.vue'
import PowerCard from '../../../../components/PowerCard.vue'
import SearchInput from '../../../../components/SearchInput.vue'
import { compare } from '../../../../utils/functions'

interface TabOptions {
  label: string,
  value: number
}

const props = defineProps<{character: Character}>()

const emit = defineEmits(['handleAddPower'])

const charClass = ref<Class>()
const tabOptions = ref<TabOptions[]>([])
const currentTab = ref(0)
const searchText = ref('')

const handleAddPower = (power: Power) => emit('handleAddPower', power)

onMounted(() => {
  charClass.value = classes.find((element) => props.character.className === element.name)

  if(!charClass.value) return

  tabOptions.value.push({
    label: `Poderes de ${charClass.value.name}`,
    value: 0
  })

  charClass.value.paths.forEach((path, i) => {
    tabOptions.value.push({
      label: path.name,
      value: i+1
    })
  })
})

const currentPowers = computed<Power[]>(() => {
  if(!charClass.value) return []

  if(currentTab.value === 0) return charClass.value.powers.filter((ele) => compare(ele.name, searchText.value))
  else return charClass.value.paths[currentTab.value - 1].abilities
})
</script>

<template>
  <div class="class-abilities-container">
    <TabNav
      :current-tab="currentTab"
      :tab-options="tabOptions"
      secondary
      @handle-navigation="(value: number) => currentTab = value"
    />
    <div
      v-if="currentTab === 0"
      class="search-container"
    >
      <SearchInput 
        :value="searchText"
        dark
        @update="value => searchText = value"
      />
    </div>
    <div
      v-if="currentPowers.length > 0"
      class="class-abilities-content"
    >
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