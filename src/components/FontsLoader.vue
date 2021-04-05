<script>
export default {
  mounted() {
    const css = document.getElementsByTagName("item-showcase")[0].shadowRoot
      .childNodes[1];
    document.getElementsByTagName("head")[0].appendChild(css);
  },
};
</script>
<style lang="scss">
@font-face {
  font-family: "Fontin-SmallCaps";
  src: local("Fontin-SmallCaps"),
    url(../assets/Fontin-SmallCaps.ttf) format("truetype");
}
</style>
