<template>
  <div class="chat" :class="{ 'chat-show': $root.chatShow }">
    <div class="chat-header">
      <div class="chat-header__icon">
        <svg
          width="22"
          height="21"
          viewBox="10 10 22 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M28.7199 12.7067C26.6501 10.9612 23.9085 10 21 10C18.0915 10 15.3499 10.9612 13.2801 12.7067C11.165 14.4905 10 16.8752 10 19.4216C10 21.9158 11.1433 24.2833 13.167 26.0393C12.2289 27.6211 10.6551 29.1046 10.6369 29.1216C10.2942 29.4422 10.1965 29.938 10.3927 30.3591C10.5757 30.7517 10.9773 31 11.4147 31C11.4467 31 11.4791 30.9987 11.5115 30.996C11.6999 30.9802 16.0562 30.5977 19.8364 28.7905C20.224 28.8255 20.6141 28.8432 21.0001 28.8432C23.9085 28.8432 26.6501 27.882 28.7199 26.1365C30.835 24.3526 32 21.9679 32 19.4216C32 16.8752 30.835 14.4905 28.7199 12.7067ZM15.3877 20.5C14.4517 20.5 13.6901 19.7594 13.6901 18.849C13.6901 17.9387 14.4517 17.198 15.3877 17.198C16.3238 17.198 17.0853 17.9387 17.0853 18.849C17.0853 19.7594 16.3238 20.5 15.3877 20.5ZM21 20.5C20.064 20.5 19.3024 19.7594 19.3024 18.849C19.3024 17.9387 20.064 17.198 21 17.198C21.936 17.198 22.6976 17.9387 22.6976 18.849C22.6976 19.7594 21.936 20.5 21 20.5ZM26.6123 20.5C25.6762 20.5 24.9147 19.7594 24.9147 18.849C24.9147 17.9387 25.6762 17.198 26.6123 17.198C27.5483 17.198 28.3099 17.9387 28.3099 18.849C28.3099 19.7594 27.5483 20.5 26.6123 20.5Z"
            fill="#DE3720"
          />
        </svg>
      </div>
      <div class="chat-header__title">{{ $t("content.chat.title") }}</div>

      <div class="chat-header__online">
        <div class="chat-header__online-icon">
          <div class="chat-header__online-icon-wrapper"></div>
        </div>
        <div class="chat-header__online-text">
          {{ $t("content.chat.online") }}
        </div>
        <div class="chat-header__online-number">{{ $root.online }}</div>
      </div>
      <div class="chat-header__info" @click="$root.rulesModal = true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 0C3.58862 0 0 3.58862 0 8C0 12.4114 3.58862 16 8 16C12.4114 16 16 12.4114 16 8C16 3.58862 12.4114 0 8 0ZM8 12.6666C7.63196 12.6666 7.33337 12.368 7.33337 12C7.33337 11.632 7.63196 11.3334 8 11.3334C8.36804 11.3334 8.66663 11.632 8.66663 12C8.66663 12.368 8.36804 12.6666 8 12.6666ZM9.0553 8.42798C8.81934 8.53662 8.66663 8.77466 8.66663 9.03406V9.33337C8.66663 9.70129 8.36865 10 8 10C7.63135 10 7.33337 9.70129 7.33337 9.33337V9.03406C7.33337 8.25598 7.79065 7.54272 8.4967 7.21667C9.17603 6.90405 9.66663 6.07397 9.66663 5.66663C9.66663 4.74805 8.91931 4 8 4C7.08069 4 6.33337 4.74805 6.33337 5.66663C6.33337 6.03467 6.03528 6.33337 5.66663 6.33337C5.29797 6.33337 5 6.03467 5 5.66663C5 4.0127 6.34595 2.66663 8 2.66663C9.65405 2.66663 11 4.0127 11 5.66663C11 6.56738 10.2186 7.89136 9.0553 8.42798Z"
            fill="#303030"
          />
        </svg>
      </div>
    </div>
    <div class="chat-list">
      <div class="chat-list__item" v-for="mess in items" :key="mess.id">
        <div class="chat-list__item-avatar">
          <img 
          :src="'https://avatars.akamai.steamstatic.com/' + mess.user.avatar + '_medium.jpg'"
           alt="" />
        </div>
        <div class="chat-list__item-content">
          <div class="chat-list__item-user">
            <div class="chat-list__item-user--name">
              {{ mess.user.userName }}
            </div>
          </div>
          <div class="chat-list__item-message">{{ mess.text }}</div>
        </div>
      </div>
    </div>
    <div
      class="chat-message"
      :class="{ 'no-select': this.$root.user !== null }"
    >
      <input
        type="text"
        :placeholder="$t('content.chat.message')"
        v-model="message"
        @keypress.enter="newMess"
        :disabled="this.$root.user === null"
      />
      <button
        class="chat-message__btn btn-tr"
        @click="newMess"
        v-if="$root.chatShow"
        :disabled="
          this.$root.user === null ||
          this.message.length < this.$root.settings.chat.messageMinLength
        "
        :title="
          this.message.length < this.$root.settings.chat.messageMinLength
            ? $t('content.chat.minValid')
            : $t('content.chat.send')
        "
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.0595 0.0726144L0.355314 10.4674C0.146395 10.5723 0.0106541 10.7821 0.000599182 11.0156C-0.00945573 11.2491 0.107637 11.4698 0.306758 11.5923L5.15615 14.5765V21.3555C5.15615 21.6328 5.33357 21.879 5.59667 21.9668C5.85982 22.0546 6.14948 21.9642 6.31603 21.7425L9.63028 17.3297L17.0642 21.9043C17.2446 22.0154 17.4682 22.0307 17.662 21.9452C17.8559 21.8597 17.9954 21.6844 18.0351 21.4762L21.9876 0.769181C21.9889 0.762306 21.9902 0.755431 21.9913 0.748513C22.0758 0.226571 21.5283 -0.16887 21.0595 0.0726144ZM5.76688 13.4388L1.96711 11.1005L17.1316 3.487L5.76688 13.4388ZM6.44511 19.4241V14.5582L17.1208 5.20991C16.8863 5.52208 6.72433 19.0523 6.44511 19.4241ZM16.944 20.3169L10.4076 16.2946L20.2006 3.2557L16.944 20.3169Z"
            fill="#363636"
          />
        </svg>
      </button>
    </div>
    <div class="chat-arrow">
      <div class="chat-arrow__wrap btn-tr" @click="$root.chatShow = false">
        <svg
          width="9"
          height="18"
          viewBox="0 0 9 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0L8.97071 9.00002L-7.86805e-07 18L0 0Z" fill="#DE3720" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { mapState } from "vuex";
export default {
  data() {
    return {
      chatMessages: null,
      message: "",
      items: null,
    };
  },
  computed: {
    ...mapState({ user: "user" }),
  },
  async created() {
    await this.$root
      .request("GET", `/api/chat?language=${this.$root.language}`)
      .then((resp) => {
          this.items = resp.reverse();
      });
    this.scrollChat();
  },
  watch: {
    async "$root.language"() {
      await this.$root
        .request("GET", `/api/chat?language=${this.$root.language}`)
        .then((resp) => {
            this.items = resp.reverse();
        });
      this.scrollChat();
    },
    "$root.chatShow"(val){
      if(val){
        this.scrollChat();
      }
    }
  },
  sockets: {
    newMessage(mess) {
      if (this.$root.language == mess.language) {
        if (this.items === null) {
          this.items = [];
        }
        this.items.push(mess);
        this.scrollChat();
      }
    },
    deleteMessage(id) {
      this.items = this.items.filter((item) => item.id !== id);
    },
  },
  methods: {
    async newMess() {
      if (
        this.message.length >= this.$root.settings.chat.messageMinLength &&
        this.message.length <= this.$root.settings.chat.messageMaxLength
      ) {
        await this.$root
          .request("POST", "/api/chat", {
            language: this.$root.language,
            text: this.message,
          })
          .then(() => {
            this.message = "";
            this.scrollChat();
          });
      } else {
        this.$root.showNotify(
          "error",
          this.$t("chat.length", {
            0: this.$root.settings.chat.messageMinLength,
            1: this.$root.settings.chat.messageMaxLength,
          })
        );
      }
    },
    scrollChat() {
      setTimeout(() => {
        $(".chat-list").scrollTop(999999);
      }, 50);
    },
  },
};
</script>


<style lang="scss" scoped>
.chat {
  position: relative;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  height: calc(100vh - 90px);
  width: 0;
  opacity: 0;

  &.chat-show {
    opacity: 1;
    width: 100%;
  }
  &-header {
    background: rgba(48, 48, 48, 0.8);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: 6px 10px 8px 20px;
    margin-bottom: 10px;
    position: relative;
    z-index: 3;
    &__icon {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #202020;
      border-radius: 10px;
      svg,
      img {
        filter: drop-shadow(0px 0px 10px rgba(222, 55, 32, 0.4));
        width: 22px;
        height: 21px;
      }
    }

    &__title {
      font-family: "Oswald";
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      color: #ffffff;
      margin-left: 8px;
      text-transform: uppercase;
    }

    &__online {
      margin: 0 auto;
      display: flex;
      align-items: center;
      &-icon {
        width: 12px;
        height: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(222, 55, 32, 0.4);
        box-sizing: border-box;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        background: transparent;
        border-radius: 10px;
        margin-top: 2px;
        &-wrapper {
          border-radius: 10px;
          width: 6px;
          height: 6px;
          background: #de3720;
          box-shadow: 0px 0px 10px #de3720;
        }
      }

      &-text {
        font-family: "Oswald";
        font-style: normal;
        font-weight: 200;
        font-size: 14px;
        line-height: 21px;
        color: #9e9e9e;
        margin-left: 7px;
        margin-right: 4px;
        text-transform: uppercase;
      }

      &-number {
        font-family: "Oswald";
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        color: #de3720;
        text-shadow: 0px 0px 10px #de3720;
      }
    }

    &__info {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #212121;
      border-radius: 10px;
      width: 30px;
      height: 30px;
      margin-left: 20px;
      cursor: pointer;
      transition: all 300ms;
      &:hover {
        opacity: 0.6;
      }
    }
  }

  &-list {
    padding: 0 10px;
    margin-right: 5px;
    height: calc(100vh - 260px);
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background: #303030;
      border-radius: 5px;
    }

    &::-webkit-scrollbar-track {
      background-color: #212121;
      border-radius: 5px;
      box-shadow: inset 0 0 6px #171728;
      -webkit-box-shadow: inset 0 0px 0px 1px #171728;
    }
    &__item {
      background: #1f1f1f;
      border-radius: 10px;
      padding: 11px 12px;
      display: flex;
      align-items: center;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
      &-avatar {
        border: 1px solid #000000;
        border-radius: 15px;
        width: 42px;
        height: 42px;
        overflow: hidden;
        img {
          width: 40px;
          height: 40px;
        }
      }

      &-content {
        margin-left: 10px;
      }

      &-user {
        display: flex;
        margin-bottom: 3px;
        &--name {
          font-weight: bold;
          font-size: 12px;
          line-height: 14px;
          color: #ffffff;
        }

        &--lvl {
          padding: 1px 2px 2px 3px;
          background: rgba(222, 55, 32, 0.3);
          border-radius: 5px;
          margin-left: 7px;
          font-weight: 800;
          font-size: 9px;
          line-height: 11px;
          color: #ffffff;
        }
      }

      &-message {
        word-break: break-all;
        max-width: 220px;
        font-size: 13px;
        line-height: 16px;
      }
    }
  }

  &-message {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 20px);
    background: #202020;
    box-shadow: inset 0px 0px 4px #2c2c2c;
    border-radius: 10px;
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0 16px 0 20px;

    input {
      font-weight: 300;
      font-size: 14px;
      line-height: 17px;
      color: #eee;
      background: transparent;
      border: none;
      box-shadow: none;
      outline: none;
      width: calc(90% - 56px);

      &::placeholder {
        font-weight: 300;
        font-size: 14px;
        line-height: 17px;
        color: #363638;
      }
    }

    &__emoticons {
      background: transparent;
      border: none;
      outline: none;
      margin-left: auto;
    }
    &__btn {
      background: transparent;
      border: none;
      outline: none;
      margin-left: 12px;
      margin-left: auto;
    }
  }

  &-arrow {
    position: absolute;
    top: 4px;
    left: -41px;
    background: #181818;
    border-radius: 10px;
    height: 42px;
    width: 71px;
    padding: 4px;
    &__wrap {
      background: #232323;
      border-radius: 10px;
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      svg,
      img {
        filter: drop-shadow(0px 0px 10px rgba(222, 55, 32, 0.4));
        width: 22px;
        height: 21px;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .chat-arrow {
    left: 20px;
    top: 5px;
    z-index: 101;
    background: #202020;
    width: 36px;
    height: 36px;
    padding: 0;
    &__wrap {
      background: #202020;
      width: 36px;
      height: 36px;
    }
  }
}
</style>