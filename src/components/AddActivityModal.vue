<template>
    <div id="activity-modal">
        <div class="form-container">
            <h2>Add Activity</h2>
            <form @submit.prevent="addActivity" id="activity-form">
                <div class="main-form">
                    <div class="input-container">
                        <input type="text" v-model="name" placeholder="Name">
                    </div>
                    <div class="input-container">
                        <input type="text" v-model="reps" placeholder="Reps">
                    </div>
                    <div class="input-container">
                        <input type="text" v-model="sets" placeholder="Sets">
                    </div>
                </div>
                <div class="btn-container">
                    <button
                        @click="closeModal"
                    >CLOSE </button>
                    <button> SAVE </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import db from '@/components/firebaseInit.js'

export default {
    name: 'AddActivityModal',
    data () {
        return {
            name: null,
            reps: null,
            sets: null
        }
    },
    methods: {
        addActivity () {
            if (this.name && this.reps && this.sets) {
                db.collection('activities').add({
                    name: this.name,
                    reps: this.reps,
                    sets: this.sets
                })
                .then(docRef => {
                    document.querySelector('#activity-form').reset()
                    this.$emit('saveToActivities', {
                        id: docRef.id,
                        name: this.name,
                        reps: this.reps,
                        sets: this.sets
                    })
                    this.$emit('close')

                })
                .catch(err => console.error(err))
            } else {
                alert('All fields required')
            }
        },
        closeModal () {
            this.$emit('close')
        },
    }
}
</script>

<style scoped>
#activity-modal {
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

.form-container h2 {
    margin: 5px 10px 25px;
}

.form-container {
  border: solid 1px #ccc;
  border-radius: 5px;
  width: 300px;
  background: #fff;
  margin: auto;
  -webkit-box-shadow: 3px 3px 5px #ccc;
  -moz-box-shadow: 3px 3px 5px #ccc;
  box-shadow: 3px 3px 5px #ccc;
  padding: 10px;
}

.btn-container {
    display: flex;
	padding: 10px;
    overflow:auto;
    justify-content: flex-end;
}
</style>