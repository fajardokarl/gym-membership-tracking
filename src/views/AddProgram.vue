<template>
    <div id="form-program">
        <form @submit.prevent="addProgram" id="form-container">
            <div class="main-form">
                <h3>Program Details</h3>
                <input type="text" v-model="program_code" placeholder="Code" >
                <input type="text" v-model="name" placeholder="Name" >
                <input type="text" v-model="description" placeholder="Description" >
                <div class="button-container">
                    <button type="reset" class="reset">Reset</button>
                    <button type="button" class="cancel">Cancel</button>
                    <button type="submit" class="submit">Submit</button>
                </div>
            </div>
            <div class="activities-select">
                <h3>Activities</h3>
                <span v-for="activity in activities" class="activity-pill" :key="activity.id" >
                    <input type="checkbox"
                        class="pill-checkbox"
                        :id="activity.id"
                        :value="activity.id"
                        @change="selectActivity"
                    >
                    <label :for="activity.id"> {{ activity.name }} </label>
                </span>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/components/firebaseInit.js'

/* eslint-disable */
export default {
    name: 'form-program',
    data () {
        return {
            activities: [],
            selectedActivities: [],
            name: null,
            reps: null,
            sets: null,
            description: null,
            program_code: null
        }
    },
    methods: {
        addProgram () {
            db.collection('programs').add({
                program_code: this.program_code,
                name: this.name,
                description: this.description,
                activities: this.selectedActivities
            })
            .then(docRef => console.log(docRef))
            .catch(error => console.error(error))
        },
        selectActivity (evt) {
            const { value } = evt.target
            
            const index = this.selectedActivities.findIndex(c => c === value)
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

            console.log(this.selectedActivities)

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
            console.log(this.activities)
        })
        .catch (err => {
            console.error(err)
        })
    }
}
</script>

<style>
#form-container {
    display: flex;
    grid-template-columns: 1fr 1fr;
}

.main-form, .activities-select {
    list-style-type: none;
    list-style: none;
    background: #fff;
    padding: 1.2em;
    margin: 1em;
    border-radius: 3px;
    -webkit-box-shadow: 3px 3px 5px #ccc;
    -moz-box-shadow: 3px 3px 5px #ccc;
    box-shadow: 3px 3px 5px #ccc;
    width: 50%;
}

.main-form {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}

.main-form input {
    grid-column: 1/4;
    padding: 5px 10px;
    margin: 5px;
    background: #fff;
    border-radius: 3px;
    border: solid 1px #aaaaaa;
}
.button-container {
    grid-column: 1/4;
    display: flex;
    justify-content: space-between;    
}

.button-container button {
    padding: 5px 10px;
    margin: 5px;
    width: 100%;
}

.main-form input:active, .main-form input:focus {
    padding: 5px 10px;
    margin: 5px;
    background: #fff;
    border-radius: 3px;
    border: solid 1px #5532ef;
    outline: none;
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
    background: #23ccff;
    border: solid 2px #1c1cff;
    color: #fff;
}
</style>