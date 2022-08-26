<template>
  <div class="ref-reflink__form">
    <fieldset class="ref-reflink__form-field">
      <input ref="refLink" v-model="refcode" type="text" />
    </fieldset>
    <button class="ref-reflink__form-copy btn-tr" @click="copyRef">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 7.77777V18.8889C20 19.1836 19.8829 19.4662 19.6746 19.6746C19.4662 19.8829 19.1836 20 18.8889 20H7.77778C7.48309 20 7.20048 19.8829 6.9921 19.6746C6.78373 19.4662 6.66667 19.1836 6.66667 18.8889V7.77777C6.66667 7.48309 6.78373 7.20047 6.9921 6.9921C7.20048 6.78373 7.48309 6.66666 7.77778 6.66666H18.8889C19.1836 6.66666 19.4662 6.78373 19.6746 6.9921C19.8829 7.20047 20 7.48309 20 7.77777ZM3.33333 12.2222H2.22222V2.22222H12.2222V3.33333C12.2222 3.62802 12.3393 3.91063 12.5477 4.11901C12.756 4.32738 13.0386 4.44444 13.3333 4.44444C13.628 4.44444 13.9106 4.32738 14.119 4.11901C14.3274 3.91063 14.4444 3.62802 14.4444 3.33333V1.11111C14.4444 0.816426 14.3274 0.53381 14.119 0.325437C13.9106 0.117063 13.628 0 13.3333 0H1.11111C0.816426 0 0.533811 0.117063 0.325437 0.325437C0.117063 0.53381 0 0.816426 0 1.11111V13.3333C0 13.628 0.117063 13.9106 0.325437 14.119C0.533811 14.3274 0.816426 14.4444 1.11111 14.4444H3.33333C3.62802 14.4444 3.91063 14.3274 4.11901 14.119C4.32738 13.9106 4.44444 13.628 4.44444 13.3333C4.44444 13.0386 4.32738 12.756 4.11901 12.5477C3.91063 12.3393 3.62802 12.2222 3.33333 12.2222Z"
          fill="white"
        />
      </svg>
    </button>
    <button
      v-if="data.canChangeCode"
      class="ref-refcode__form-btn btn-tr"
      @click="changeRef"
    >
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
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      refcode: "",
    };
  },
  created() {
    this.refcode = this.data.code.value;
  },
  methods: {
    copyToClipboard(textToCopy) {
      if (!navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(textToCopy);
      } else {
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
          document.execCommand("copy") ? res() : rej();
          textArea.remove();
        });
      }
    },
    copyRef() {
      this.copyToClipboard(`${this.$root.authUrl}/r/${this.refcode}`).then(
        () => {
          this.$root.showNotify("success", this.$t("notifications.ref_copied"));
        }
      );
    },
    changeRef() {
      if (
        this.refcode.length >= this.$root.settings.referral.codeMinLength &&
        this.refcode.length <= this.$root.settings.referral.codeMaxLength
      ) {
        this.$root
          .request("PATCH", "/api/referral/code", {
            id: this.data.id,
            value: this.refcode,
          })
          .then(() =>
            this.$root.showNotify(
              "success",
              this.$t('content.ref.refChange', {0: this.refcode})
            )
          );
      } else {
        this.$root.showNotify(
          "error",
          this.$t('content.ref.refValid', {0:this.$root.settings.referral.codeMinLength, 1: this.$root.settings.referral.codeMaxLength})
        );
      }
    },
  },
};
</script>


<style scoped lang="scss">
.ref-reflink {
  &__form {
    display: flex;

    &:not(:last-child) {
      margin-bottom: 10px;
    }

    &-field {
      flex: 1;
      background: #1f1f1f;
      border: 0.5px solid #3d3d3d;
      box-sizing: border-box;
      border-radius: 10px;
      display: flex;
      align-items: center;
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

    &-copy {
      margin-left: 10px;
      width: 40px;
      height: 40px;
      border: none;
      background: #2b2b2b;
      border-radius: 10px;
    }
  }
}
.ref-refcode__form-btn {
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
</style>