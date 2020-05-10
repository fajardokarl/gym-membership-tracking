<template>
  <div class="home">
    <div class="modal-btn-container">
      <button
        @click="openModal"
      >
        ADD PROGRAM
      </button>
    </div>
    <Programs />
    <AddModal
      v-if="activityModalOpen"
      :activities="activities"
      @close="closeModal"
    />
  </div>
</template>

<script>
/* eslint-disable */

import Programs from '@/components/Programs.vue'
import AddModal from '@/components/AddModal.vue'
import db from '@/components/firebaseInit.js'

export default {
  name: 'Home',
  components: {
    Programs,
    AddModal
  },
  data () {
    return {
      activities: [],
      activityModalOpen: false
    }
  },
  methods: {
    openModal () {
      this.activityModalOpen = true
    },
    closeModal () {
      this.activityModalOpen = false
    }
  },
  mounted () {
    db.collection('activities').get()
      .then (querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            'id': doc.id,
            'name': doc.data().name,
            'reps': doc.data().reps,
            'sets': doc.data().sets
          }

          this.activities = [
            ...this.activities,
            data
          ]
              
          })
          console.log('home', this.activities)
      })
      .catch (err => {
        console.error(err)
      })
  }
}
</script>

<style scoped>
.modal-btn-container {
  padding: 1em;
}

.modal-btn-container button {
  padding: 10px 20px;
  background: #42b983;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  border: 1px solid;
  border-radius: 20px;
  cursor: pointer;
}

.modal-btn-container button:hover {
  background: #ddffdd;
  border: 1px solid #42b983;
  color: #42b983;
}

.modal-btn-container button:active, .modal-btn-container button:focus {
  outline: none;
}
</style>