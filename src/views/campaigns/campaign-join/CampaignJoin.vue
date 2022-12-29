<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, updateDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { Campaign, Character, Timestamp } from '../../../types'
import CharacterCard from '../../character-list/CharacterCard.vue'
import LoadingView from '../../../components/LoadingView.vue'
import SearchInput from '../../../components/SearchInput.vue'
import { compare } from '../../../utils/functions'

const auth = getAuth()
const firestore = getFirestore()
const router = useRouter()
const route = useRoute()
const campaignJoinId = route.params.id as string
const loading = ref(true)
const canJoinNewCampaign = ref(true)
const isCampaignFull = ref(false)
const campaign = ref<Campaign>()
const characters = ref<Character[]>([])
const searchText = ref('')
const campaignLimit = 6
const campaignFullLimit = 12

onMounted(async () => {
  if(!auth.currentUser) return

  const campaignsCollection = collection(firestore, 'campaigns')

  // Fetching campaign to join
  const campaignToJoinRef = query(campaignsCollection, where('joinId', '==', campaignJoinId))
  const campaignToJoinQuerySnapshot = await getDocs(campaignToJoinRef)

  if(!campaignToJoinQuerySnapshot.docs[0]) router.push({ name: 'not-found' })

  campaign.value = campaignToJoinQuerySnapshot.docs[0].data() as Campaign
  campaign.value.id = campaignToJoinQuerySnapshot.docs[0].id
  
  // Checking if user can join new Campaigns
  const userCampaignsRef = query(campaignsCollection, where('usersId', 'array-contains', auth.currentUser?.uid))
  const userCampaignsQuerySnapshot = await getDocs(userCampaignsRef)

  // Checking if user already is in this Campaign
  let isUserInCampaign = false

  userCampaignsQuerySnapshot.forEach((doc) => {
    if(doc.id === campaign.value?.id) {
      isUserInCampaign = true
    }
  })

  if(userCampaignsQuerySnapshot.size >= campaignLimit && !isUserInCampaign) {
    canJoinNewCampaign.value = false
  } else if(campaign.value.charactersId.length >= campaignFullLimit) {
      isCampaignFull.value = true
    } else {
        // Fetching user chars
        const docs: Character[] = []

        const charsCollection = collection(firestore, 'characters')
        const charsRef = query(charsCollection, where('uid', '==', auth.currentUser?.uid))

        const charsQuerySnapshot = await getDocs(charsRef)

        charsQuerySnapshot.docs.forEach((doc) => {
          const data: Character = doc.data() as Character
          data.id = doc.id

          docs.push(data)
        })

        docs.sort((a, b) => ((b.timestamp?.seconds as number) * 1000) - ((a.timestamp?.seconds as number) * 1000))

        characters.value = docs
      }
    
  loading.value = false
})

const filteredChars = computed(() => {
  return characters.value.filter((ele) => compare(ele.name, searchText.value))
})

const handleChooseForCampaign = async (charId: string) => {
  if(!campaign.value) return
  if(!auth.currentUser?.uid) return

  loading.value = true

  campaign.value.charactersId.push(charId)

  if(!campaign.value.usersId.includes(auth.currentUser.uid)) campaign.value.usersId.push(auth.currentUser.uid)

  await updateDoc(doc(firestore, 'characters', charId), { campaignId: campaign.value.id })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await updateDoc(doc(firestore, 'campaigns', campaign.value.id as string), campaign.value as any)

  loading.value = false
  
  router.push({ name: 'campaign-page', params: { id: campaign.value.id } })
}
</script>

<template>
  <div 
    v-if="!loading"
    class="campaign-join-container"
  >
    <div v-if="canJoinNewCampaign && !isCampaignFull">
      <div class="campaign-name">
        {{ campaign?.name }}
      </div>
      <div class="text">
        {{ campaign?.dmName }} esta te convidando para se juntar à {{ campaign?.name }}. Escolha seu agente!
      </div>
      <div v-if="characters.length > 6">
        <SearchInput 
          :value="searchText"
          @update="(value: string) => searchText = value"
        />
      </div>
      <div class="cards-container">
        <div 
          v-for="character in filteredChars"
          :key="character.id"
        >
          <CharacterCard
            join-campaign-mode
            :char-id="(character.id as string)"
            :name="character.name"
            :char-class="character.className"
            :timestamp="(character.timestamp as Timestamp).seconds"
            :sheet-picture="character.sheetPictureURL"
            :campaign-id="character.campaignId"
            @handle-choose-for-campaign="handleChooseForCampaign"
          />
        </div>
      </div>
    </div>
    <div v-if="!canJoinNewCampaign">
      <div class="info-message">
        Você já atingiu o limite de campanhas!
      </div>
      <button 
        class="button-primary info-message-button"
        @click="$router.push({ name: 'campaigns-list' })"
      >
        Ir para Campanhas
      </button>
    </div>
    <div v-else-if="isCampaignFull">
      <div class="info-message">
        Esta campanha já atingiu o limite de agentes!
      </div>
      <button 
        class="button-primary info-message-button"
        @click="$router.push({ name: 'campaigns-list' })"
      >
        Ir para Campanhas
      </button>
    </div>
  </div>
  <div v-else>
    <LoadingView />
  </div>
</template>

<style scoped>
.campaign-join-container {
  margin-top: 4rem;
  padding-left: 2rem;
  padding-right: 2rem;
}
.campaign-name {
  text-align: center;
  color: var(--color-white);
  font-size: 36px;
  width: 1000px;
  margin: 0 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.text {
  color: var(--color-white);
  text-align: center;
  font-size: 18px;
  margin-bottom: 1rem;
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
.info-message {
  color: var(--color-white);
  text-align: center;
  font-size: 22px;
  margin-top: 14rem;
}
.info-message-button {
  display: block;
  margin: 4rem auto;
}
</style>