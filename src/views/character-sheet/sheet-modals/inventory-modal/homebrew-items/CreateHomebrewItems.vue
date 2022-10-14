<script setup lang="ts">
import { ref } from 'vue'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { Weapon, Protection, Misc, CursedItem } from '../../../../../types'
import WeaponForm from '../../../../../components/WeaponForm.vue'
import ProtectionForm from '../../../../../components/ProtectionForm.vue'
import MiscForm from '../../../../../components/MiscForm.vue'
import CursedItemForm from '../../../../../components/CursedItemForm.vue'
import LoadingView from '../../../../../components/LoadingView.vue'

defineProps({
  currentCreateOption: {
    type: String,
    required: true
  },
})

const emit = defineEmits(['handleClose'])

const auth = getAuth()
const firestore = getFirestore()
const loading = ref(false)
const createOptions = {
  weapon: 'weapon',
  protection: 'protection',
  misc: 'misc',
  cursedItem: 'cursedItem'
}

const handleCreateItem = async (item: Weapon | Protection | Misc | CursedItem) => {
  if(!auth.currentUser) return

  loading.value = true
  item.uid = auth.currentUser.uid

  await addDoc(collection(firestore, 'homebrewItems'), item)
  loading.value = false

  emit('handleClose')
}
</script>

<template>
  <div v-if="!loading">
    <div v-if="currentCreateOption === createOptions.weapon">
      <WeaponForm
        @handle-create-weapon="handleCreateItem"
        @handle-close="$emit('handleClose')"
      />
    </div>
    <div v-if="currentCreateOption === createOptions.protection">
      <ProtectionForm
        @handle-create-protection="handleCreateItem"
        @handle-close="$emit('handleClose')"
      />
    </div>
    <div v-if="currentCreateOption === createOptions.misc">
      <MiscForm
        @handle-create-misc="handleCreateItem"
        @handle-close="$emit('handleClose')"
      />
    </div>
    <div v-if="currentCreateOption === createOptions.cursedItem">
      <CursedItemForm
        @handle-create-cursed-item="handleCreateItem"
        @handle-close="$emit('handleClose')"
      />
    </div>
  </div>
  <div v-else>
    <LoadingView />
  </div>
</template>