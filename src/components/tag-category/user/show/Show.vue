<template>
    <b-container>
        <b-card no-body v-if="hasCategory">
            <b-tabs pills card vertical>
                <b-tab title="Category Details" active>
                    <category-details :category="category"></category-details>
                </b-tab>
                <b-tab title="Tags"><tags :category="category"></tags></b-tab>
            </b-tabs>
        </b-card>
        <div v-else>
            Loading...
        </div>
    </b-container>
</template>

<script> 
    import CategoryDetails from './CategoryDetails';
    import Tags from './tag/Tags';

    export default {
        name: "Show",
        components: {CategoryDetails, Tags},
        mounted() {
            this.$control.userTagCategory().get(this.$route.params.userTagCategoryId)
                .then(response => this.category = response.data)
                .catch(error => this.$notify.alert('Could not load the user tag category: ' + error.message));
        },

        data() {
            return {
                category: null
            }
        },

        methods: {},

        computed: {
            hasCategory() {
                return this.category !== null;
            }
        }
    }
</script>

<style scoped>

</style>
