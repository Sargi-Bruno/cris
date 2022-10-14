<script setup lang="ts">
import { ref } from 'vue'
import { getAuth } from 'firebase/auth'
import { getFirestore, updateDoc, doc } from 'firebase/firestore'
import { Weapon, Protection, Misc, CursedItem } from '../../../../../types'
import WeaponForm from '../../../../../components/WeaponForm.vue'
import ProtectionForm from '../../../../../components/ProtectionForm.vue'
import MiscForm from '../../../../../components/MiscForm.vue'
import CursedItemForm from '../../../../../components/WeaponForm.vue'
import LoadingView from '../../../../../components/LoadingView.vue'

defineProps<{item: Weapon | Protection | Misc | CursedItem}>()

const emit = defineEmits(['handleClose', 'handleEditItemSheet'])

const auth = getAuth()
const firestore = getFirestore()
const loading = ref(false)
const itemTypeOptions = {
  weapon: 'weapon',
  protection: 'protection',
  misc: 'misc',
  cursedItem: 'cursedItem'
}

interface Payload {
  item:  Weapon | Protection | Misc | CursedItem
  sheet: boolean
}

const handleEditItem = async (payload: Payload) => {
  if(!auth.currentUser) return

  loading.value = true
  
  if(payload.sheet) {
    emit('handleEditItemSheet', payload.item)
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await updateDoc(doc(firestore, 'homebrewItems', payload.item.id as string), payload.item as any)

  loading.value = false

  emit('handleClose')
}
</script>

<template>
  <div v-if="!loading">
    <div v-if="item.itemType === itemTypeOptions.weapon">
      <WeaponForm
        :weapon="(item as Weapon)"
        edit
        @handle-edit-weapon="handleEditItem"
        @handle-close="$emit('handleClose')"
      />
    </div>
    <div v-if="item.itemType === itemTypeOptions.protection">
      <ProtectionForm
        :protection="(item as Protection)"
        edit
        @handle-edit-protection="handleEditItem"
        @handle-close="$emit('handleClose')"
      />
    </div>
    <div v-if="item.itemType === itemTypeOptions.misc">
      <MiscForm
        :misc="(item as Misc)"
        edit
        @handle-edit-misc="handleEditItem"
        @handle-close="$emit('handleClose')"
      />
    </div>
    <div v-if="item.itemType === itemTypeOptions.cursedItem">
      <CursedItemForm
        :cursed-item="(item as CursedItem)"
        edit
        @handle-edit-cursed-item="handleEditItem"
        @handle-close="$emit('handleClose')"
      />
    </div>
  </div>
  <div v-else>
    <LoadingView />
  </div>
</template>