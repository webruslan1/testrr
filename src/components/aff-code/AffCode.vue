<template>
  <div class="ref-refcode">
    <div class="ref-refcode__title">
      <span>{{$t('content.aff-code.title')}}</span>
    </div>
    <div class="ref-refcode__form">
      <fieldset class="ref-refcode__form-field">
        <input type="text"  v-model="code"/>
      </fieldset>
      <button class="ref-refcode__form-btn btn-tr" @click="setAffCode">
        <svg
          width="20"
          height="14"
          viewBox="0 0 20 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.2481 0.218739C16.9575 -0.0729129 16.481 -0.0729129 16.1904 0.218739L7.39278 9.01423L2.86203 4.4525C2.57145 4.15978 2.09818 4.15978 1.80546 4.4525L0.217938 6.03895C-0.0726459 6.32847 -0.0726459 6.80494 0.217938 7.09659L6.85969 13.7821C7.15028 14.0717 7.62354 14.0717 7.91733 13.7821L18.8345 2.8639C19.1294 2.57225 19.1294 2.09471 18.8345 1.80199L17.2481 0.218739Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: "",
    };
  },
  methods: {
    async setAffCode() {
        await this.$root
          .request("POST", "/api/referral/code", {
            value: this.code,
          })
          .then(() =>
            this.$root.showNotify(
              "success",
              this.$t('content.aff-code.success')
            )
          )
    },
  },
};
</script>

<style lang="scss" scoped>
.ref-refcode {
  width: 385px;
  height: 100px;
  background: #1f1f1f;
  border-radius: 10px;
  padding: 14px 20px 15px 20px;

  &__title {
    display: flex;
    align-items: center;
    margin-bottom: 14px;
    span {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #ffffff;
    }

    a {
      font-weight: 500;
      font-size: 12px;
      line-height: 14px;
      color: #aaaaaa;
      margin-left: auto;
    }
  }

  &__form {
    display: flex;
    &-field {
      background: #1f1f1f;
      border: 0.5px solid #3d3d3d;
      border-radius: 10px;
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

    &-btn {
      width: 40px;
      height: 40px;
      border: none;
      margin-left: 10px;
      background: #2b2b2b;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>