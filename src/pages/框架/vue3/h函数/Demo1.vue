<script lang="ts">
export default {
  setup() {
    const divRef = ref<
      | (HTMLDivElement & {
          name: string
        })
      | null
    >(null)
    return () =>
      h('div', { '.name': 'some-name', '^width': '100', ref: divRef }, divRef.value?.name)
  },
}
</script>
