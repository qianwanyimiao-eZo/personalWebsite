<template>
  <div class="bottom-container">
    <footer class="footer">
      备案号： <img src="../assets/ga.png" alt="ga-icon" class="ga-icon"/> <div @click="gotoGA" class="ga-link">粤公网安备44011402001135号</div> <div @click="gotoICP" class="ga-link">粤ICP备2025484374号-1</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
function gotoGA() {
  console.log('gotoGA');
  window.open('http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44011402001135', '_blank');
};

function gotoICP() {
  console.log('gotoICP');
  window.open('https://beian.miit.gov.cn/#/Integrated/index', '_blank');
};
</script>

<style scoped>
.footer {
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
}

.ga-icon {
  width: 20px;
  height: 20px;
}

.ga-link {
  margin-left: 8px;
  margin-right: 8px;
  cursor: pointer;
  color: #ffffff;
}
</style>
