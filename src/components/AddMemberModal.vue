<template>
    <div id="add-member-modal">
        <div class="member-form-container">
            <form @submit.prevent="addMember" id="member-form">
                <h1>
                    Add Member
                </h1>
                {{ memberId }}
                <div class="main-form">
                    <div class="left-info">
                        <div class="input-text">
                            <label for="fullname">Fullname</label>
                            <input type="text" id="fullname" name="fullname" v-model="fullname">
                        </div>
                        <div class="input-text">
                            <label for="birthdate">Birthdate</label>
                            <input type="date" id="birthdate" name="birthdate" v-model="birthdate">
                        </div>
                        <div class="input-text">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" v-model="email">
                        </div>
                        <div class="input-text">
                            <label for="contact_number">Contact Number</label>
                            <input type="text" id="contact_number" name="contact_number" v-model="contact_number">
                        </div>
                        <div class="input-text">
                            <label for="address">Address</label>
                                <textarea id="w3mission" rows="4" v-model="address"></textarea>
                        </div>
                    </div>
                    <div class="right-info">
                        <div class="right-bmi">
                            <div class="bmi-left">
                                <div class="input-text">
                                    <label for="address">Height (cm)</label>
                                    <input type="number" id="address" name="address" v-model="height">
                                </div>
                                <div class="input-text">
                                    <label for="address">Weight (kg)</label>
                                    <input type="number" id="address" name="address" v-model="weight">
                                </div>
                            </div>
                            <div class="bmi-right">
                                <div class="bmi-left">
                                    <div class="input-text">
                                        <label for="address">Waistline (in)</label>
                                        <input type="number" id="address" name="address" v-model="waistline">
                                    </div>
                                    <div class="input-text">
                                        <label for="address">Bodyfat (%)</label>
                                        <input type="number" id="address" name="address" v-model="bodyfat">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="right-programs">
                            <h3>Programs</h3>
                            <div class="pill-container">
                                <span
                                    v-for="program in programs"
                                    :key="program.id"
                                >
                                    <input type="checkbox"
                                        class="program-pill"
                                        :value="program.id"
                                        :id="program.id"
                                        @change="selectProgram"
                                    >
                                    <label :for="program.id"> {{ program.name }} </label>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn-container">
                    <div class="btn-left">
                        <button
                            class="close"
                            type="button"
                            @click="closeMemberModal"
                        >
                            Cancel
                        </button>
                    </div>
                    <div class="btn-right">
                        <button
                            type="submit"
                            @click="saveMemberAndClose"
                        >
                            Save and Close
                        </button>
                        <button
                            type="submit"
                            @click="saveMember"
                        >
                            Save Only
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import db from '@/components/firebaseInit.js'
import moment from 'moment'


export default {
    name: 'AddMemberModal',
    props: {
        programs: Array,
        selectedMember: Object
    },
    data () {
        return {
            fullname: null,
            address: null,
            birthdate: null,
            email: null,
            contact_number: null,
            programs_taken: null,
            // bmi: {
                
            // },
            date: null,
            bodyfat: null,
            height: null,
            waistline: null, 
            weight: null,
            selectedProgram: [],
            memberId: '',
            isSaveAndClose: false
        }
    },
    methods: {
        addMember () {
            const dNow = new Date()
            this.date = dNow

            if (this.fullname && this.address && this.birthdate && this.email && this.contact_number) {
                const memberRef = db.collection('Members').doc(this.memberId)
                const data = {
                    name: this.fullname,
                    address: this.address,
                    birthdate: new Date(this.birthdate),
                    email: this.email,
                    contact_number: this.contact_number,
                    programs_taken: this.selectedProgram,
                }
                if (this.memberId) {
                    data.bmi = [{
                        date: this.date,
                        bodyfat: this.bodyfat,
                        height: this.height,
                        waistline: this.waistline,
                        weight: this.weight,
                    }]
                }

                memberRef.set(data)
                .then(docRef => {
                    this.resetFields()
                    document.querySelector('#member-form').reset()

                    if (this.isSaveAndClose) {
                        this.closeMemberModal()
                    }
                })
                .catch(err => console.error(err))
            }
            else {
                alert('All fields required!')
            }
        },
        saveMemberAndClose () {
            this.isSaveAndClose = true
        },
        saveMember () {
            this.isSaveAndClose = false

        },
        closeMemberModal () {
            this.$emit('close')
                // document.querySelector('#member-form').reset()
            this.resetFields ()
        },
        resetFields () {
            this.fullname = null
            this.address = null
            this.birthdate = null
            this.email = null
            this.contact_number = null
            this.programs_taken = null
            this.date = null
            this.bodyfat = null
            this.height = null
            this.waistline = null
            this.weight = null
            this.selectedProgram = []
            
        },
        selectProgram (evt) {
            const { value } = evt.target
            
            const index = this.selectedProgram.findIndex(c => c.id === value)
            if (index !== -1) {
                this.selectedProgram = [
                    ...this.selectedProgram.slice(0, index),
                    ...this.selectedProgram.slice(index + 1),
                ]
            } else {
                const program_data = this.programs.find(a => a.id === value)
                const now = moment()
                this.selectedProgram = [
                    ...this.selectedProgram,
                    {
                        id: program_data.id,
                        program_name: program_data.name,
                        date_start: now.toDate(),
                        date_end: moment().add(1, 'months').toDate()
                    }
                ]
            }
        }
    },
    mounted () {
        if (this.selectedMember) {
            const bmi = this.selectedMember.bmi.slice(-1)[0]
            this.date = bmi.date,
            this.bodyfat = bmi.bodyfat,
            this.height = bmi.height,
            this.waistline = bmi.waistline, 
            this.weight = bmi.weight 

            this.fullname = this.selectedMember.fullname
            this.address = this.selectedMember.address
            this.birthdate = moment(this.selectedMember.birthdate).format('YYYY-MM-DD')
            this.email = this.selectedMember.email
            this.contact_number = this.selectedMember.contact_number
            
            this.memberId = this.selectedMember.id
        }
    }
}
</script>

<style scoped>
#add-member-modal {
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

h1 {
    margin: 20px 16px 0;
}

.main-form {
    display: flex;
}

.input-text {
    padding: 5px 0px;
}

.input-text textarea {
    width: 100%;
    border-radius: 3px;
}

.input-text label {
    line-height: 1.5;
}

.left-info, .right-info > div {
    list-style-type: none;
    list-style: none;
    background: #fff;
    padding: 1.2em;
    margin: 15px;
    border-radius: 5px;
    -webkit-box-shadow: 3px 3px 5px #ccc;
    -moz-box-shadow: 3px 3px 5px #ccc;
    box-shadow: 3px 3px 5px #ccc;
    border: 1px solid #ccc;
}

.left-info {
    flex: 1
}

.right-info {
    flex: 2;
}

.right-bmi {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.right-bmi > div {
    margin: 10px;
}

.member-form-container {
    border: solid 1px #ccc;
    border-radius: 5px;
    width: 85%;
    background: #fff;
    margin: auto;
    box-shadow: 3px 3px 5px #ccc;
    -webkit-box-shadow: 3px 3px 5px #ccc;
    -moz-box-shadow: 3px 3px 5px #ccc;
}

.btn-container {
    display: flex;
    justify-content: space-between;
    padding: 15px;
}

.pill-container {
    display: block;
    line-height: 2.5;
}

.pill-container span {
    white-space: pre;
}
.program-pill {
    display: none;
}

.pill-container label {
    padding: 5px 10px;
    margin: 5px;
    background: #fff;
    border-radius: 15px;
    border: solid 2px #aaaaaa;
    cursor: pointer;
}

.program-pill:checked ~ label {
    background: #11a536;
    border: solid 2px #11a536;
    color: #fff;
}

</style>