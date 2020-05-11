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
                    >
                    <label :for="activity.id"> {{ activity.name }} </label>
                </span>
            </div>
            <div class="btn-container">
          <button
            class="closeActivityModal"
            @click="closeModal">
              CLOSE
            </button>
            <button type="reset" class="reset">Reset</button>
            <button type="submit" class="submit">Submit</button>

        </div>
        </form>
      </div>
  </div>
</template>

<script scoped>
/* eslint-disable */

export default {
    name: 'AddProgramModal',
    props: {
      activities: Array
    },
    data () {
      return {
        selectedActivities: [],
        name: null,
        reps: null,
        sets: null,
        description: null,
        program_code: null
      }
    },
    methods: {
      closeModal () {
        this.$emit('close')
      },
      addProgram () {
          if ( this.program_code && this.name && this.description && this.activities.length) {
            db.collection('programs').add({
                program_code: this.program_code,
                name: this.name,
                description: this.description,
                activities: this.selectedActivities
            })
            .then(docRef => {
              document.querySelector('#form-container').reset()
              this.closeModal()
            })
            .catch(error => console.error(error))
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

            console.log(this.selectedActivities)

        }
    },
    mounted() {
      console.log('opened')
    }
}
</script>

<style>
#modal-add {
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10000;
  display: flex;
  align-items: center;
}
.container {
  width: 85%;
  background: #fff;
  margin: auto;
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
    border-radius: 3px;
    -webkit-box-shadow: 3px 3px 5px #ccc;
    -moz-box-shadow: 3px 3px 5px #ccc;
    box-shadow: 3px 3px 5px #ccc;
}

.main-form {
  position: relative;
  padding: 10px;
}

.input-container {
  position: relative;
  margin: 10px;
}

.main-form input {
    background: #fff;
    border-radius: 3px;
    border: solid 1px #aaaaaa;
    width: calc(100% - 16px);
    height: 2em;
    padding: 0 8px;
    margin: 0;
}

.main-form h3 {
    grid-column: 1/4;
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
    background: #fff;
    border-radius: 3px;
    border: solid 1px #1aee00;
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
    background: #7dee7f;
    border: solid 2px #11a536;
    color: #fff;
}

.btn-container {
  grid-column: 2/3;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 15px;
}

.btn-container button {
  padding: 10px 10px;
  background: #fff;
  margin: 5px;
  border: solid 1px #ccc;
  border-radius: 5px;
  text-transform: uppercase;
  cursor: pointer;
}
.btn-container button:active, .btn-container button:focus {
  outline: none;
  border: solid 1px #1aee00;
  transition: border ease-out .2s;
}
</style>