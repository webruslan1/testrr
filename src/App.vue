<template>
  <transition name="fade" mode="out-in">
    <Loader v-if="this.$root.loading == true" />
    <div
      id="app"
      :class="{ 'chat-hidden': $root.chatShow }"
      v-else-if="this.$root.loading == false && this.$root.tech == false"
    >
      <Navbar />
      <div class="wrapper" :class="{ 'chat-hidden': !$root.chatShow }">
        <transition name="fade" mode="out-in">
          <router-view class="view"></router-view>
        </transition>
      </div>
      <div class="sidebar" :class="{ 'chat-hidden': !$root.chatShow }">
        <Profile />
        <Chat />
      </div>
      <div
        v-if="!$root.chatShow"
        class="chat-open"
        @click="$root.chatShow = true"
      >
        <svg
          width="42"
          height="41"
          viewBox="0 0 42 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_75_757)">
            <path
              d="M28.7199 12.7067C26.6501 10.9612 23.9085 10 21 10C18.0915 10 15.3499 10.9612 13.2801 12.7067C11.165 14.4905 10 16.8752 10 19.4216C10 21.9158 11.1433 24.2833 13.167 26.0393C12.2289 27.6211 10.6551 29.1046 10.6369 29.1216C10.2942 29.4422 10.1965 29.938 10.3927 30.3591C10.5757 30.7517 10.9773 31 11.4147 31C11.4467 31 11.4791 30.9987 11.5115 30.996C11.6999 30.9802 16.0562 30.5977 19.8364 28.7905C20.224 28.8255 20.6141 28.8432 21.0001 28.8432C23.9085 28.8432 26.6501 27.882 28.7199 26.1365C30.835 24.3526 32 21.9679 32 19.4216C32 16.8752 30.835 14.4905 28.7199 12.7067ZM15.3877 20.5C14.4517 20.5 13.6901 19.7594 13.6901 18.849C13.6901 17.9387 14.4517 17.198 15.3877 17.198C16.3238 17.198 17.0853 17.9387 17.0853 18.849C17.0853 19.7594 16.3238 20.5 15.3877 20.5ZM21 20.5C20.064 20.5 19.3024 19.7594 19.3024 18.849C19.3024 17.9387 20.064 17.198 21 17.198C21.936 17.198 22.6976 17.9387 22.6976 18.849C22.6976 19.7594 21.936 20.5 21 20.5ZM26.6123 20.5C25.6762 20.5 24.9147 19.7594 24.9147 18.849C24.9147 17.9387 25.6762 17.198 26.6123 17.198C27.5483 17.198 28.3099 17.9387 28.3099 18.849C28.3099 19.7594 27.5483 20.5 26.6123 20.5Z"
              fill="#DE3720"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_75_757"
              x="0"
              y="0"
              width="42"
              height="41"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.870833 0 0 0 0 0.214341 0 0 0 0 0.12482 0 0 0 0.4 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_75_757"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_75_757"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
      <Deposite :deposite.sync="$root.deposite" />
      <Sessions :sessions.sync="$root.sessions" />
      <Options :options.sync="$root.options" />
      <Rules />
      <Ref />
      <!-- <Fair :modal.sync="$root.fair" /> -->
      <notifications :max="5" :ignoreDuplicates="true" classes="notif" />
      <Trade :trade.sync="trade" :tradeID="tradeID" />
      <WinItem />
    </div>
    <Tech v-else />
  </transition>
</template>


<script>
import { mapActions } from "vuex";
import Chat from "@/components/chat/Chat";
import Tech from "@/components/tech/Tech";
import Navbar from "@/components/navbar/Navbar";
import Trade from "@/components/modals/DepositeCreated";
import Rules from "@/components/modals/Rules";
import Ref from "@/components/modals/Ref";
import Profile from "@/components/profile/Profile";
import Deposite from "@/components/modals/Deposite";
import WinItem from "@/components/modals/WinItem";
import Sessions from "@/components/modals/Sessions";
import Options from "@/components/modals/Options";

export default {
  components: {
    Chat,
    Rules,
    Trade,
    Tech,
    Ref,
    Navbar,
    Profile,
    Deposite,
    Sessions,
    Options,
    WinItem,
  },
  data() {
    return {
      tradeID: null,
      trade: false,
    };
  },
  sockets: {
    steamTradeCreated(mess) {
      this.tradeID = mess[0];
      this.trade = true;
    },
  },
  methods: {
    ...mapActions({
      getInventory: "getInventory",
    }),
  },
};
</script>


<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease-in;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
body {
  background: url(/img/main.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  &::-webkit-scrollbar {
    width: 5px;
    margin-right: 20px;
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
}
#app {
  background-size: cover;
  background-position: center center;
  height: 100vh;
  padding: 10px;
}

.wrapper {
  width: calc(100% - 490px);
  margin-left: 120px;
  margin-right: 20px;
  height: 100%;
  transition: all 300ms;
  &.chat-hidden {
    width: calc(100% - 180px);
  }
}

.sidebar {
  width: 350px;
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 999;
  height: 50px;
  transition: all 300ms;
  &.chat-hidden {
    height: 50px;
    width: 50px;
  }
}
.chat-open {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  background: #232323;
  border-radius: 5px;
  cursor: pointer;
  transition: all 300ms;

  &:hover {
    opacity: 0.8;
  }
}

@media screen and (max-width: 1200px) {
  #app.chat-hidden {
    overflow: hidden;
    height: 100vh;
  }
  .sidebar {
    width: 100%;
    position: fixed;
    height: inherit;
    transition: all 300ms;
    right: 0px;
    padding: 10px;
    padding-left: 10px;
    top: 0px;
    background: #202020;

    &.chat-hidden {
      width: 50px;
      right: 10px;
      top: 10px;
      padding: 0;
      background: transparent;

      .chat {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 900px) {
  #app {
    background-size: cover;
    background-position: center center;
    height: unset;
    padding: 10px;
  }
  .wrapper {
    width: calc(100% - 290px);
    margin-left: 0px;
    margin-right: 10px;
    margin-top: 60px;
    height: calc(100% - 120px);
    transition: all 300ms;
    &.chat-hidden {
      width: 100%;
    }
  }

  .chat-open {
    z-index: 100;
    bottom: 12px;
    right: 10px;
  }

  .sidebar {
    z-index: 101;
    position: absolute;
    width: 100%;

    &.chat-hidden {
      width: calc(100% - 20px);
      right: unset;
      left: 10px;
    }
  }
}
</style>
