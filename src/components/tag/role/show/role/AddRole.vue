<template>
    <div>
        <b-form @submit.prevent="addRole">

            <find-role @input="addRoleId($event)"></find-role>

            <b-button v-if="role!==null" type="submit" variant="primary">Submit</b-button>
        </b-form>
    </div>
</template>

<script>
    import FindRole from './FindRole';

    export default {
        name: "Edit",

        components: { FindRole },

        props: {
            roleId: {
                type: Number,
                required: false,
                default: 0
            },

            tag: {
                type: Object,
                required: false,
                default: null
            }
        },

        data() {
            return {
                role: null
            }
        },

        methods: {
            addRole() {
                this.$control.roleTag().tagRole(this.tag.id, this.role.id)
                    .then(() => this.$emit('input', this.role))
                    .catch(error => this.$notify.alert('Could not tag the role: ' + error.message));
            },

            addRoleId(event) {
                this.$control.role().get(event)
                    .then(response => this.role = response.data)
                    .catch(error => this.$notify.alert('Could not fetch the role: ' + error.message));
            }
        },

    }
</script>

<style scoped>

</style>
