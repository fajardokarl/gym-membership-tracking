<template>
    <div id="all-members">
        <div class="modal-btn-container">
            <button @click="openMemberModal"> ADD MEMBER </button>
        </div>
        <div class="members-container">
            <MembersCard
                v-for="member in members"
                :key="member.id"
                :member="member"
            />
        </div>
        <AddMemberModal
            v-if="isMemberModalOpen"
        />
    </div>
</template>

<script>
/* eslint-disable */

import db from '@/components/firebaseInit.js'
import MembersCard from '@/components/MembersCard'
import AddMemberModal from '@/components/AddMemberModal'

export default {
    name: 'Members',
    components: {
        MembersCard,
        AddMemberModal
    },
    data () {
        return {
            members: [],
            isMemberModalOpen: false
        }
    },
    methods: {
        openMemberModal () {
            this.isMemberModalOpen = true
        }
    },
    mounted () {
        db.collection('Members').get()
        .then (querySnapshot => {
            querySnapshot.forEach(doc => {
                const data = {
                    'id': doc.id,
                    'fullname': doc.data().name,
                    'address': doc.data().address,
                    'contact_number': doc.data().contact_number,
                    'email': doc.data().email,
                    'bmi': doc.data().bmi,
                    'programsTaken': doc.data().programs_taken
                }

                this.members = [
                    ...this.members,
                    data
                ]
                console.log(this.members)
                
            })
        })
        .catch (err => {
            console.error(err)
        })    }
}
</script>

<style>
.members-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 15px;
    margin: 15px;
}
</style>