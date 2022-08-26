<template>
  <div class="modal-default" :class="{ 'none-modal': modal === false }">
    <div
      class="modal-body"
      :class="{
        'visible-modal': modal === true,
        'fade-modal': modal === false,
      }"
    >
      <div class="modal-body__header">
        <div class="modal-body__header-title">{{$t('content.fair.title')}}</div>
        <div
          class="modal-body__header-close"
          @click="$emit('update:modal', false)"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 13.6018L13.6022 17L8.5 11.8986L3.39819 17L0 13.6018L5.10162 8.50019L0 3.398L3.39819 0L8.5 5.10162L13.6022 0L17 3.39819L11.8986 8.5L17 13.6018Z"
              fill="#545454"
            />
          </svg>
        </div>
      </div>
      <div class="modal-body__content">
        <div class="modal-body__top">
          <div class="modal-body__content-title">{{$t('content.fair.roundData')}}</div>
          <div class="modal-body__top-list">
            <li>
              Crash: <span>{{ crash }}</span>
            </li>
            <li>
              Hash:
              <span>
                {{ hash }}
              </span>
            </li>
            <li>
              Salt: <span>{{ salt }}</span>
            </li>
          </div>
        </div>
        <div class="modal-body__center">
          <div class="modal-body__content-title">{{$t('content.fair.howFair')}}</div>
          <div class="modal-body__center-content">
            <p style="margin-bottom: 12px">
              {{$t('content.fair.hash')}}
            </p>
            <div class="modal-body__center-formula">sha256(Salt:Crash)</div>
            <p class="modal-body__center-text">
              {{$t('content.fair.forGame')}}

              <span>{{ crash }}+{{ salt }}</span> <br />
              {{$t('content.fair.youCan')}}
              <a
                href="https://www.freeformatter.com/sha256-generator.html"
                target="_blank"
                >{{$t('content.fair.site')}}</a
              >
            </p>
            <a
              href="https://www.freeformatter.com/sha256-generator.html"
              target="_blank"
              class="modal-body__center-btn"
              >{{$t('content.fair.goLink')}}</a
            >
          </div>
        </div>
        <div class="modal-body__footer">
          <div class="modal-body__content-title">{{$t('content.fair.what')}}</div>
          <div class="modal-body__footer-text">
            <p>
              {{$t('content.fair.p.1')}}
            </p>
            <p>
              {{$t('content.fair.p.2')}}
            </p>
            <p>
              {{$t('content.fair.p.3')}}
            </p>
          </div>
          <div class="modal-body__footer-info" v-html="$t('content.fair.p.4')">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  props: ["modal", "hash", "crash", "salt"],
  mounted() {
    const vm = this;
    $("body").click(function (event) {
      if ($(event.target).is(".modal-default")) {
        vm.$emit("update:modal", false);
      }
    });
  },
};
</script>


<style lang="scss" scoped>
p {
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
}
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
    width: 600px;
    background: #212121;
    border-radius: 20px;
    overflow: hidden;

    &__header {
      height: 55px;
      background: #212121;
      display: flex;
      align-items: center;
      padding: 13px 17px 12px 20px;
      position: relative;
      &-title {
        font-weight: normal;
        font-size: 18px;
        line-height: 22px;
        color: #ffffff;
        margin: 0 auto;
      }

      &-id {
        color: #494949;
        margin-left: 3px;
        line-height: 20px;
      }
      &-close {
        position: absolute;
        top: 20px;
        right: 25px;
        cursor: pointer;
        transition: all 300ms;
        &:hover {
          opacity: 0.8;
        }
      }
    }

    &__content {
      padding: 11px 20px 21px 20px;
      & > div {
        background: #191919;
        border-radius: 10px;
        padding: 11px 20px;
        &:not(:last-child) {
          margin-bottom: 10px;
        }
      }
      &-title {
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #494949;
      }
    }

    &__top {
      .modal-body__content-title {
        margin-bottom: 12px;
      }

      &-list {
        padding-left: 10px;
        li {
          font-weight: 300;
          font-size: 12px;
          line-height: 18px;
          color: #de3720;
          span {
            font-weight: 300;
            font-size: 12px;
            line-height: 14px;
            color: #fff;
            word-break: break-all;
          }
        }
      }
    }

    &__center {
      .modal-body__content-title {
        margin-bottom: 13px;
      }
      &-content {
        padding: 0 10px;
      }
      &-formula {
        background: #212121;
        border-radius: 10px;
        width: 180px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        font-weight: normal;
        font-size: 12px;
        line-height: 18px;
        margin-bottom: 18px;
      }
      &-text {
        font-size: 12px;
        line-height: 18px;
        margin-bottom: 21px;
        span {
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          color: #de3720;
        }
        a {
          color: #a8a8a8;
          text-decoration: underline;
          font-size: 12px;
          line-height: 18px;
        }
      }
      &-btn {
        width: 180px;
        height: 35px;
        background: #545454;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        color: pointer;
        transition: all 300ms;
        text-transform: uppercase;
        font-weight: normal;
        font-size: 12px;
        line-height: 18px;
        color: #a8a8a8;
        &:hover {
          opacity: 0.8;
        }
      }
    }

    &__footer {
      .modal-body__content-title {
        margin-bottom: 12px;
      }

      &-text {
        padding: 0 20px;
        p {
          font-size: 12px;
          line-height: 18px;
          margin-bottom: 16px;
          span {
            font-size: 12px;
            line-height: 18px;
            color: #de3720;
          }
        }
      }
      &-info {
        margin: 0 32px;
        background: #612921;
        border-radius: 10px;
        padding: 3px 0;
        font-weight: 500;
        font-size: 12px;
        height: 42px;
        line-height: 18px;
        color: #de3720;
        text-align: center;
      }
    }
  }
}

@media screen and (max-height: 700px) {
  .modal {
    &-default {
    }
    &-body {
      width: 100%;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      overflow-y: scroll;
      display: block;
      z-index: 9999;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 650px) {
  .modal {
    &-default {
    }

    &-body {
      &__footer {
        &-text {
          padding: 0;
        }
        &-info {
          padding: 0;
          margin: 0;
          font-size: 10px;
          line-height: 12px;
          height: 35px;
          padding: 5px 0;
        }
      }
    }
  }
}
</style>