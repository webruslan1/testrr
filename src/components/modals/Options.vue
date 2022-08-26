<template>
  <div class="modal-default" :class="{ 'none-modal': options === false }">
    <div
      class="modal-body"
      :class="{
        'visible-modal': options === true,
        'fade-modal': options === false,
      }"
    >
      <div class="modal-header">
        <div class="modal-header__title">{{ $t("content.setting.title") }}</div>
        <div
          class="modal-header__close btn-tr"
          @click="$emit('update:options', false)"
        >
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.2226 4.53021L15.2537 11.4998L22.2226 18.4691C23.2591 19.5061 23.2591 21.1859 22.2226 22.2229C21.7046 22.7408 21.0256 23 20.3469 23C19.6671 23 18.9879 22.7412 18.4704 22.2229L11.5 15.2528L4.53018 22.2228C4.01232 22.7408 3.33321 22.9999 2.65391 22.9999C1.9748 22.9999 1.29616 22.7412 0.777834 22.2228C-0.25875 21.1863 -0.25875 19.5065 0.777834 18.4691L7.7465 11.4998L0.777438 4.53021C-0.259146 3.49362 -0.259146 1.81344 0.777438 0.776849C1.81382 -0.25895 3.493 -0.25895 4.52978 0.776849L11.5 7.74648L18.4696 0.776849C19.5066 -0.25895 21.186 -0.25895 22.2222 0.776849C23.2591 1.81344 23.2591 3.49362 22.2226 4.53021Z"
              fill="#606060"
            />
          </svg>
        </div>
      </div>
      <div class="options-list">
        <div class="options-list__item">
          <div class="options-list__item-label">
            <span>{{ $t("content.setting.sound-title") }}</span>
            <span>{{ $t("content.setting.sound-mess") }}</span>
          </div>
          <div class="options-list__item-checkbox">
            <input
              type="checkbox"
              id="sounds"
              v-model="sound"
              class="options-list__item-checkbox-input checkbox-input"
            />
            <label
              for="sounds"
              class="options-list__item-checkbox-label checkbox-label"
            ></label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import $ from "jquery";
export default {
  props: ["options"],
  data() {
    return {
      sound: true,
    };
  },
  watch: {
    sound(val) {
      this.$cookie.set("sound", val ? "1" : "0");
    },
  },
  mounted() {
    if (this.$cookie.get("sound")) {
      if (this.$cookie.get("sound") === "1") {
        this.sound = true;
      } else {
        this.sound = false;
      }
    }
    const vm = this;
    $("body").click(function (event) {
      if ($(event.target).is(".modal-default")) {
        vm.$emit("update:options", false);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.modal {
  &-default {
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    overflow-y: auto;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-body {
    width: 400px;
    min-height: 300px;
    position: relative;
    height: auto;
    padding: 22px 27px 27px 34px;
    background: #2b2b2b;
    border: 1px solid #606060;
    box-sizing: border-box;
    border-radius: 15px;
  }
  &-header {
    display: flex;
    align-items: center;
    margin-bottom: 29px;
    &__title {
      font-weight: 600;
      font-size: 24px;
      line-height: 29px;
      color: #ffffff;
    }

    &__close {
      margin-left: auto;
    }
  }
}

.options-list {
  display: flex;
  flex-direction: column;
  row-gap: 14px;
  padding-left: 10px;
  padding-right: 31px;
  &__item {
    display: flex;
    align-items: center;
    &-label {
      display: flex;
      flex-direction: column;
      span {
        &:first-child {
          font-weight: 600;
          font-size: 14px;
          line-height: 17px;
          color: #ffffff;
          margin-bottom: 3px;
        }

        &:last-child {
          font-weight: normal;
          font-size: 10px;
          line-height: 12px;
          color: #7b7b7b;
        }
      }
    }
    &-checkbox {
      margin-left: auto;
    }
  }
}
</style>