<template>
  <div class="support-info">
    <div class="support-info__header">
      <div class="support-info__header-title">{{$t('content.support.title')}}</div>
      <router-link to="/profile" class="support-info__header-btn">
        <svg
          width="27"
          height="25"
          viewBox="0 0 27 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.563 19.3442C11.5192 19.3122 11.4776 19.2772 11.4385 19.2396L5.35677 13.1578C4.88145 12.6831 4.88103 11.913 5.35578 11.4377C5.35609 11.4374 5.35643 11.4371 5.35673 11.4368L11.4384 5.35505C11.9141 4.88072 12.6842 4.88178 13.1586 5.35745C13.1959 5.39489 13.2308 5.43472 13.263 5.47669C13.6039 5.98531 13.5295 6.66551 13.0866 7.08834L9.72948 10.4576C9.55102 10.6363 9.34584 10.7861 9.12131 10.9016L8.75641 11.0658L20.7009 11.0658C21.3222 11.0427 21.8674 11.4767 21.9841 12.0875C22.0916 12.7506 21.6413 13.3753 20.9782 13.4829C20.9086 13.4942 20.8382 13.4994 20.7678 13.4985L8.77465 13.4985L9.03617 13.6201C9.29179 13.7411 9.52434 13.9057 9.7234 14.1066L13.0866 17.4698C13.5295 17.8926 13.6039 18.5728 13.263 19.0815C12.8661 19.6235 12.105 19.7411 11.563 19.3442Z"
            fill="#DE3720"
          />
        </svg>
        <span>{{$t('content.support.back')}}</span>
      </router-link>
    </div>
    <div class="support-info__list" v-if="support">
      <router-link
        v-for="item in support.folder"
        :key="item.id"
        :to="'/support/' + item.id"
        :class="{ active: $route.path === '/support/' + item.id }"
        class="support-info__list-item"
      >
        <div class="support-info__list-item--icon">
          <img :src="'/img/support/' + item.icon + '.svg'" alt="">
        </div>
        <div class="support-info__list-item--title">
          {{ item.data[$root.language][1] }}
        </div>
      </router-link>
    </div>
    <div class="support-info__divider"></div>
    <router-link to="/create-ticket/7" class="support-info__create-btn"
      >{{$t('content.support.createTicket')}}</router-link
    >
    <router-link to="/tickets" class="support-info__have btn-tr">
      {{$t('content.support.yourTicket')}} <span v-if="count !== 0"> - {{ count }} {{$t('content.support.answer')}}</span>
      <div class="support-info__have-point" v-if="count !== 0">{{ count }}</div>
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    ...mapState({ support: "support", tickets: "tickets" }),
  },
  async created() {
    if (this.tickets === null) {
      await this.getTickets();
    }
    this.tickets.forEach((element) => {
      this.count = this.count + element.answerCount;
    });
  },
  methods: {
    ...mapActions({ getTickets: "getTickets" }),
  },
};
</script>

<style lang="scss" scoped>
.support-info {
  background: rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  width: 300px;
  margin-top: 0 !important;
  margin-right: 20px;
  overflow: hidden;
  &__header {
    display: flex;
    background: rgba(48, 48, 48, 0.8);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    padding: 9px 11px 11px 33px;
    align-items: center;
    &-title {
      font-weight: bold;
      font-size: 18px;
      line-height: 22px;
      color: #ffffff;
    }

    &-btn {
      padding: 8px 20px 7px 12px;
      background: linear-gradient(
          90deg,
          rgba(222, 55, 32, 0.2) 0%,
          rgba(0, 0, 0, 0) 40.73%
        ),
        #181818;
      border-radius: 10px;
      width: 129px;
      height: 30px;
      display: flex;
      align-items: center;
      margin-left: auto;
      transition: all 300ms;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
      span {
        text-transform: uppercase;
        font-weight: normal;
        font-size: 12px;
        line-height: 14px;
        color: #ffffff;
        margin-left: auto;
        margin-bottom: 1px;
      }
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding: 20px 22px;
    &-item {
      display: flex;
      height: 39px;
      background: #1f1f1f;
      border-radius: 30px;
      overflow: hidden;
      cursor: pointer;

      &.active,
      &:hover {
        .support-info__list-item--icon {
          background: #de362000;
          box-shadow: 0px 0px 5px rgba(222, 55, 32, 0.5),
            inset 0px 0px 8px 1px #ffffff8a;

          svg path {
            fill: #282828;
          }
        }

        .support-info__list-item--title {
          background: linear-gradient(90deg, #282828 0%, #575757 108.06%);
        }
      }
      &--icon {
        width: 39px;
        height: 39px;
        background: #282828;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 300ms;
        border-radius: 20px 0px 0px 20px;
      }

      &--title {
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #7b7b7b;
        display: flex;
        align-items: center;
        padding-left: 15px;
        letter-spacing: -0.04em;
        flex: 1;
        transition: all 300ms;
      }
    }
  }

  &__divider {
    background: #2d2d2d;
    border-radius: 5px;
    height: 2px;
    margin: 9px 25px;
  }

  &__create-btn {
    background: #de3720;
    border-radius: 10px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 25px 10px;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    cursor: pointer;
    transition: all 300ms;
    &:hover {
      background: #000000;
      color: #de3720;
    }
  }

  &__have {
    background: #1f1f1f;
    border-radius: 10px;
    margin: 0 25px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    cursor: pointer;
    transition: all 300ms;
    position: relative;
    span {
      font-weight: 500;
      font-size: 12px;
      line-height: 14px;
      color: #7b7b7b;
      margin-left: 5px;
    }

    &-point {
      width: 14px;
      height: 14px;
      background: #de3720;
      position: absolute;
      top: -6px;
      right: -7px;
      border-radius: 100px;
      font-weight: bold;
      font-size: 9px;
      line-height: 11px;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

@media screen and (max-width: 900px) {
  .support-info {
    width: 100%;
    margin-bottom: 10px;
    padding-bottom: 10px;

    &__header {
      padding: 14px 0px 0px 33px;
      background: transparent;
      font-size: 18px;
      line-height: 22px;
    }

    &__list {
      padding: 17px 10px;
    }
  }
}
</style>