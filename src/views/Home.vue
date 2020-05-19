<template>
  <div class="home">
    <div class="modal-btn-container">
      <button @click="openModal"> ADD PROGRAM </button>
      <button @click="openActivityModal"> ADD ACTIVITY </button>
    </div>
    <div class="program-wrapper">
        <Programs
            v-for="program in programs" :key="program.id"
            :program="program"
            @selectProgram="selectProgram"
        />
    </div>
    <AddProgramModal
        v-if="programModalOpen"
        :activities="activities"
        :selectedProgram="selectedProgram"
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
            programs: [],
            programModalOpen: false,
            activityModalOpen: false,
            selectedProgram: null
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
            this.selectedProgram = null

            this.programModalOpen = false
            this.activityModalOpen = false
        },
        saveToActivities (val) {
            this.activities = [
                ...this.activities, val
            ]
            console.log(`${val} Added`)
        },
        selectProgram (program) {
            this.selectedProgram = program
            this.programModalOpen = true
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
        })
        .catch (err => {
            console.error(err)
        })
        
        db.collection('programs').get()
            .then (querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        'id': doc.id,
                        'code': doc.data().program_code,
                        'name': doc.data().name,
                        'description': doc.data().description,
                        'activities': doc.data().activities
                    }

                    this.programs = [
                        ...this.programs,
                        data
                    ]
                    
                })
            })
            .catch (err => {
                console.error(err)
            })
    }
}
</script>

<style scoped>

.program-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}

#programs {
    grid-column: 1/2;
}

</style>