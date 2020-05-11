<template>
  <div class="home">
    <div class="modal-btn-container">
      <button
        @click="openModal"
      >
        ADD PROGRAM
      </button>
      <button
        @click="openActivityModal"
      >
        ADD ACTIVITY
      </button>
    </div>
    <Programs />
    <AddProgramModal
      v-if="programModalOpen"
      :activities="activities"
      @close="closeModal"
    />
    <AddActivityModal
        v-if="activityModalOpen"
        @close="closeModal"
        @saveToActivities="saveToActivities"
    />
  </div>
</template>

<script>
/* eslint-disable */

import Programs from '@/components/Programs'
import AddProgramModal from '@/components/AddProgramModal'
import AddActivityModal from '@/components/AddActivityModal'
import db from '@/components/firebaseInit.js'

export default {
  name: 'Home',
  components: {
    Programs,
    AddProgramModal,
    AddActivityModal,

  },
  data () {
    return {
      activities: [],
      programModalOpen: false,
      activityModalOpen: false
    }
  },
  methods: {
    openModal () {
      this.programModalOpen = true
    },
    openActivityModal () {
      this.activityModalOpen = true
    },
    closeModal () {
      this.programModalOpen = false
      this.activityModalOpen = false
    },
    saveToActivities(val) {
        this.activities = [
            ...this.activities, val
        ]
        console.log(`${val} Added`)
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