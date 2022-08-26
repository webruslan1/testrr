<template>
  <div class="support" v-if="$root.user && loading == false">
    <SupportInfo />
    <div class="support-content">
      <router-link to="/tickets" class="support-header">
        <svg
          width="17"
          height="15"
          style="margin-right: 12px"
          viewBox="0 0 17 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.563 14.3442C6.51921 14.3122 6.47759 14.2772 6.43848 14.2396L0.356773 8.15784C-0.118551 7.68309 -0.118969 6.91296 0.355784 6.43771C0.356089 6.43741 0.356431 6.43706 0.356735 6.43676L6.43844 0.355054C6.91411 -0.119281 7.68424 -0.118216 8.15861 0.357449C8.19594 0.39489 8.2308 0.434725 8.26295 0.476688C8.60395 0.985309 8.52952 1.66551 8.08658 2.08834L4.72948 5.45761C4.55102 5.63626 4.34584 5.78606 4.12131 5.90157L3.75641 6.06578L15.7009 6.06578C16.3222 6.0427 16.8674 6.47675 16.9841 7.0875C17.0916 7.7506 16.6413 8.37534 15.9782 8.48287C15.9086 8.49416 15.8382 8.49937 15.7678 8.49846L3.77465 8.49846L4.03617 8.62009C4.29179 8.74108 4.52434 8.90574 4.7234 9.10663L8.08658 12.4698C8.52952 12.8926 8.60395 13.5728 8.26295 14.0815C7.86608 14.6235 7.105 14.7411 6.563 14.3442Z"
            fill="white"
          />
        </svg>
        {{ $t("content.support.goTick") }}
      </router-link>
      <div class="support-body">
        <div class="chat" v-if="data">
          <div class="chat-title">
            {{ $t("content.support.yourTicket") }} - {{ data.subject }}
          </div>
          <div class="chat-list" :class="{ 'close-list': data.status === 1 }">
            <div
              class="chat-list__item"
              :class="{ moderator: item.user.isMe === false }"
              v-for="item in mess"
              :key="item.id"
            >
              <div class="chat-list__item-avatar">
                <img
                  :src="
                    'https://avatars.akamai.steamstatic.com/' +
                    item.user.avatar +
                    '_medium.jpg'
                  "
                  alt=""
                />
                <div class="chat-list__item-avatar--name">
                  {{ item.user.userName }}
                </div>
              </div>
              <div class="chat-list__item-content" v-html="item.message"></div>
            </div>
          </div>
          <div class="chat-form" v-if="data.status === 0">
            <textarea
              v-model="message"
              :placeholder="$t('content.support.sendMess')"
            ></textarea>
          </div>
          <div class="chat-footer" v-if="data.status === 0">
            <div class="chat-footer__send" @click="sendNewMessage">
              {{ $t("content.support.send") }}
            </div>
            <div class="chat-footer__close" @click="closeTicket">
              {{ $t("content.support.closeTicket") }}
            </div>
            <div class="chat-footer__night">
              <svg
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.60601 17.3587C9.66869 19.0769 15.0358 17.1975 16.7442 13.4518C14.0032 15.4436 11.1144 15.792 8.18002 13.982C5.5973 12.389 4.37422 9.93197 4.75246 6.94523C5.23378 3.14435 7.63801 1.03718 11.3866 0.355287C7.91269 -0.742243 2.61435 0.600778 0.583923 5.81995C-0.985111 9.85381 0.581263 15.2334 5.60601 17.3587Z"
                  fill="#1f1f1f"
                />
                <path
                  d="M10.8804 3.82818L12.0484 4.95907L11.7792 6.61005C11.738 6.86329 11.8957 6.98658 12.1315 6.88539L13.5781 6.26485L15.0247 6.88539C15.2606 6.98658 15.4095 6.8649 15.3576 6.61353L15.015 4.95898L16.2664 3.8179C16.456 3.64505 16.4051 3.46751 16.1526 3.42143L14.5726 3.13309L13.8 1.71062C13.6775 1.48513 13.479 1.48513 13.3565 1.71062L12.5839 3.13309L11.0037 3.42157C10.7513 3.46758 10.6961 3.64955 10.8804 3.82818Z"
                  fill="#1f1f1f"
                />
                <path
                  d="M13.4262 10.6238L12.2891 10.4164L11.733 9.39267C11.6448 9.23044 11.502 9.23044 11.4138 9.39267L10.8578 10.4164L9.72082 10.6238C9.53914 10.6569 9.49947 10.7879 9.63211 10.9165L10.4727 11.7303L10.2789 12.9184C10.2492 13.1007 10.3627 13.1894 10.5325 13.1166L11.5734 12.6701L12.6144 13.1166C12.7842 13.1894 12.8914 13.1019 12.8539 12.921L12.6073 11.7303L13.5079 10.9092C13.6446 10.7846 13.6078 10.6569 13.4262 10.6238Z"
                  fill="#1f1f1f"
                />
              </svg>
              <span>{{ $t("content.support.night") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Loader v-else-if="$root.user && loading == true" />
</template>

<script>
import SupportInfo from "@/components/support-info/SupportInfo";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    SupportInfo,
  },
  data() {
    return {
      data: null,
      mess: null,
      message: "",
      loading: true,
    };
  },
  computed: {
    ...mapState({ support: "support" }),
  },
  async created() {
    if (this.$root.user == null) {
      this.$router.push("/");
    } else {
      if (this.support === null) {
        this.getSupport();
      }
      if (this.$route.params.id !== undefined) {
        await this.$root
          .request("GET", "/api/support/ticket/" + this.$route.params.id)
          .then((resp) => {
            this.data = resp;
          });

        await this.$root
          .request(
            "GET",
            `/api/support/ticket/${this.$route.params.id}/message`
          )
          .then((resp) => {
            this.mess = resp;
          });

        if (this.data.answerCount !== 0) {
          await this.$root
            .request(
              "POST",
              `/api/support/ticket/${this.$route.params.id}/read`
            )
            .then(() => {
              this.getTickets();
            });
        }
      }
      this.loading = false;
    }
  },
  methods: {
    ...mapActions({ getSupport: "getSupport", getTickets: "getTickets" }),
    async sendNewMessage() {
      if (
        this.message.length >= this.$root.settings.support.messageMinLength &&
        this.message.length <= this.$root.settings.support.messageMaxLength
      ) {
        await this.$root
          .request("POST", `/api/support/ticket/${this.data.id}/message`, {
            message: this.message,
          })
          .then(() => {
            this.$root
              .request(
                "GET",
                `/api/support/ticket/${this.$route.params.id}/message`
              )
              .then((resp) => {
                this.mess = resp;
              });
          });
      } else {
        this.$root.showNotify(
          "error",
          this.$t("chat.length", {
            0: this.$root.settings.support.messageMinLength,
            1: this.$root.settings.support.messageMaxLength,
          })
        );
      }
    },
    async closeTicket() {
      await this.$root
        .request("POST", `/api/support/ticket/${this.data.id}/close`)
        .then(async () => {
          await this.getTickets();
          this.$router.push("/tickets");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.support {
  height: 100%;
  display: flex;

  &-content {
    flex: 1;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    overflow: hidden;
  }
  &-header {
    background: rgba(48, 48, 48, 0.8);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    padding: 14px 33px;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    color: #ffffff;
    display: flex;
    align-items: center;
  }
  &-body {
    padding: 30px 20px 20px 20px;
  }
}

.chat {
  &-title {
    font-size: 16px;
    line-height: 18px;
    padding: 0 20px 20px 20px;
    border-bottom: 1px solid #eee;
    font-weight: 600;
    color: #eee;
  }

  &-list {
    padding: 10px 20px;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    height: calc(100vh - 400px);
    &.close-list {
      height: calc(100vh - 170px);
    }
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

    &__item {
      width: 70%;
      padding: 10px 15px;
      border-radius: 5px;
      background: rgba(48, 48, 48, 0.8);

      &.moderator {
        margin-left: auto;
        .chat-list__item-avatar {
          img {
            order: 2;
          }

          &--name {
            text-align: right;
            order: 1;
          }
        }

        .chat-list__item-content {
          text-align: right;
        }
      }
      &-avatar {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 5px;
        img {
          border-radius: 5px;
          width: 30px;
          height: 30px;
        }

        &--name {
          display: inline-block;
          font-size: 14px;
          line-height: 16px;
          color: #fff;
          width: 100%;
        }
      }

      &-content {
        font-size: 13px;
        line-height: 15px;
        word-break: break-all;
      }
    }
  }

  &-form {
    margin-bottom: 20px;
    textarea {
      width: 100%;
      height: 150px;
      background: #1f1f1f;
      border: none;
      outline: none;
      padding: 10px;
      border-radius: 10px;
      font-size: 14px;
      line-height: 16px;
      resize: none;
      &::placeholder {
        font-size: 14px;
        line-height: 16px;
      }
    }
  }

  &-footer {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    &__send {
      background: #4bdb12;
      border-radius: 10px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
      cursor: pointer;
      transition: all 300ms;
      padding: 0 20px;
      &:hover {
        background: #000000;
        color: #de3720;
      }
    }

    &__close {
      background: #de3720;
      border-radius: 10px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
      cursor: pointer;
      transition: all 300ms;
      padding: 0 20px;
      &:hover {
        background: #000000;
        color: #de3720;
      }
    }

    &__night {
      margin-left: auto;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 0 10px;
      background: rgb(184, 182, 182);
      border-radius: 10px;

      span {
        color: #000;
        font-size: 12px;
        line-height: 14px;
        font-weight: 500;
      }
    }
  }
}

@media screen and (max-width: 1500px) {
  .chat {
    &-list {
      height: calc(100vh - 450px);
      &__item {
        width: 100%;
      }
    }

    &-footer {
      &__send,
      &__close {
        width: 47%;
      }

      &__close {
        margin-left: auto;
      }
      &__night {
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 1300px) {
  .ticket-list__item {
    width: 100%;
  }
}

@media screen and (max-width: 900px) {
  .support {
    flex-direction: column;

    &-header {
      padding: 10px 10px 0 23px;
      background: unset;
    }

    &-body {
      padding: 20px 10px;
    }

    &-content {
      margin-bottom: 70px;
    }
  }

  .chat-list {
    padding: 0;

    &.close-list {
      height: calc(100vh - 300px);
    }
  }
  .chat-title {
    font-size: 14px;
    line-height: 16px;
    padding: 0 5px 10px 5px;
  }
}
</style>