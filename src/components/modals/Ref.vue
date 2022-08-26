<template>
  <div
    class="modal-default"
    :class="{
      'none-modal': $root.refModal === false,
    }"
  >
    <div
      class="modal-body"
      :class="{
        'visible-modal': $root.refModal === true,
        'fade-modal': $root.refModal === false,
      }"
    >
      <div class="modal-close" @click="closeItem">
        <div class="close">
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="rules">
        <div class="rules-title">{{ $t("content.ref.confRefcode") }}</div>
        <div class="rules-subtitle">{{ $t("content.ref.list-title") }}</div>
        <div class="rules-list">
          <div class="rules-list__item">
            <span
              >{{ $t("content.ref.list.1") }}{{
                $root.settings.bonus.referral.restrictions.gameHourSteam
              }}</span
            >
          </div>
          <div class="rules-list__item">
            <span
              >{{ $t("content.ref.list.2") }}
              {{ $root.settings.bonus.referral.restrictions.levelSteam }}
            </span>
          </div>
          <div class="rules-list__item" v-if="$root.settings.bonus.referral.restrictions.noSteamGameBan">
            <span>{{ $t("content.ref.list.3") }}</span>
          </div>
          <div class="rules-list__item" v-if="$root.settings.bonus.referral.restrictions.noSteamVacBan">
            <span>{{ $t("content.ref.list.4") }}</span>
          </div>
        </div>
        <div class="rules-text">
          <fieldset class="rules-field">
            <input type="text" readonly v-model="$root.code" />
          </fieldset>
        </div>
        <button class="rules-btn" @click="setRef">
          {{ $t("content.ref.confirm") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async setRef() {
      await this.$root
        .request("POST", "/api/referral/code", {
          value: this.$root.code,
        })
        .then(() => {
          this.$root.showNotify("success", this.$t("content.ref.refChanged"));
          localStorage.removeItem("referralCode");
          this.$router.replace("/");
          this.$root.refModal = false;
        })
        .catch(() => {
          localStorage.removeItem("referralCode");
        });
    },
    closeItem() {
      localStorage.removeItem("referralCode");
      this.$root.refModal = false;
    },
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
    width: 500px;
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

  &-subtitle{
    font-size: 22px;
    line-height: 24px;
    text-align: center;
    margin-bottom: 20px;
  }

  &-list{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    gap: 5px;
    &__item{
      margin: 0 auto;
      span{
        text-align: center;
        font-size: 16px;
        line-height: 18px;
      }
    }
  }

  &-field {
    background: #1f1f1f;
    border: 0.5px solid #3d3d3d;
    border-radius: 10px;
    height: 50px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    input {
      height: 18px;
      width: 90%;
      background: transparent;
      border: none;
      outline: none;
      font-weight: bold;
      font-size: 14px;
      line-height: 17px;
      color: #ffffff;
      margin-left: 20px;
    }
  }

  &-text {
    margin-bottom: 20px;
    li {
      font-size: 14px;
      line-height: 18px;
      font-weight: 400;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }

  &-btn {
    background: #de3720;
    border-radius: 10px;
    margin: 0 auto;
    width: 140px;
    height: 40px;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    bottom: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 300ms;
    border: 1px solid transparent;
    &:hover {
      background: #3d3d3d;
      color: #fff;
      border: 1px solid #de3720;
    }
  }
}
</style>