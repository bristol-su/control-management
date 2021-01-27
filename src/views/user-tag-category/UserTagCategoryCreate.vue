<template>
    <div>
        <the-title title="Create a User Tag Category"></the-title>
        <b-form @submit.prevent="create">

            <b-form-group id="name-group" label="Tag Category Name:" label-for="name" description="A name for the tag category">
                <b-form-input
                        id="name"
                        v-model="form.name"
                        required
                        placeholder="Enter Tag Category Name"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="description-group" label="Tag Category Description:" label-for="description" description="A description for the tag category">
                <b-form-textarea
                        id="description"
                        v-model="form.description"
                        placeholder="Enter Tag Category Description"
                        required
                ></b-form-textarea>
            </b-form-group>

            <b-form-group id="reference-group" label="Tag Category Reference:" label-for="reference" description="A reference for the tag category">
                <b-input-group append=".tag_reference">
                    <b-form-input
                            id="reference"
                            v-model="form.reference"
                            required
                            placeholder="Enter Tag Category Reference"
                    ></b-form-input>
                </b-input-group>
            </b-form-group>

            <v-button-submit :loading="loading">Create</v-button-submit>
        </b-form>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VButtonSubmit from "../../components/common/VButtonSubmit";

    export default {
        name: "UserTagCreate",
        components: {VButtonSubmit, TheTitle},
        data() {
            return {
                form: {
                    name: null,
                    description: null,
                    reference: null,
                },
                loading: false,
            }
        },
        methods: {
            create() {
                this.loading = true;
                this.$control.userTagCategory().create(this.form)
                    .then(response => this.$router.push({name: 'userTagCategory', params: {'userTagCategoryId': response.data.id}}))
                    .catch(() => {})
                    .then(() => this.loading = false);
            },
        }
    }
</script>

<style scoped>

</style>