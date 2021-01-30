<template>
    <div>
        <the-title title="Create a Role Tag"></the-title>
        <b-form @submit.prevent="create">

            <b-form-group id="name-group" label="Tag Name:" label-for="name" description="A name for the tag">
                <b-form-input
                        id="name"
                        v-model="form.name"
                        required
                        placeholder="Enter Tag Name"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="description-group" label="Tag Description:" label-for="description" description="A description for the tag">
                <b-form-textarea
                        id="description"
                        v-model="form.description"
                        placeholder="Enter Tag Description"
                        required
                ></b-form-textarea>
            </b-form-group>

            <b-form-group id="category-group" label="Tag Category:" label-for="category" category="A category for the tag">
                <v-role-tag-category-dropdown
                    id="category"
                    :value="form.tag_category_id"
                    @input="setTagCategoryId"
                ></v-role-tag-category-dropdown>
            </b-form-group>

            <b-form-group id="reference-group" label="Tag Reference:" label-for="reference" description="A reference for the tag">
                <b-input-group :prepend="categoryReference + '.'">
                    <b-form-input
                            id="reference"
                            v-model="form.reference"
                            required
                            placeholder="Enter Tag Reference"
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
    import VRoleTagCategoryDropdown from "../../components/common/VRoleTagCategoryDropdown";
    import {mapActions} from "vuex";

    export default {
        name: "RoleTagCreate",
        components: {VRoleTagCategoryDropdown, VButtonSubmit, TheTitle},
        data() {
            return {
                form: {
                    name: null,
                    description: null,
                    reference: null,
                    tag_category_id: null
                },
                tag_category_reference: null,
                loadingTagCategory: false,
                loading: false,
            }
        },
        methods: {
            create() {
                this.loading = true;
                this.$control.roleTag().create(this.form)
                    .then(response => this.$router.push({name: 'roleTag', params: {'roleTagId': response.data.id}}))
                    .catch(() => {})
                    .then(() => this.loading = false);
            },
            setTagCategoryId(id) {
                this.form.tag_category_id = id;
                this.loadingTagCategory = true;
                this.loadRoleTagCategory(id)
                    .then(category => this.tag_category_reference = category.reference)
                    .catch((error) => {console.log(error)})
                    .then(() => this.loadingTagCategory = false);
            },
            ...mapActions('roleTagCategory', ['loadRoleTagCategory'])
        },
        computed: {
            categoryReference() {
                if(this.loadingTagCategory) {
                    return 'Loading...';
                }
                if(this.tag_category_reference) {
                    return this.tag_category_reference;
                }
                return 'category_reference';
            },


        }
    }
</script>

<style scoped>

</style>