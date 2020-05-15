<template>
    <div id="all-members">
        <MembersCard
            v-for="member in members"
            :key="member.id"
            :member="member"
        />
    </div>
</template>

<script>
/* eslint-disable */

import db from '@/components/firebaseInit.js'
import MembersCard from '@/components/MembersCard'

export default {
    name: 'Members',
    components: {
        MembersCard
    },
    data () {
        return {
            members: []
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
#all-members {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 15px;
    margin: 15px;
}
</style>