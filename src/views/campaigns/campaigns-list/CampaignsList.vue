<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, getDocs, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { Campaign } from '../../../types'
import LoadingView from '../../../components/LoadingView.vue'
import CampaignCard from './CampaignCard.vue'
import router from '../../../router'

const auth = getAuth()
const firestore = getFirestore()
const campaigns = ref<Campaign[]>([])
const loading = ref(true)
const showModal = ref(false)
const modalCampaign = ref<Campaign>()
const modalRemoveInput = ref('')
const campaignLimit = 6

onMounted(async () => {
  if(!auth.currentUser) return

  const docs: Campaign[] = []

  const campaignsCollection = collection(firestore, 'campaigns')
  const campaignsRef = query(campaignsCollection, where('usersId', 'array-contains', auth.currentUser?.uid))

  const querySnapshot = await getDocs(campaignsRef)

  querySnapshot.docs.forEach((doc) => {
    const data: Campaign = doc.data() as Campaign
    data.id = doc.id

    docs.push(data)
  })

  docs.sort((a, b) => ((b.timestamp?.seconds as number) * 1000) - ((a.timestamp?.seconds as number) * 1000))

  campaigns.value = docs
  loading.value = false
})

const canRemove = computed(() => {
  return modalRemoveInput.value.toLocaleLowerCase().trim() === 'remover'
})

const handleOpenModal = (charId: string) => {
  showModal.value = true
  const index = campaigns.value.findIndex((e) => e.id === charId)
  modalCampaign.value = campaigns.value[index]
}

const handleCloseModal = () => {
  showModal.value = false
  modalCampaign.value = undefined
  modalRemoveInput.value = ''
}

const handleNewCampaign = () => {
  if(campaigns.value.length > campaignLimit) return

  router.push({ name: 'campaign-create'})
}

const handleOpenCampaign = (campaignId: string) => {
  router.push({ name: 'campaign-page', params: { id: campaignId }})
}

const handleRemoveCampaign = () => {
  if(!modalCampaign.value) return

  for(const charId of modalCampaign.value.charactersId) {
    updateDoc(doc(firestore, 'characters', charId), { campaignId: '' })
  }

  deleteDoc(doc(firestore, 'campaignLogs', modalCampaign.value.campaignLogId as string))
  deleteDoc(doc(firestore, 'campaigns', modalCampaign.value.id as string))
  const index = campaigns.value.findIndex((e) => e.id === modalCampaign?.value?.id)
  campaigns.value.splice(index, 1)

  handleCloseModal()
}
</script>

<template>
  <div 
    v-if="!loading" 
    class="campaigns-container"
  >
    <div v-if="campaigns.length > 0">
      <button 
        class="button-primary new-button"
        :disabled="campaigns.length >= campaignLimit"
        @click="handleNewCampaign"
      >
        Nova Campanha
      </button>
      <div>
        <h3>
          Campanhas {{ campaigns.length }}/{{ campaignLimit }}
        </h3>
        <div class="cards-container">
          <div 
            v-for="campaign in campaigns"
            :key="campaign.id"
          >
            <CampaignCard
              :campaign="campaign"
              @handle-open-campaign="handleOpenCampaign"
              @handle-remove="handleOpenModal"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-campaigns-container">
      <h3>Você ainda não criou nenhuma campanha!</h3>
      <button 
        class="button-primary"
        @click="$router.push({ name: 'campaign-create'})"
      >
        Nova Campanha
      </button>
    </div>
    <div v-if="modalCampaign">
      <vue-final-modal 
        v-model="showModal"
        classes="modal-container"
      >
        <div class="modal-content modal-width">
          <div class="modal-header">
            <h2>Deletar campanha?</h2>
            <button @click="handleCloseModal">
              <img
                class="close-icon"
                src="../../../assets/close-icon.svg" 
                alt="fechar"
              >
            </button>
          </div>
          <div class="modal-body">
            <h3>Para confirmar essa operação, digite <b>REMOVER</b> no campo abaixo:</h3>
            <h4>Atenção: essa operação é permanente e irreversível!</h4>
            <div class="input-container">
              <input 
                v-model="modalRemoveInput"
                type="text"
                class="input-primary"
                @keyup.enter="handleRemoveCampaign"
              />
              <button
                class="button-remove"
                :disabled="!canRemove"
                @click="handleRemoveCampaign"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </vue-final-modal>
    </div>
  </div>
  <div v-else>
    <LoadingView />
  </div>
</template>

<style scoped>
.campaigns-container {
  margin-top: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
}
.new-button {
  display: block;
  margin-left: auto;
}
.no-campaigns-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16rem;
}
.cards-container {
  display: grid;
  margin-top: 1.5rem;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 3.5rem;
  row-gap: 2.5rem;
  margin-bottom: 2.5rem;
}
@media only screen and (max-width: 1280px) {
  .cards-container {
    column-gap: 2.25rem;
  }
}
.modal-width {
  width: 40rem;
}
:deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-body h3 {
  margin: 0;
  font-weight: normal;
  font-size: 16px;
}
.modal-body h4 {
  margin: 0;
  font-size: 12px;
  color: var(--color-red);
  font-weight: normal;
}
.input-container {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}
.input-container input {
  background-color: var(--color-smoky-black);
  width: 100%;
}
</style>