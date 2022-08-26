<template>
  <div
    class="modal-default"
    :class="{
      'none-modal': $root.rulesModal === false,
    }"
  >
    <div class="modal-body"  :class="{
      'visible-modal': $root.rulesModal === true,
      'fade-modal': $root.rulesModal === false,
    }">
      <div class="modal-close" @click="$root.rulesModal = false">
        <div class="close">
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="rules">
        <div class="rules-title">{{$t('content.chat.reg')}}</div>
        <div class="rules-text">
          <li>{{$t('content.chat.reglist.1')}}</li>
          <li>{{$t('content.chat.reglist.2')}}</li>
          <li>{{$t('content.chat.reglist.3')}}</li>
          <li>{{$t('content.chat.reglist.4')}}</li>
          <li>{{$t('content.chat.reglist.5')}}</li>
          <li>{{$t('content.chat.reglist.6')}}</li>
          <li>{{$t('content.chat.reglist.7')}}</li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      promocode: "",
    };
  },
  mounted() {
    const vm = this;
    $("body").click(function (event) {
      if ($(event.target).is(".modal-default")) {
        vm.$root.rulesModal = false;
      }
    });
  },
};
</script>


<style lang="scss" scoped>
.modal {
  &-default {
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2px);
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-body {
    width: 400px;
    position: relative;
    padding: 20px 25px;
    background: #232323;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
  }

  &-close {
    position: absolute;
    top: 20px;
    right: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    background: #232323;
    border-radius: 5px;
    transition: all 300ms;
    &:hover {
      opacity: 0.8;
    }
  }
}

.rules {
  &-title {
    font-size: 28px;
    line-height: 32px;
    font-weight: 500;
    margin-bottom: 30px;
  }

  &-text {
    li {
      font-size: 14px;
      line-height: 18px;
      font-weight: 400;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
}
</style>