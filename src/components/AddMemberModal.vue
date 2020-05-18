<template>
    <div id="add-member-modal">
        <div class="member-form-container">
            <form @submit.prevent="addMember">
                <h1>
                    Add Member
                </h1>
                <div class="main-form">
                    <div class="left-info">
                        <div class="input-text">
                            <label for="fullname">Fullname</label>
                            <input type="text" id="fullname" name="fullname" v-model="fullname">
                        </div>
                        <div class="input-text">
                            <label for="birthdate">birthdate</label>
                            <input type="text" id="birthdate" name="birthdate" v-model="birthdate">
                        </div>
                        <div class="input-text">
                            <label for="email">Email</label>
                            <input type="text" id="email" name="email" v-model="email">
                        </div>
                        <div class="input-text">
                            <label for="contact_number">Contact Number</label>
                            <input type="text" id="contact_number" name="contact_number" v-model="contact_number">
                        </div>
                        <div class="input-text">
                            <label for="address">Address</label>
                                <textarea id="w3mission" rows="4"></textarea>
                        </div>
                    </div>
                    <div class="right-info">
                        <div class="right-bmi">
                            <div class="bmi-left">
                                <div class="input-text">
                                    <label for="address">Height (cm)</label>
                                    <input type="text" id="address" name="address" v-model="address">
                                </div>
                                <div class="input-text">
                                    <label for="address">Weight (kg)</label>
                                    <input type="text" id="address" name="address" v-model="address">
                                </div>
                            </div>
                            <div class="bmi-right">
                                <div class="bmi-left">
                                    <div class="input-text">
                                        <label for="address">Waistline (in)</label>
                                        <input type="text" id="address" name="address" v-model="address">
                                    </div>
                                    <div class="input-text">
                                        <label for="address">Bodyfat (%)</label>
                                        <input type="text" id="address" name="address" v-model="address">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="right-programs">
                            <span>
                                Strength Training
                            </span>
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
                            Save
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

export default {
    name: 'AddMemberModal',
    data () {
        return {
            fullname: null,
            address: null,
            birthdate: null,
            email: null,
            contact_number: null,
            programs_taken: null,
            bmi: {
                date: null,
                bodyfat: null,
                height: null,
                waistline: null, 
                weight: null 
            },
            selectedProgram: null
        }
    },
    methods: {
        closeMemberModal () {

        },
        saveMemberAndClose () {

        },
        saveMember () {

        },
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
</style>