<script setup lang="ts">
import NavSearch from './NavSearch.vue'

const style = computed(() => {
  return isMobile.value
    ? {
        '--side-padding': '16px',
        'grid-template-columns': 'auto 1fr auto',
      }
    : {
        '--side-padding': '32px',
        'grid-template-columns': 'calc(272px - var(--side-padding)) 1fr auto',
      }
})

function handleLogoClick() {
  // TODO: handleLogoClick
}
</script>

<template>
  <NLayoutHeader bordered class="nav" :style="style">
    <NText tag="div" class="ui-logo" :depth="1" @click="handleLogoClick">
      <!-- <img src="./assets/images/naivelogo.svg" /> -->
      <span v-if="!isMobile">mu</span>
    </NText>
    <NavSearch></NavSearch>
    <!-- 文档搜索功能 -->
    <!-- <NPopover
      v-if="isMobile || isTablet"
      ref="mobilePopoverRef"
      style=" width: 288px;padding: 0;"
      placement="bottom-end"
      display-directive="show"
      trigger="click"
    >
      <template #trigger>
        <NIcon size="20" style="margin-left: 12px;">
          <MenuOutline></MenuOutline>
        </NIcon>
      </template>
      <div style=" max-height: 79vh;overflow: auto;">
        <NMenu
          :value="mobileMenuValue"
          :options="mobileMenuOptions"
          :indent="18"
          :render-label="renderMenuLabel"
          @update:value="handleUpdateMobileMenu"
        ></NMenu>
      </div>
    </NPopover>
    <div v-else class="nav-end">
      <NButton size="small" quaternary class="nav-picker" @click="handleThemeUpdate">
        {{ themeLabelMap[theme] }}
      </NButton>
      <NButton size="small" tag="a" quaternary class="nav-picker" :href="repoUrl" target="_blank">
        GitHub
      </NButton>
    </div> -->
  </NLayoutHeader>
</template>

<style scoped>
.nav {
  display: grid;
  grid-template-rows: calc(var(--header-height) - 1px);
  align-items: center;
  padding: 0 var(--side-padding);
}

.ui-logo {
  display: flex;
  align-items: center;
  font-size: 18px;
  cursor: pointer;

  & > img {
    width: 32px;
    height: 32px;
    margin-right: 12px;
  }
}

.nav-menu {
  flex-grow: 0;
  flex-shrink: 1;
  padding-left: 36px;
  overflow: hidden;
}

.nav-picker {
  margin-right: 4px;

  &.padded {
    padding: 0 10px;
  }

  &:last-child {
    margin-right: 0;
  }
}

.nav-end {
  display: flex;
  align-items: center;
}
</style>

<style>
.nav-menu .n-menu-item,
.nav-menu .n-submenu,
.nav-menu .n-menu-item-content {
  height: calc(var(--header-height) - 1px) !important;
}
</style>
