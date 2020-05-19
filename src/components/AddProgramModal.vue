<template>
  <div id="modal-add">
      <div class="container">
        <form @submit.prevent="addProgram" id="form-container">
            <div class="main-form">
                <h3>Program Details</h3>
                <div class="input-container">
                  <input type="text" v-model="program_code" placeholder="Code" >
                </div>
                <div class="input-container">
                  <input type="text" v-model="name" placeholder="Name" >
                </div>
                <div class="input-container">
                  <input type="text" v-model="description" placeholder="Description" >
                </div>
                <!-- <div class="button-container">
                    <button type="button" class="cancel">Cancel</button>
                </div> -->
            </div>
            <div class="activities-select">
                <h3>Activities</h3>
                <span v-for="activity in activities" class="activity-pill" :key="activity.id" >
                    <input type="checkbox"
                        class="pill-checkbox"
                        :id="activity.id"
                        :value="activity.id"
                        @change="selectActivity"
                        :checked="isActivitySelected(activity.id)"
                    >
                    <label :for="activity.id"> {{ activity.name }} </label>
                </span>
            </div>
            <div class="btn-container">
                <button
                    type="button"
                    class="closeActivityModal"
                    @click="closeModal"> CLOSE
                </button>
                <button type="reset" class="reset"> Reset </button>
                <button type="submit" class="submit"> Save </button>
            </div>
        </form>
      </div>
  </div>
</template>

<script>
/* eslint-disable */
import db from '@/components/firebaseInit.js'

export default {
    name: 'AddProgramModal',
    props: {
      activities: Array,
      selectedProgram: Object
    },
    data () {
      return {
        selectedActivities: [],
        name: null,
        reps: null,
        sets: null,
        description: null,
        program_code: null,
        program_id: null
      }
    },
    methods: {
        closeModal () {
            this.$emit('close')
        },
        addProgram () {
            // Add document if programRef does not exist
            if (this.program_code && this.name && this.description && this.activities.length) {
                const programRef = db.collection('programs').doc(this.program_id)
                programRef.set({
                    program_code: this.program_code,
                    name: this.name,
                    description: this.description,
                    activities: this.selectedActivities
                })
                .then(docRef => {
                document.querySelector('#form-container').reset()
                this.closeModal()
                })
                .catch(err => console.error(err))
            }
            else {
                alert('All fields required!')
            }
        },
        selectActivity (evt) {
            const { value } = evt.target
            
            const index = this.selectedActivities.findIndex(c => c.id === value)
            if (index !== -1) {
                this.selectedActivities = [
                    ...this.selectedActivities.slice(0, index),
                    ...this.selectedActivities.slice(index + 1),
                ]
            } else {
                const activity_data = this.activities.find(a => a.id === value)

                this.selectedActivities = [
                    ...this.selectedActivities,
                    activity_data
                ]
            }
        },
        isActivitySelected (actId) {
            if (this.selectedProgram) {
                const isSelected = this.selectedProgram.activities.some(val => val.id === actId)
                return isSelected
            }
        }
    },
    mounted() {
        if (this.selectedProgram) {
            // Assign values of selected program to v-model data
            this.program_code = this.selectedProgram.code
            this.name = this.selectedProgram.name
            this.description = this.selectedProgram.description
            this.program_id = this.selectedProgram.id
            // check present activities
            this.selectedActivities = this.selectedProgram.activities
        }
    }
}
</script>

<style scoped>
#modal-add {
    background: rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 10000;
    display: flex;
    align-items: center;
}
.container {
    border: solid 1px #ccc;
    border-radius: 5px;
    width: 85%;
    background: #fff;
    margin: auto;
    -webkit-box-shadow: 3px 3px 5px #ccc;
    -moz-box-shadow: 3px 3px 5px #ccc;
    box-shadow: 3px 3px 5px #ccc;
}

#form-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.main-form, .activities-select {
    list-style-type: none;
    list-style: none;
    background: #fff;
    padding: 1.2em;
    margin: 1em;
    border-radius: 5px;
    -webkit-box-shadow: 3px 3px 5px #ccc;
    -moz-box-shadow: 3px 3px 5px #ccc;
    box-shadow: 3px 3px 5px #ccc;
    border: 1px solid #ccc;

}

.activities-select {
    line-height: 2.5;
    word-break: keep-all;
}

.main-form {
	position: relative;
	padding: 10px;
}

.button-container {
    grid-column: 1/4;
    display: flex;
    justify-content: space-between;    
}

span.activity-pill {
    white-space: pre;
}

.activity-pill label {
    padding: 5px 10px;
    margin: 5px;
    background: #fff;
    border-radius: 15px;
    border: solid 2px #aaaaaa;
    cursor: pointer;
}

.activity-pill input {
    display: none;
}

.pill-checkbox:checked ~ label {
    background: #11a536;
    border: solid 2px #555;
    color: #fff;
}

.btn-container {
	grid-column: 2/3;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	padding: 15px;
}
</style>