<template>
    <div id="programs">
        <div class="programm-wrapper">
            <ul v-for="program in programs" :key="program.id">
                <li>
                    <span>
                        CODE:
                    </span>
                     {{ program.code }}
                </li>
                <li>
                    <span> NAME: </span> {{ program.name }}
                </li>
                <li>
                   <span> DESCRIPTION: </span> {{ program.description }}
                </li>
                <li>
                   <span> ACTIVITIES: </span>
                    <ul>
                        <li v-for="act in program.activities" :key="act.id">
                            {{ act.sets }} Sets of {{ act.name }} - {{ act.reps }} reps
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
/* eslint-disable */
export default {
    name: "Programs",
    data () {
        return {
            programs: []
        }
    },
    mounted () {
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
            console.log(this.programs)
        })
        .catch (err => {
            console.error(err)
        })
    }
}
</script>

<style>
    .programm-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    .programm-wrapper > ul {
        list-style-type: none;
        list-style: none;
        background: #fff;
        padding: 1.2em;
        margin: 1em;
        border-radius: 8px;
        -webkit-box-shadow: 3px 3px 5px #ccc;
       -moz-box-shadow: 3px 3px 5px #ccc;
        box-shadow: 3px 3px 5px #ccc;
        border: 1px solid #ccc;
    }

    .programm-wrapper ul li {
        align-items: flex-start;
        line-height: 1.4em;
    }
    .programm-wrapper ul li span{
        font-weight: 600;
    }
</style>