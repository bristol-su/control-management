<template>
    <div>
        <span v-if="loading">Loading...</span>
        <span v-else-if="groupTagCategory"
              id="groupTagCategory-name"
              v-b-tooltip.hover
              :title="groupTagCategory.description">
            <router-link :to="{name: 'groupTagCategory', params: {groupTagCategoryId: groupTagCategory.id}}">
                {{groupTagCategory.name}}
            </router-link>
        </span>
        <span v-else>Error!</span>

    </div>
</template>

<script>
    export default {
        name: "GroupTagCategoryName",
        props: {
            groupTagCategoryId: {
                required: true,
                type: Number
            }
        },
        data() {
            return {
                groupTagCategory: null,
                loading: false
            }
        },
        mounted() {
            this.fetchGroupTagCategory();
        },
        watch: {
            groupTagCategoryId() {
                this.fetchGroupTagCategory();
            }
        },
        methods: {
            fetchGroupTagCategory() {
                this.loading = true;
                this.$store.dispatch('groupTagCategory/loadGroupTagCategory', this.groupTagCategoryId)
                    .then(groupTagCategory => this.groupTagCategory = groupTagCategory)
                    .then(() => this.loading = false);
            }
        }
    }
</script>

<style scoped>

</style>