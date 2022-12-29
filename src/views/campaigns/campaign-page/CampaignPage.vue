<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { getFirestore, getDoc, doc, updateDoc } from 'firebase/firestore'
import { Campaign, Character, Timestamp, ToastInfo } from '../../../types'
import LoadingView from '../../../components/LoadingView.vue'
import CharacterCard from '../../character-list/CharacterCard.vue'
import ToastNotification from '../../../components/ToastNotification.vue'

const auth = getAuth()
const firestore = getFirestore()
const router = useRouter()
const route = useRoute()
const campaignId = route.params.id as string
const baseURL = import.meta.env.VITE_BASE_URL
const loading = ref(true)
const loadingCharRemove = ref(false)
const campaign = ref<Campaign>()
const characters = ref<Character[]>([])
const toastInfo = ref<ToastInfo>({
  message: '',
  type: 'info',
  alive: false,
  timeout: 0
})

onMounted(async () => {
  const querySnapshot = await getDoc(doc(firestore, 'campaigns', campaignId))

  if(!querySnapshot.data()) router.push({ name: 'not-found' })

  campaign.value = querySnapshot.data() as Campaign
  campaign.value.id = querySnapshot.id

  for(const charId of campaign.value.charactersId) {
    const charSnapshot = await getDoc((doc(firestore, 'characters', charId)))

    const char = charSnapshot.data() as Character
    char.id = charSnapshot.id

    characters.value.push(char)
  }

  loading.value = false
})

const handleResetLink = () => {
  if(!campaign.value) return

  campaign.value.joinId = crypto.randomUUID().substring(0, 13)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateDoc(doc(firestore, 'campaigns', campaign.value.id as string), campaign.value as any)
}

const handleCopyLink = async () => {
  if(!campaign.value) return

  await navigator.clipboard.writeText(baseURL + 'campanha/entrar/' + campaign.value.joinId)
  toastInfo.value.message = 'Link copiado'
  toastInfo.value.alive = true
}

watch(() => toastInfo.value.alive, () => {
  if(toastInfo.value.alive === true) {
    toastInfo.value.timeout = window.setTimeout(() => toastInfo.value.alive = false, 3000)
  }
})

const dismissToastInfo = () => {
  toastInfo.value.alive = false
  clearTimeout(toastInfo.value.timeout)
}

const canRemoveFromCampaign = (charUid: string | undefined) => {
  if(!auth.currentUser) return
  if(!charUid) return

  if(auth.currentUser.uid === charUid) return true
  if(auth.currentUser.uid === campaign.value?.uid) return true

  return false
}

const handleRemoveCharFromCampaign = async (charId: string) => {
  if(!campaign.value) return
  if(!campaign.value.id) return

  loadingCharRemove.value = true

  const charIndex = campaign.value?.charactersId.indexOf(charId)
  campaign.value?.charactersId.splice(charIndex, 1)

  await updateDoc(doc(firestore, 'characters', charId), { campaignId: '' })
  await updateDoc(doc(firestore, 'campaigns', campaign.value.id), { charactersId: campaign.value.charactersId })

  const charListIndex = characters.value.findIndex((e) => e.id === charId)
  characters.value.splice(charListIndex, 1)

  // Verify if char owner still have chars in this campaign
  const charRemovedSnapshot = await getDoc(doc(firestore, 'characters', charId))

  const charOwnerUid = charRemovedSnapshot.data()?.uid
  let ownerStillHasChars = false

  for(const charIdCampaign of campaign.value.charactersId) {
    const charSnapshot = await getDoc(doc(firestore, 'characters', charIdCampaign))

    if(charSnapshot.data()?.uid === charOwnerUid) ownerStillHasChars = true
  }

  // If doesn't has chars, remove user ref from campaign
  if(!ownerStillHasChars) {
    const userIdIndex = campaign.value.usersId.indexOf(charOwnerUid)
    campaign.value.usersId.splice(userIdIndex, 1)

    await updateDoc(doc(firestore, 'campaigns', campaign.value.id), { usersId: campaign.value.usersId })

    // Redirect if the auth is the current user being removed
    if(charOwnerUid === auth.currentUser?.uid) {
      router.push({ name: 'campaigns-list' })
    }
  }

  loadingCharRemove.value = false

  toastInfo.value.message = 'Agente removido da campanha!'
  toastInfo.value.alive = true
}
</script>

<template>
  <div
    v-if="!loading"
    class="container"
  >
    <div class="header-buttons">
      <button
        v-if="auth.currentUser?.uid === campaign?.uid"
        class="button-primary"
        @click="$router.push({ name: 'campaign-edit', params: { id: campaign?.id }})"
      >
        Editar Campanha
      </button>
      <button 
        class="button-primary"
        @click="$router.push({ name: 'master-screen', params: { id: campaign?.id }})"
      >
        Escudo do Mestre
      </button>
    </div>
    <div class="campaign-content">
      <div class="campaign-info">
        <div class="campaign-name">
          {{ campaign?.name }}
        </div>
        <div class="campaign-description">
          <div v-html="campaign?.description" />
        </div>
      </div>
      <div class="campaign-link-container">
        <div class="campaign-link-header">
          Link da Campanha
        </div>
        <div class="campaign-link-wrapper">
          <a 
            class="campaign-link"
            :href="baseURL + 'campanha/entrar/' + campaign?.joinId"
          >
            {{ baseURL + 'campanha/entrar/' + campaign?.joinId }}
          </a>
        </div>
        <div class="campaign-link-buttons">
          <button 
            class="button-naked reset-button"
            @click="handleResetLink"
          >
            Resetar
          </button>
          <button 
            class="button-naked"
            @click="handleCopyLink"
          >
            Copiar
          </button>
        </div>
      </div>
    </div>
    <div 
      v-if="!loadingCharRemove"
      class="agents-in-campaign"
    >
      <div class="agents-title">
        Agentes
      </div>
      <div v-if="characters.length > 0">
        <div class="cards-container">
          <div 
            v-for="character in characters"
            :key="character.id"
          >
            <CharacterCard
              campaign-page
              :char-id="(character.id as string)"
              :name="character.name"
              :char-class="character.className"
              :timestamp="(character.timestamp as Timestamp).seconds"
              :sheet-picture="character.sheetPictureURL"
              :can-remove-from-campaign="canRemoveFromCampaign(character.uid)"
              @handle-open-sheet="$router.push({ name: 'character-sheet', params: { id: character.id }})"
              @handle-remove-from-campaign="handleRemoveCharFromCampaign"
            />
          </div>
        </div>
      </div>
      <div v-else>
        <div class="no-agents-container">
          <h3>Ainda não há agentes nesta campanha!</h3>
        </div>
      </div>
    </div>
    <div v-else>
      <LoadingView />
    </div>
    <transition name="toast">
      <ToastNotification
        v-if="toastInfo.alive"
        :toast="toastInfo"
        :type="toastInfo.type"
        @dismiss="dismissToastInfo"
      />
    </transition>
  </div>
  <div v-else>
    <LoadingView />
  </div>
</template>

<style scoped>
.container {
  margin-top: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
}
.header-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
.campaign-content {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between
}
.campaign-info {
  width: 60%;
}
.campaign-name {
  color: var(--color-white);
  font-size: 32px;
  margin-bottom: .5rem;
  width: 700px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.campaign-description {
  height: 10rem;
  overflow: auto;
  padding-right: 2rem;
}
.campaign-link-container {
  width: 30%;
  margin-top: auto;
  padding: 1rem;
  padding-bottom: 0;
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border-radius: 4px;
  background-color: var(--color-dark-gray);
}
.campaign-link-header {
  color: var(--color-white);
  font-size: 22px;
  margin-bottom: .5rem;
  text-align: center;
}
.campaign-link-wrapper {
  display: flex;
  justify-content: center;
}
.campaign-link {
  color: var(--color-off-white);
  font-size: 12px;
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
}
.campaign-link-buttons {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: .5rem auto;
}
.reset-button:hover {
 color: var(--color-red);
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
.no-agents-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
}
.agents-in-campaign {
  margin-top: 3rem;
}
.agents-title {
  color: var(--color-white);
  font-size: 26px;
}
</style>