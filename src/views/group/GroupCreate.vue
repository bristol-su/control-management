<template>
    <div>
        <the-title title="Create a Group"></the-title>
        <b-form @submit="create">

            <b-form-group id="name-group" label="Group Name:" label-for="name" description="A name for the group">
                <b-form-input
                        id="name"
                        v-model="form.name"
                        required
                        placeholder="Enter Group Name"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="email-group" label="Group Email:" label-for="email" description="A generic email for the group">
                <b-form-input
                        id="email"
                        type="email"
                        v-model="form.email"
                        placeholder="Enter Group Email"
                ></b-form-input>
            </b-form-group>

            <v-button-submit :loading="loading">Create</v-button-submit>
        </b-form>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VButtonSubmit from "../../components/common/VButtonSubmit";
    export default {
        name: "GroupCreate",
        components: {VButtonSubmit, TheTitle},
        data() {
            return {
                form: {
                    name: null,
                    email: null
                },
                loading: false
            }
        },
        methods: {
            create() {
                this.loading = true;
                this.$control.group().create(this.form)
                    .then(response => this.$router.push({name: 'group', params: {'groupId': response.data.id}}))
                    .catch(() => {})
                    .then(() => this.loading = false);
            }
        }
    }
</script>

<style scoped>

</style>