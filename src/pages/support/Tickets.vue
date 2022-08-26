<template>
  <div class="support" v-if="$root.user && loading == false">
    <SupportInfo />
    <div class="support-content">
      <router-link to="/support/1" class="support-header">
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
        {{ $t("content.support.goQuest") }}
      </router-link>
      <div class="support-body">
        <div class="ticket-wrapper">
          <div class="ticket" v-if="open !== null">
            <span class="ticket-title open">{{
              $t("content.support.activeTickets")
            }}</span>
            <div class="ticket-list">
              <router-link
                :to="'/tickets/' + item.id"
                class="ticket-list__item btn-tr"
                v-for="item in open"
                :key="item.id"
              >
                <div class="ticket-list__item-title">
                  <span class="ticket-list__item-title--name">{{
                    item.subject
                  }}</span>
                  <span
                    class="ticket-list__item-title--answer"
                    v-if="item.answerCount > 0"
                  >
                    - {{ item.answerCount }}
                    {{ $t("content.support.answer") }}</span
                  >
                </div>
                <!-- <div class="ticket-list__item-text">
                Здравствуйте, Пользователь...
              </div> -->
              </router-link>
            </div>
          </div>
          <div class="ticket" v-if="close !== null">
            <span class="ticket-title closed">{{
              $t("content.support.closeTickets")
            }}</span>
            <div class="ticket-list">
              <router-link
                :to="'/tickets/' + item.id"
                class="ticket-list__item btn-tr"
                v-for="item in close"
                :key="item.id"
              >
                <div class="ticket-list__item-title">
                  <span class="ticket-list__item-title--name">{{
                    item.subject
                  }}</span>
                  <span
                    class="ticket-list__item-title--answer"
                    v-if="item.answerCount > 0"
                  >
                    - {{ item.answerCount }}
                    {{ $t("content.support.answer") }}</span
                  >
                </div>
                <!-- <div class="ticket-list__item-text">
                Здравствуйте, Пользователь...
              </div> -->
              </router-link>
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
      open: null,
      close: null,
      loading: true,
    };
  },
  computed: {
    ...mapState({ support: "support", tickets: "tickets" }),
  },
  async created() {
    if (this.$root.user == null) {
      this.$router.push("/");
    } else {
      if (this.support === null) {
        await this.getSupport();
      }
      if (this.tickets === null) {
        await this.getTickets();
      }
      this.open = this.tickets.filter((item) => item.status === 0);
      this.close = this.tickets.filter((item) => item.status === 1);
      this.loading = false;
    }
  },
  methods: {
    ...mapActions({ getSupport: "getSupport", getTickets: "getTickets" }),
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

.ticket-wrapper {
  overflow-y: auto;
  height: calc(100vh - 120px);
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

.ticket {
  margin-bottom: 17px;
  &-title {
    display: inline-block;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    margin-left: 29px;
    margin-bottom: 18px;
    position: relative;
    &.open {
      &::after {
        background: #33ff00;
        box-shadow: 0px 0px 4px #2ee66d;
      }
    }
    &.closed {
      &::after {
        background: #f91d1d;
        box-shadow: 0px 0px 4px rgba(255, 0, 0, 0.25);
      }
    }
    &::after {
      content: "";
      width: 100%;
      position: absolute;
      bottom: -2px;
      left: 0;
      height: 1px;

      border-radius: 1px;
    }
  }

  &-list {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    &__item {
      width: 350px;
      background: #2b2b2b;
      border-radius: 5px;
      padding: 8px 10px 10px 13px;

      &-title {
        margin-bottom: 6px;
        display: flex;
        align-items: center;
        &--name {
          font-weight: 600;
          font-size: 12px;
          line-height: 14px;
          color: #ffffff;
        }

        &--answer {
          font-weight: normal;
          font-size: 10px;
          line-height: 12px;
          color: #de3720;
          margin-left: 6px;
        }
      }

      &-text {
        font-weight: normal;
        font-size: 10px;
        line-height: 12px;
        color: #7b7b7b;
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
}
</style>