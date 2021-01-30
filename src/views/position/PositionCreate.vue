<template>
    <div>
        <the-title title="Create a Position"></the-title>
        <b-form @submit.prevent="create">

            <b-form-group id="name-position" label="Position Name:" label-for="name" description="A name for the position">
                <b-form-input
                        id="name"
                        v-model="form.name"
                        required
                        placeholder="Enter Position Name"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="description-position" label="Position Description:" label-for="description" description="A description for the position">
                <b-form-textarea
                        id="description"
                        v-model="form.description"
                        placeholder="Enter Position Description"
                        required
                ></b-form-textarea>
            </b-form-group>

            <v-button-submit :loading="loading">Create</v-button-submit>
        </b-form>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VButtonSubmit from "../../components/common/VButtonSubmit";
    export default {
        name: "PositionCreate",
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
                this.$control.position().create(this.form)
                    .then(response => this.$router.push({name: 'position', params: {'positionId': response.data.id}}))
                    .catch(() => {})
                    .then(() => this.loading = false);
            }
        }
    }
</script>

<style scoped>

</style>