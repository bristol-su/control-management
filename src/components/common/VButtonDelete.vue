<template>
    <b-button variant="outline-danger" size="sm" @click="clickedDelete">
        <i class="fa fa-trash-alt"></i>
    </b-button>
</template>

<script>
    export default {
        name: "VButtonDelete",
        props: {
            deleteText: {
                required: false,
                type: String,
                default: null
            }
        },
        methods: {
            clickedDelete() {
                this.$bvModal.msgBoxConfirm(this.deleteMessage, {
                    title: 'Are you sure?',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'YES',
                    cancelTitle: 'NO',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                })
                    .then(value => {
                        if(value === true) {
                            this.$emit('delete');
                        }
                    })
                    .catch(() => {})
            }
        },
        computed: {
            deleteMessage() {
                if(this.deleteText) {
                    return this.deleteText;
                }
                return 'Are you sure you want to delete this?'
            }
        }
    }
</script>

<style scoped>

</style>