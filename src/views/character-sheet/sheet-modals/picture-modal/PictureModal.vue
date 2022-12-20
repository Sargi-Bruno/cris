<script setup lang="ts">
import { ref } from 'vue'
import { Character } from '../../../../types'
import { v4 as uuidv4 } from 'uuid'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import LoadingView from '../../../../components/LoadingView.vue'
import { getStorage, ref as refFirebase, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"

const props = defineProps<{character: Character}>()

const emit = defineEmits(['handleCloseModal', 'handleUpdatePicture'])

const storage = getStorage()
const imgURL = ref()
const imgBlob = ref()
const imgFileInput = ref()
const loading = ref(false)

const handleChangeImg = (e: Event) => {
  const imgValue = (e.target as HTMLInputElement).files

  if(imgValue) {
    if(imgValue[0]) {
      imgURL.value = URL.createObjectURL(imgValue[0])
    }
  }
}

// @ts-expect-error this library doesn't support ts
const handleCropperImg = ({ canvas }) => {
  // @ts-expect-error this library doesn't support ts
 canvas.toBlob(blob => imgBlob.value = blob)
}

const handleChangePicture = () => {
  loading.value = true
  const storageRef = refFirebase(storage, `images/${uuidv4()}`)

  uploadBytes(storageRef, imgBlob.value).then(async (snapshot) => {
    const downloadURL = await getDownloadURL(snapshot.ref)

    if(props.character.sheetPictureURL !== '') {
      const deleteImgRef = refFirebase(storage, props.character.sheetPictureFullPath)

      deleteObject(deleteImgRef).then(() => {
        loading.value = false
        emit('handleUpdatePicture', downloadURL, snapshot.metadata.fullPath)
      })
    } else {
      loading.value = false
      emit('handleUpdatePicture', downloadURL, snapshot.metadata.fullPath)
    }
  })
}
</script>

<template>
  <div class="modal-content modal-width">
    <div class="modal-header">
      <h2>Foto do Agente</h2>
      <button @click="$emit('handleCloseModal')">
        <img
          class="close-icon"
          src="../../../../assets/close-icon.svg" 
          alt="fechar"
        >
      </button>
    </div>
    <div class="modal-body">
      <div v-if="loading" class="loading-container">
        <LoadingView />
      </div>
      <div v-else>
        <div v-if="imgURL">
          <div class="preview-img-container">
            <Cropper
              class="cropper cropper-img"
              :src="imgURL"
              :stencil-props="{
                aspectRatio: 1/1
              }"
              @change="handleCropperImg"
            />
          </div>
          <div class="buttons-container">
            <button 
              class="button-naked"
              @click="imgFileInput.click()"
            >
              Escolher outra imagem
              <input 
                ref="imgFileInput"
                type="file" 
                class="input-file"
                accept="image/png, image/jpeg"
                @change="handleChangeImg"
              >
            </button>
            <button 
              class="button-primary confirm-button"
              @click="handleChangePicture"
            >
              Confirmar
            </button>
          </div>
        </div>
        <div
          v-else
          class="select-button-container"
        >
          <button 
            class="button-primary"
            @click="imgFileInput.click()"
          >
            Selecionar Imagem
            <input 
              ref="imgFileInput"
              type="file" 
              class="input-file"
              accept="image/png, image/jpeg"
              @change="handleChangeImg"
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-container {
  height: 26rem;
}
.modal-width {
  width: 42rem;
  height: 36rem;
}
.select-button-container {
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.preview-img-container {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.cropper {
	width: 100%;
  height: 26rem;
}
.cropper-img {
  width: 100%;
  height: 26rem;
}
.input-file {
  display: none;
}
.buttons-container {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
}
.confirm-button {
  width: 8rem;
}
</style>