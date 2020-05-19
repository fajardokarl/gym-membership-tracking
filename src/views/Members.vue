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
            :programs="programs"
            v-if="isMemberModalOpen"
            @close="closeMemberModal"
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
            programs: [],
            isMemberModalOpen: false
        }
    },
    methods: {
        openMemberModal () {
            this.isMemberModalOpen = true
        },
        closeMemberModal () {
            this.isMemberModalOpen = false
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

<style>
.members-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    margin: 15px;
}
</style>