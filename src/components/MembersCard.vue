<template>
    <div id="add-member">
        <div class="profile-container">
            <!-- <div class="image-container">
                <img src="#" alt="Profile">
            </div> -->
            <div class="detials-container">
                <h2>{{member.fullname}}</h2>
                <!-- TODO: Replace all dummy data with actual data -->
                <span class="single-data-container">
                    <p>Height</p>
                    <h3>{{ latestBmi.height }} cm</h3>
                </span>
                <span class="single-data-container">
                    <p>Weight</p>
                    <h3>{{ latestBmi.weight }} kg</h3>
                </span>
                <span class="single-data-container">
                    <p>Waistline</p>
                    <h3>{{ latestBmi.waistline }} in</h3>
                </span>
                <span class="single-data-container">
                    <p>Body Fat</p>
                    <h3>{{ latestBmi.bodyfat }} %</h3>
                </span>
            </div>
        </div>
        <div class="active-program-container">
            <p>Active Program:</p>
            <!-- TODO: Make data dynamic, use v-for -->
            <div>
                <span
                    v-for="activeProgram in activePrograms"
                    :key="activeProgram.id"
                >
                    <p>Until {{ activeProgram.date_end }}</p>
                    <h4>{{ activeProgram.program_name }}</h4>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import moment from 'moment'

export default {
    name: 'Members',
    props: {
        member: Object
    },
    computed: {
        latestBmi () {
            const bmi = this.member.bmi[this.member.bmi.length - 1]
            return bmi
        },
        activePrograms () {
            // return Array for active date base of current date with modified date_end
            const activePrograms = this.member.programsTaken.filter(v => {
                const d = moment(v.date_end.toDate())
                v.date_end = d.format('YYYY-MM-DD')
                return moment().isBefore(v.date_end)
            })
            return activePrograms
        }
    }
}
</script>

<style>
#add-member {
    list-style-type: none;
    list-style: none;
    background: #fff;
    padding: 1.2em;
    position: relative;
    border-radius: 8px;
    -webkit-box-shadow: 3px 3px 5px #ccc;
    -moz-box-shadow: 3px 3px 5px #ccc;
    box-shadow: 3px 3px 5px #ccc;
    border: 1px solid #ccc;
    cursor: pointer;
    height: 230px;
}

.profile-container {
    display: flex;
    margin-bottom: 15px;
}

.profile-container .image-container {
    flex: 1;
    margin-right: 10px;
    background: #ccc;
    border: solid 1px #555;
}

.detials-container {
    flex: 4;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}

.detials-container h2 {
    grid-column: 1/5;
    font-size: 30px;
    color: #292929;
    margin: 5px 0;
}

.single-data-container {
    text-align: center;
}

.single-data-container p {
    margin: 5px 0;
    font-size: 10px;
    color: #757575
}

.single-data-container h3 {
    margin: 5px 0;
    font-size: 1.5em;
    color: #292929;
    font-weight: 400;
    letter-spacing: -2px;
}

.active-program-container > p {
    color: #757575;
    font-size: 12px;
    margin: 5px 0;
}
.active-program-container div {
    display: flex;
}

.active-program-container div span {
    background: #7BD674;
    color: #fff;
    text-align: center;
    padding: 3px 15px;
    border-radius: 8px;
    margin: 5px;
}

.active-program-container div p {
    font-size: 10px;
    margin: 5px 0;
}

.active-program-container div h4 {
    font-weight: 700;
    margin: 5px 0;
}
</style>