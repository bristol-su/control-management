<template>
    <div>
        <the-title title="Create a User"></the-title>
        <b-form @submit="create">

            <b-form-group id="first-name-group" label="User First Name:" label-for="first-name" description="The first name of the user">
                <b-form-input
                        id="first-name"
                        v-model="form.first_name"
                        required
                        placeholder="Enter First Name"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="last-name-group" label="User Last Name:" label-for="last-name" description="The last name of the user">
                <b-form-input
                        id="last-name"
                        v-model="form.last_name"
                        placeholder="Enter Last Name"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="email-group" label="User Email:" label-for="email" description="A generic email for the user">
                <b-form-input
                        id="email"
                        type="email"
                        v-model="form.email"
                        placeholder="Enter User Email"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="dob-group" label="User Date of Birth:" label-for="dob" description="A generic email for the user">
                <b-form-datepicker
                        id="dob"
                        v-model="dateOfBirth">

                </b-form-datepicker>
            </b-form-group>

            <b-form-group id="preferred-name-group" label="User Preferred Name:" label-for="preferred-name" description="The preferred name of the user">
                <b-form-input
                        @focus="shouldPrefillName=false"
                        id="preferred-name"
                        v-model="form.preferred_name"
                        required
                        placeholder="Enter Preferred Name"
                ></b-form-input>
            </b-form-group>

            <v-button-submit :loading="loading">Create</v-button-submit>
        </b-form>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import moment from "moment";
    import VButtonSubmit from "../../components/common/VButtonSubmit";
    export default {
        name: "UserCreate",
        components: {VButtonSubmit, TheTitle},
        data() {
            return {
                form: {
                    first_name: null,
                    last_name: null,
                    email: null,
                    preferred_name: null,
                    dob: null
                },
                loading: false,
                shouldPrefillName: true
            }
        },
        methods: {
            create() {
                this.loading = true;
                this.$control.user().create(this.form)
                    .then(response => this.$router.push({name: 'user', params: {'userId': response.data.id}}))
                    .catch(() => {})
                    .then(() => this.loading = false);
            }
        },
        watch: {
            computedPreferredName(preferred_name) {
                if(this.shouldPrefillName) {
                    this.form.preferred_name = preferred_name
                }
            }
        },
        computed: {
            dateOfBirth: {
                get: function() {
                    if(this.form.dob) {
                        return moment(this.form.dob, 'DD-MM-YYYY').format('YYYY-MM-DD');
                    }
                    return null;
                },
                set: function(val) {
                    this.form.dob = moment(val, 'YYYY-MM-DD').format('DD-MM-YYYY');
                }
            },
            computedPreferredName() {
                let preferred_name = '';
                if(this.form.first_name) {
                    preferred_name += this.form.first_name;
                }
                if(this.form.last_name) {
                    preferred_name += ' ' + this.form.last_name;
                }
                if(preferred_name !== '') {
                    return preferred_name;
                }
                return null;
            }
        }
    }
</script>

<style scoped>

</style>