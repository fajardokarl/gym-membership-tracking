<template>
    <div id="programs" class="programm-wrapper">
        <ul
            @click="editProgram(program)"
        >
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
</template>

<script>
/* eslint-disable */
export default {
    name: "Programs",
    props: {
        program: Object
    },
    methods: {
        editProgram (program) {
            this.$emit('selectProgram', this.program)
        }
    }
}
</script>

<style>
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
        cursor: pointer;
        transition: transform .2s ease-in-out,
            box-shadow .2s ease-in-out;
    }
    .programm-wrapper > ul:hover {
        transform: translate3d(0, -8px, 50px);
        -webkit-box-shadow: 3px 5px 8px #ccc;
        -moz-box-shadow: 3px 5px 8px #ccc;
        box-shadow: 3px 5px 8px #ccc;
        background: rgba(206, 238, 247, 0.5);
    }

    .programm-wrapper ul li {
        align-items: flex-start;
        line-height: 1.4em;
    }
    .programm-wrapper ul li span{
        font-weight: 600;
    }
</style>