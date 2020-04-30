<template>
    <div>
        <b-form @submit="create" v-if="role === null">

            <b-form-group id="role-name-group" label="Role Name:" label-for="role-name" description="A custom name for the role">
                <b-form-input
                        id="role-name"
                        v-model="form.role_name"
                        required
                        placeholder="Enter Role Name"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="email-group" label="Role Name:" label-for="email" description="A generic email for the role">
                <b-form-input
                        type="email"
                        id="email"
                        v-model="form.email"
                        placeholder="president@society.com"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="position-group" label="Position:" label-for="position" description="The position the role is in">
                <v-position-dropdown v-model="form.position_id"></v-position-dropdown>
            </b-form-group>

            <b-form-group id="group-group" label="Group:" label-for="group" description="The group the role is in">
                <v-group-dropdown v-model="form.group_id"></v-group-dropdown>
            </b-form-group>

            <v-button-submit :loading="loading" :disabled="!completedForm">
                Create Role
            </v-button-submit>

        </b-form>
        <div v-else>
            Role <em>{{role.data.role_name}}</em> created.

            <b-button variant="outline-primary" @click="clear">Start Again</b-button>
        </div>
    </div>
</template>

<script>
    import VPositionDropdown from "../common/VPositionDropdown";
    import VGroupDropdown from "../common/VGroupDropdown";
    import VButtonSubmit from "../common/VButtonSubmit";
    export default {
        name: "VCreateRole",
        components: {VButtonSubmit, VGroupDropdown, VPositionDropdown},
        props: {
            initialGroupId: {
                required: false,
                type: Number,
                default: null
            }
        },
        mounted() {
            if(this.initialGroupId) {
                this.form.group_id = this.initialGroupId;
            }
        },
        data() {
            return {
                form: {
                    role_name: null,
                    email: null,
                    position_id: null,
                    group_id: null
                },
                loading: false,
                role: null
            }
        },
        methods: {
            clear() {
                this.role = null;
                this.$emit('input', null);
            },
            create() {
                this.loading = true;
                this.$control.role().create(this.form)
                    .then(response => {
                        this.role = response.data;
                        this.$emit('input', response.data.id);
                    })
                    .catch(() => {})
                    .then(() => this.loading = false);
            }
        },
        computed: {
            completedForm() {
                return this.form.role_name !== null && this.form.position_id !== null &&this.form.group_id !== null;
            }
        }
    }
</script>

<style scoped>

</style>