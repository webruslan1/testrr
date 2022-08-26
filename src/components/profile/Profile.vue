<template>
  <div
    class="profile"
    :class="{ 'chat-hidden': !$root.chatShow }"
    v-if="$root.user"
  >
    <div class="profile-avatar">
      <router-link to="/profile" class="img btn-tr">
        <img :src="'https://avatars.akamai.steamstatic.com/' + $root.user.avatar + '_medium.jpg'" alt="" />
      </router-link>
      <div
        class="point btn-tr"
        v-if="notifList.length !== 0"
        @click="notif = !notif"
      >
        <span>{{ notifList.length }}</span>
      </div>
    </div>
    <div class="profile-content">
      <router-link to="/profile" class="profile-content__name btn-tr">
        {{ $root.user.userName }}
      </router-link>

      <div class="profile-content__balance">
        <div class="profile-content__balance-main">
          {{ $root.conv($root.user.balance) }}
          <Sosiska />
        </div>
      </div>
    </div>
    <div class="profile-plus btn-tr" @click="$root.deposite = true">
      <span>+</span>
    </div>
    <a :href="$root.authUrl + '/api/auth/logout'" class="profile-logout btn-tr">
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.9415 7.96335C17.9033 7.87184 17.8485 7.78859 17.7788 7.71884L15.5295 5.46957C15.2363 5.17707 14.7623 5.17707 14.469 5.46957C14.1758 5.76281 14.1758 6.23756 14.469 6.53006L15.4388 7.49981H11.2493C10.8345 7.49981 10.4993 7.8358 10.4993 8.2498C10.4993 8.6638 10.8345 8.99979 11.2493 8.99979H15.4388L14.469 9.96954C14.1758 10.2628 14.1758 10.7375 14.469 11.03C14.6153 11.177 14.8072 11.2498 14.9993 11.2498C15.1913 11.2498 15.3833 11.1771 15.5295 11.03L17.7788 8.78077C17.8485 8.71175 17.9033 8.6285 17.9415 8.53625C18.0173 8.35334 18.0173 8.14634 17.9415 7.96335Z"
          fill="#2C2C2C"
        />
        <path
          d="M12.75 10.5C12.3352 10.5 12 10.836 12 11.25V15H9V2.99999C9 2.66924 8.78249 2.37674 8.46524 2.2815L5.86048 1.50001H12V5.25002C12 5.66402 12.3352 6.00001 12.75 6.00001C13.1647 6.00001 13.5 5.66402 13.5 5.25002V0.750024C13.5 0.335988 13.1647 0 12.75 0H0.749988C0.722989 0 0.698977 0.01125 0.67275 0.0142383C0.637488 0.018 0.60525 0.0239766 0.5715 0.0322383C0.49275 0.0524883 0.421488 0.08325 0.354762 0.125227C0.338274 0.135738 0.318024 0.136477 0.302274 0.148465C0.296227 0.153 0.293977 0.161262 0.287965 0.165762C0.206227 0.230238 0.137988 0.308988 0.0884883 0.40275C0.0779766 0.423 0.0757266 0.444762 0.0675 0.46575C0.0434883 0.522738 0.0172617 0.57825 0.00826172 0.64125C0.0045 0.66375 0.01125 0.684738 0.0105117 0.7065C0.00977344 0.721512 0 0.735012 0 0.749988V15.75C0 16.1078 0.252738 16.4153 0.603 16.485L8.10299 17.985C8.15175 17.9955 8.20125 18 8.24998 18C8.42172 18 8.59047 17.9408 8.72547 17.8298C8.89872 17.6873 8.99997 17.475 8.99997 17.25V16.5H12.75C13.1647 16.5 13.5 16.164 13.5 15.75V11.25C13.5 10.836 13.1647 10.5 12.75 10.5Z"
          fill="#2C2C2C"
        />
      </svg>
    </a>
    <div class="notific" v-if="notif && notifList.length !== 0">
      <div class="notific-header">
        <span>{{ $t("content.notif.title") }}</span>
        <div
          class="clear btn-tr"
          :title="$t('content.notif.delete')"
          @click="deleteAllItems"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="10px"
            y="10px"
            width="20"
            height="20"
            viewBox="0 0 393.284 393.284"
            style="enable-background: new 0 0 393.284 393.284"
            xml:space="preserve"
            fill="#de3720"
          >
            <g>
              <path
                d="M316.642,96.284h-240c-8.271,0-15,6.729-15,15v267c0,8.271,6.729,15,15,15h37.675c8.271,0,15-6.729,15-15v-47.506   c0-2.757,2.243-5,5-5h124.649c2.757,0,5,2.243,5,5v47.506c0,8.271,6.729,15,15,15h37.675c8.271,0,15-6.729,15-15v-267   C331.642,103.013,324.913,96.284,316.642,96.284z"
              />
              <path
                d="M336.642,0h-280c-8.271,0-15,6.729-15,15v39c0,8.271,6.729,15,15,15h280c8.271,0,15-6.729,15-15V15   C351.642,6.729,344.913,0,336.642,0z"
              />
              <path
                d="M228.641,353.651h-63.997c-9.665,0-17.5,7.835-17.5,17.5s7.835,17.5,17.5,17.5h63.997c9.665,0,17.5-7.835,17.5-17.5   S238.306,353.651,228.641,353.651z"
              />
            </g>
          </svg>
        </div>
      </div>
      <div class="notific-list">
        <div
          class="notific-list__item btn-tr"
          :class="item.type"
          v-for="item in notifList"
          :key="item.id"
          :style="{ cursor: item.data.type === 'ticket' ? 'pointer' : '' }"
          @click="openIfTicket(item)"
        >
          <div class="notific-list__item-content">
            <div class="notific-list__item-title">
              {{ $t(item.data.header) }}
            </div>
            <div class="notific-list__item-subtitle">
              {{ $t(item.data.msg) }} <br />
              <span v-if="item.data.subMsg !== undefined"
                >({{
                  item.data.subMsg !== undefined ? $t(item.data.subMsg) : ""
                }})</span
              >
            </div>
          </div>
          <div
            class="notific-list__item-clear btn-tr"
            @click="deleteItem(item)"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                y="11.3137"
                width="16"
                height="1"
                rx="0.5"
                transform="rotate(-45 0 11.3137)"
                fill="#646464"
              />
              <rect
                width="16"
                height="1"
                rx="0.5"
                transform="matrix(0.707107 0.707107 0.707107 -0.707107 0 0.707031)"
                fill="#646464"
              />
            </svg>
          </div>
          <div
            class="notific-list__item-icon"
            v-if="item.data.type === 'deposit' || item.type === 'deposit.steam'"
          >
            $
          </div>
          <div
            class="notific-list__item-icon"
            v-else-if="item.type === 'success'"
          >
            ✔
          </div>
          <div class="notific-list__item-icon" v-else-if="item.type === 'info'">
            ?
          </div>
          <div
            class="notific-list__item-icon"
            v-else-if="item.type === 'error'"
          >
            !
          </div>
        </div>
      </div>
    </div>
  </div>
  <a
    class="profile-sign"
    :href="$root.authUrl + '/api/auth/login'"
    :class="{ 'chat-hidden': !$root.chatShow }"
    v-else
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      id="mdi-steam"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C7.4,22 3.55,18.92 2.36,14.73L6.19,16.31C6.45,17.6 7.6,18.58 8.97,18.58C10.53,18.58 11.8,17.31 11.8,15.75V15.62L15.2,13.19H15.28C17.36,13.19 19.05,11.5 19.05,9.42C19.05,7.34 17.36,5.65 15.28,5.65C13.2,5.65 11.5,7.34 11.5,9.42V9.47L9.13,12.93L8.97,12.92C8.38,12.92 7.83,13.1 7.38,13.41L2,11.2C2.43,6.05 6.73,2 12,2M8.28,17.17C9.08,17.5 10,17.13 10.33,16.33C10.66,15.53 10.28,14.62 9.5,14.29L8.22,13.76C8.71,13.58 9.26,13.57 9.78,13.79C10.31,14 10.72,14.41 10.93,14.94C11.15,15.46 11.15,16.04 10.93,16.56C10.5,17.64 9.23,18.16 8.15,17.71C7.65,17.5 7.27,17.12 7.06,16.67L8.28,17.17M17.8,9.42C17.8,10.81 16.67,11.94 15.28,11.94C13.9,11.94 12.77,10.81 12.77,9.42A2.5,2.5 0 0,1 15.28,6.91C16.67,6.91 17.8,8.04 17.8,9.42M13.4,9.42C13.4,10.46 14.24,11.31 15.29,11.31C16.33,11.31 17.17,10.46 17.17,9.42C17.17,8.38 16.33,7.53 15.29,7.53C14.24,7.53 13.4,8.38 13.4,9.42Z"
      />
    </svg>
    <span>{{ $t("content.signin") }}</span>
  </a>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      notif: false,
      notifList: [],
    };
  },
  async created() {
    if (this.$root.user) {
      await this.$root.request("GET", "/api/notification").then((resp) => {
        this.notifList = resp.items;
      });
    }
  },
  mounted() {
    const vm = this;
    $("body").click(function (event) {
      if (
        !$(event.target).closest(".notific").length &&
        vm.notif === true &&
        !$(event.target).closest(".point").length
      ) {
        vm.notif = false;
      }
    });
  },
  sockets: {
    notificationNew(mess) {
      this.notifList.push(mess);
    },
  },
  methods: {
    openIfTicket(item) {
      if (item.data.type === "ticket") {
        this.$router.replace(`/tickets/${item.data.ticketId}`);
      }
    },
    async deleteAllItems() {
      await this.$root.request("PATCH", "/api/notification").then(() => {
        this.notifList = [];
      });
    },
    async deleteItem(data) {
      await this.$root
        .request("PATCH", `/api/notification/${data.id}`)
        .then(() => {
          this.notifList = this.notifList.filter((item) => item.id !== data.id);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.notific {
  position: absolute;
  width: 300px;
  left: -320px;
  top: 0px;
  z-index: 4;

  &-header {
    background: #2c2c2c;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    margin-bottom: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 18px;
    span {
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      color: #de3720;
    }

    .clear {
      margin-left: auto;
    }
  }

  &-list {
    background: #2c2c2c;
    border-radius: 10px;
    padding: 10px 7px 10px 7px;
    max-height: 200px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }

    &__item {
      &:not(:last-child){
        margin-bottom: 6px;
      }
      &.success {
        background: linear-gradient(
            90deg,
            #ffffff -6.76%,
            rgba(255, 255, 255, 0) 15.83%
          ),
          linear-gradient(90deg, #68c73c 0%, rgba(119, 199, 81, 0) 100%);

        .notific-list__item-icon {
          background: radial-gradient(
            50% 50% at 50% 50%,
            #5fa93b 0%,
            rgba(93, 164, 59, 0) 100%
          );
        }
      }

      &.error {
        background: linear-gradient(
            90deg,
            #ffffff -6.76%,
            rgba(255, 255, 255, 0) 15.83%
          ),
          linear-gradient(90deg, #c73c3c 0%, rgba(199, 81, 81, 0) 100%);

        .notific-list__item-icon {
          background: radial-gradient(
            50% 50% at 50% 50%,
            #a93b3b 0%,
            rgba(164, 59, 59, 0) 100%
          );
        }
      }

      &.info {
        background: linear-gradient(
            90deg,
            #ffffff -6.76%,
            rgba(255, 255, 255, 0) 15.83%
          ),
          linear-gradient(90deg, #3c6bc7 0%, rgba(60, 107, 199, 0) 100%);

        .notific-list__item-icon {
          background: radial-gradient(
            50% 50% at 50% 50%,
            #3c6bc7 0%,
            rgba(60, 107, 199, 0) 100%
          );
        }
      }

      min-height: 50px;
      max-height: 100px;
      padding: 9px 19px 13px 12px;
      display: flex;
      align-items: center;
      gap: 10px;
      background-blend-mode: overlay, normal;
      border-radius: 5px;
      width: 259px;
      margin-left: auto;
      position: relative;

      &-title {
        font-weight: 700;
        font-size: 11px;
        line-height: 13px;
        color: #ffffff;
        margin-bottom: 3px;
      }

      &-subtitle {
        font-weight: 500;
        font-size: 11px;
        line-height: 13px;
        color: #fff;
        span {
          font-weight: 500;
          font-size: 10px;
          line-height: 11px;
          color: #fff;
        }
      }

      &-clear {
        margin-left: auto;
      }

      &-icon {
        position: absolute;
        left: -29px;
        top: 50%;
        transform: translateY(-50%);
        width: 56px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 36px;
        line-height: 43px;
        color: #ffffff;
        text-shadow: 0px 0px 8px #ffffff;
      }
    }
  }
}
.profile-sign {
  border-radius: 20px;
  height: 50px;
  margin-bottom: 20px;
  transition: all 300ms;
  text-transform: uppercase;
  width: 100%;
  background: #de3720;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;

  &.chat-hidden {
    span {
      display: none;
    }
  }
  span {
    margin-left: 10px;
    font-size: 18px;
    line-height: 18px;
    color: #000;
    font-weight: 500;
  }
  &:hover {
    opacity: 0.5;
  }
}
.profile {
  background: #2c2c2c;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding-left: 20px;
  height: 50px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  transition: all 300ms;
  position: relative;

  &.chat-hidden {
    width: 50px;
    height: 50px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .profile {
      &-avatar {
        width: 40px;
        height: 40px;
        .img {
          width: 40px;
          height: 40px;
          img {
            border-radius: 15px;
          }
        }

        .point {
          top: -5px;
          right: -5px;
        }
      }

      &-content,
      &-plus,
      &-logout {
        display: none;
      }
    }
  }

  &-avatar {
    width: 42px;
    height: 42px;
    margin-top: 4px;
    margin-bottom: 4px;
    border-radius: 10px;
    user-select: none;
    position: relative;
    .img {
      height: 42px;
      width: 42px;
      img {
        border: 1px solid rgba(0, 0, 0, 0.2);
        width: inherit;
        border-radius: 10px;
        height: inherit;
      }
    }

    .point {
      background: red;
      width: 15px;
      height: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: -7px;
      right: -7px;
      border-radius: 10px;
      span {
        color: #fff;
        font-weight: 600;
        font-size: 12px;
        line-height: 13px;
      }
    }
  }

  &-content {
    margin-left: 10px;
    margin-bottom: 6px;
    user-select: none;
    &__name {
      display: inline-block;
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      color: #ffffff;
      text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
      margin-bottom: 2px;
      text-overflow: ellipsis;
      width: 150px;
      text-decoration: none;
      overflow: hidden;
      white-space: nowrap;
    }

    &__balance {
      display: flex;
      word-break: break-all;
      &-main {
        font-weight: 800;
        font-size: 14px;
        line-height: 17px;
        color: #de3720;
        text-shadow: 0px 0px 1px rgb(222, 55, 32);
        display: flex;
        align-self: center;
        flex-wrap: wrap;
      }

      &-bonus {
        font-weight: 800;
        font-size: 14px;
        line-height: 17px;
        color: #de3720;
        text-shadow: 0px 0px 2px rgba(222, 55, 32, 0.5);
        margin-left: 9px;
      }
    }
  }

  &-plus {
    margin-left: auto;
    margin-right: 20px;
    background: #72f235;
    box-shadow: 0px 0px 4px rgba(114, 242, 53, 0.5);
    border-radius: 10px;
    width: 30px;
    user-select: none;
    height: 30px;
    position: relative;
    span {
      position: absolute;
      left: 50%;
      top: calc(50% - 3px);
      transform: translate(-50%, -50%);
      font-style: normal;
      font-weight: 800;
      font-size: 24px;
      line-height: 24px;
      color: #ffffff;
    }
  }

  &-logout {
    background: #1e1e1e;
    border: 2px solid #232323;
    box-sizing: border-box;
    border-radius: 0px 20px 20px 0px;
    width: 33px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.profile.chat-hidden:hover {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: unset;
  .profile {
    &-content,
    &-plus,
    &-logout {
      display: block;
    }

    &-plus {
      margin: unset;
      margin-bottom: 10px;
    }

    &-content {
      margin: 0;
      margin-bottom: 10px;
      padding: 0 2px;
      &__name {
        display: none;
      }

      &__balance {
        flex-direction: column;
        &-main {
          font-size: 13px;
          text-align: center;

          img {
            display: none;
          }
        }
        &-bonus {
          font-size: 12px;
          text-align: center;
          margin-left: 0;
        }
      }
    }

    &-logout {
      display: block;
      height: 30px;
      width: 100%;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
    }
  }
}

@media screen and (max-width: 900px) {
  .profile-sign {
    &.chat-hidden {
      span {
        display: inline;
      }

      .profile-content {
        padding: 0 2px;
      }
    }
  }
  .profile {
    height: 50px;

    &.chat-hidden {
      padding-left: 20px;
      width: 100%;
      height: 50px !important;
      border-radius: 10px;
      flex-direction: row;
      .profile-avatar {
        display: block;
      }

      .profile-content {
        display: block;
      }

      .profile-plus {
        display: block;
      }

      .profile-logout {
        background: #1e1e1e;
        border: 2px solid #232323;
        box-sizing: border-box;
        border-radius: 0px 10px 10px 0px;
        width: 33px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .profile.chat-hidden:hover {
    flex-direction: row;
    .profile {
      &-content,
      &-plus,
      &-logout {
        display: block;
      }

      &-plus {
        margin: unset;
        margin-left: 25px;
      }

      &-content {
        margin-left: 10px;
        margin-bottom: 6px;
        &__name {
          display: block;
          font-weight: 500;
          font-size: 18px;
          line-height: 22px;
          color: #ffffff;
          text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
          margin-bottom: 2px;
        }

        &__balance {
          flex-direction: row;
          &-main {
            font-size: 14px;
            text-align: center;
          }
          &-bonus {
            font-size: 14px;
            text-align: center;
            margin-left: 9px;
          }
        }
      }

      &-logout {
        border-radius: 0px 10px 10px 0px;
        width: 33px;
        height: 100%;
        margin-left: auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .notific {
    left: 0;
    top: 60px;
  }
}
</style>