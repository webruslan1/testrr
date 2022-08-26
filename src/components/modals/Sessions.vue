<template>
  <div class="modal-default" :class="{ 'none-modal': sessions === false }">
    <div
      class="modal-body"
      :class="{
        'visible-modal': sessions === true,
        'fade-modal': sessions === false,
      }"
    >
      <div class="modal-header">
        <div class="modal-header__title">{{$t('content.session.allSession')}}</div>
        <div
          class="modal-header__close btn-tr"
          @click="$emit('update:sessions', false)"
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
      <div class="sessions">
        <div class="sessions-item" v-for="(item, id) in all_sessions" :key="id">
          <div class="sessions-item__header" v-if="item.status == 1">
            <div class="sessions-item__header-title">{{$t('content.session.currentSession')}}</div>
            <div class="sessions-item__header-action">
              <svg
                width="12"
                height="12"
                viewBox="7 7 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="13" cy="13" r="3" fill="#72F235" />
                <circle
                  cx="13"
                  cy="13"
                  r="5.5"
                  stroke="#72F235"
                  stroke-opacity="0.5"
                  shape-rendering="crispEdges"
                />
              </svg>
            </div>
          </div>
          <div class="sessions-item__header" v-else>
            <div class="sessions-item__header-title">{{$t('content.session.activeSession')}}</div>
            <div class="sessions-item__header-exit">
              <svg
                width="15"
                height="15"
                viewBox="4 5 15 15"
                style="filter: drop-shadow(0px 0px 4px rgba(222, 55, 32, 0.5))"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.953 11.6359C18.9211 11.5597 18.8755 11.4903 18.8174 11.4321L16.9427 9.55742C16.6982 9.31362 16.3032 9.31362 16.0588 9.55742C15.8143 9.80183 15.8143 10.1975 16.0588 10.4413L16.867 11.2496H13.3751C13.0294 11.2496 12.75 11.5296 12.75 11.8747C12.75 12.2198 13.0294 12.4998 13.3751 12.4998H16.867L16.0587 13.3081C15.8143 13.5525 15.8143 13.9482 16.0587 14.192C16.1806 14.3145 16.3406 14.3752 16.5007 14.3752C16.6607 14.3752 16.8208 14.3145 16.9427 14.192L18.8174 12.3173C18.8755 12.2597 18.9211 12.1903 18.953 12.1135C19.0161 11.961 19.0161 11.7885 18.953 11.6359Z"
                  fill="#DE3720"
                />
                <path
                  d="M14.626 13.7502C14.2803 13.7502 14.0009 14.0303 14.0009 14.3753V17.5009H11.5004V7.49905C11.5004 7.22337 11.3191 6.97958 11.0547 6.9002L8.88365 6.24884H14.0009V9.37442C14.0009 9.71949 14.2803 9.99953 14.626 9.99953C14.9716 9.99953 15.2511 9.71949 15.2511 9.37442V5.62373C15.2511 5.27864 14.9716 4.9986 14.626 4.9986H4.62413C4.60162 4.9986 4.58161 5.00797 4.55975 5.01046C4.53036 5.0136 4.50349 5.01858 4.47536 5.02547C4.40972 5.04234 4.35033 5.06798 4.29471 5.10297C4.28097 5.11173 4.26409 5.11235 4.25096 5.12234C4.24592 5.12612 4.24405 5.13301 4.23904 5.13676C4.17091 5.1905 4.11403 5.25613 4.07278 5.33428C4.06402 5.35116 4.06214 5.3693 4.05528 5.38679C4.03527 5.43429 4.01341 5.48056 4.00591 5.53307C4.00277 5.55182 4.0084 5.56932 4.00778 5.58745C4.00717 5.59997 3.99902 5.61122 3.99902 5.6237V18.126C3.99902 18.4242 4.20968 18.6805 4.50162 18.7386L10.7528 19.9889C10.7934 19.9976 10.8347 20.0014 10.8753 20.0014C11.0184 20.0014 11.1591 19.952 11.2716 19.8595C11.416 19.7407 11.5004 19.5638 11.5004 19.3763V18.7512H14.626C14.9716 18.7512 15.2511 18.4711 15.2511 18.126V14.3753C15.2511 14.0303 14.9716 13.7502 14.626 13.7502Z"
                  fill="#DE3720"
                />
              </svg>
            </div>
          </div>
          <div class="sessions-item__content">
            <span>{{ item.brow }}</span>
            <span>{{ item.os }}</span>
            <span>{{ item.last }}</span>
          </div>
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
      all_sessions: [
        {
          status: 1,
          last: "02/10/2021 05:56",
          os: "Windows 10",
          brow: "Google Chrome",
        },
        {
          status: 0,
          last: "02/10/2021 05:56",
          os: "Windows 8",
          brow: "Google Chrome",
        },
      ],
    };
  },
  props: ["sessions"],
  mounted() {
    const vm = this;
    $("body").click(function (event) {
      if ($(event.target).is(".modal-default")) {
        vm.$emit("update:sessions", false);
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
    margin-bottom: 22px;
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

.sessions {
  padding-left: 10px;
  padding-right: 68px;
  display: flex;
  flex-direction: column;
  row-gap: 22px;
  &-item {
    &__header {
      margin-bottom: 13px;
      display: flex;
      align-items: center;
      &-title {
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #72f235;
      }

      &-action {
        margin-left: auto;
      }

      &-exit{
        margin-left: auto;
        cursor: pointer;
        transition: all 300ms;
        &:hover{
          opacity: 0.5;
        }
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      row-gap: 4px;
      span {
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;
        color: #606060;
        &:first-child {
          font-weight: 600;
          font-size: 14px;
          line-height: 17px;
          color: #ffffff;
        }
      }
    }
  }
}
</style>