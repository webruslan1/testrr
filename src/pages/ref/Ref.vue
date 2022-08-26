<template>
  <div v-if="$root.user && loading == false"  class="profile">
    <ProfileInfo />
    <div class="profile-content">
      <div class="profile-header">{{$t('content.refs.title')}}</div>
      <div class="profile-body" v-if="data">
        <div class="ref">
          <div class="ref-top">
            <div class="ref-gain">
              <div class="ref-gain__content" v-if="gainTab === 'week'">
                <h3>{{$t('content.refs.getWeek')}}</h3>
                <span class="sosiska-wrap">{{ $root.conv(data.weekEarn).toFixed(2) }} <Sosiska /></span>
              </div>
              <div class="ref-gain__content" v-if="gainTab === 'month'">
                <h3>{{$t('content.refs.getMonth')}}</h3>
                <span class="sosiska-wrap">{{ $root.conv(data.monthEarn).toFixed(2) }} <Sosiska /></span>
              </div>
              <div class="ref-gain__content" v-if="gainTab === 'all'">
                <h3>{{$t('content.refs.getAll')}}</h3>
                <span class="sosiska-wrap">{{ $root.conv(data.totalEarn).toFixed(2) }} <Sosiska /></span>
              </div>

              <div class="ref-gain__tabs">
                <div
                  :class="{ active: gainTab === 'week' }"
                  @click="gainTab = 'week'"
                  class="ref-gain__tabs-item"
                >
                  {{$t('content.refs.week')}}
                </div>
                <div
                  :class="{ active: gainTab === 'month' }"
                  @click="gainTab = 'month'"
                  class="ref-gain__tabs-item"
                >
                  {{$t('content.refs.month')}}
                </div>
                <div
                  :class="{ active: gainTab === 'all' }"
                  @click="gainTab = 'all'"
                  class="ref-gain__tabs-item"
                >
                  {{$t('content.refs.all')}}
                </div>
              </div>
            </div>
            <div class="ref-reflink">
              <div class="ref-reflink__title">{{$t('content.refs.refLink')}}</div>
              <RefCode
                v-for="(item, idx) in data.codes"
                :data="item"
                :key="idx"
              />
            </div>
            <AffCode v-if="data.canSetAffiliate === true" />
          </div>
          <div class="divider"></div>
          <div class="ref-bottom">
            <div class="ref-stats">
              <div class="ref-stats__title">{{$t('content.refs.yourLvl')}}</div>
              <div class="ref-stats__lvl">
                <svg
                  width="150"
                  height="150"
                  viewBox="0 0 150 150"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="75"
                    cy="75"
                    r="69"
                    fill="#1F1F1F"
                    stroke="#2E2E2E"
                    stroke-width="12"
                  />
                  <circle cx="75" cy="75" r="63" fill="#191919" />
                  <circle
                    cx="75"
                    cy="75"
                    r="63"
                    fill="url(#paint0_linear_181:3)"
                  />
                  <ellipse
                    cx="75"
                    cy="69"
                    rx="61"
                    ry="63"
                    fill="url(#paint1_linear_181:3)"
                    style="mix-blend-mode: overlay"
                  />
                  <ellipse
                    cx="75"
                    cy="100"
                    rx="39"
                    ry="26"
                    fill="url(#paint2_linear_181:3)"
                    style="mix-blend-mode: overlay"
                  />
                  <circle
                    :stroke-dasharray="dashArr"
                    :stroke-dashoffset="dashOff"
                    id="st0"
                    cy="75"
                    cx="75"
                    r="69"
                    fill="transparent"
                    stroke="#DE3720"
                    stroke-width="12"
                    ref="st0"
                  ></circle>
                  <defs>
                    <linearGradient
                      id="paint0_linear_181:3"
                      x1="75"
                      y1="216"
                      x2="75"
                      y2="12"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#DE3720" />
                      <stop offset="1" stop-color="#191919" stop-opacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_181:3"
                      x1="75"
                      y1="210"
                      x2="75"
                      y2="5.99997"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="white" />
                      <stop offset="1" stop-color="#B8B8B8" stop-opacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_181:3"
                      x1="75"
                      y1="140.238"
                      x2="75"
                      y2="105"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="white" />
                      <stop offset="1" stop-color="#B8B8B8" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div class="ref-stats__lvl-num">
                  <span>{{ data.level }}</span>
                  <span>{{$t('content.refs.lvl')}}</span>
                </div>
              </div>
              <div class="ref-stats__progress sosiska-wrap" style="margin: 0 auto; justify-content:center" v-if="data.nextLevel !== null">
                {{ $root.conv(data.totalEarn).toFixed(2) }} <Sosiska />
                <span class="sosiska-wrap">/ {{ $root.conv(data.nextLvl) }} <Sosiska /></span>
              </div>
              <div
                class="ref-stats__subprogress"
                v-if="data.nextLevel !== null"
              >
                {{$t('content.refs.beforeLvl')}} {{ data.level + 1 }}
              </div>
              <div
                class="ref-stats__subprogress"
                v-if="data.nextLevel === null"
              >
                {{$t('content.refs.maxLvl')}}
              </div>
            </div>
            <div class="ref-info">
              <div class="ref-info__invited">
                <div class="ref-info__invited-icon">
                  <svg
                    width="54"
                    height="38"
                    viewBox="8 8 54 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M36.7983 21.6362C40.4128 20.7818 42.6503 17.1591 41.7959 13.5446C40.9415 9.93012 37.3187 7.69263 33.7043 8.54703C30.0898 9.40143 27.8523 13.0242 28.7067 16.6387C29.5611 20.2531 33.1838 22.4906 36.7983 21.6362Z"
                      fill="#DE3720"
                    />
                    <path
                      d="M48.5785 35.1677C48.5785 29.4658 44.9807 24.5925 39.9438 22.6845C38.5811 23.524 36.9785 24.0147 35.2559 24.0147C33.5333 24.0147 31.9306 23.535 30.5679 22.6845C25.5201 24.5925 21.9224 29.4658 21.9224 35.1677C21.9224 35.7673 22.4129 36.258 23.0126 36.258H47.4882C48.0988 36.258 48.5785 35.7673 48.5785 35.1677Z"
                      fill="#DE3720"
                    />
                    <path
                      d="M51.7011 24.3538C54.6512 24.3538 57.0428 21.9622 57.0428 19.0121C57.0428 16.062 54.6512 13.6704 51.7011 13.6704C48.7509 13.6704 46.3594 16.062 46.3594 19.0121C46.3594 21.9622 48.7509 24.3538 51.7011 24.3538Z"
                      fill="#DE3720"
                    />
                    <path
                      d="M18.8056 24.3538C21.7557 24.3538 24.1473 21.9622 24.1473 19.0121C24.1473 16.062 21.7557 13.6704 18.8056 13.6704C15.8554 13.6704 13.4639 16.062 13.4639 19.0121C13.4639 21.9622 15.8554 24.3538 18.8056 24.3538Z"
                      fill="#DE3720"
                    />
                    <path
                      d="M19.7418 35.1676C19.7418 31.4391 21.0609 28.0157 23.2633 25.3338C23.1869 25.2902 23.1215 25.2575 23.0452 25.2247C21.835 26.0533 20.3851 26.5331 18.8042 26.5331C17.2343 26.5331 15.7734 26.0533 14.5741 25.2247C10.7147 26.871 8 30.7086 8 35.1567C8 35.7672 8.47972 36.247 9.09029 36.247H19.938C19.8073 35.909 19.7418 35.5493 19.7418 35.1676Z"
                      fill="#DE3720"
                    />
                    <path
                      d="M55.9373 25.2247C54.7272 26.0533 53.2663 26.5331 51.6964 26.5331C50.1264 26.5331 48.6765 26.0533 47.4663 25.2247C47.39 25.2575 47.3136 25.2902 47.2373 25.3338C49.4287 28.0157 50.7587 31.4391 50.7587 35.1676C50.7587 35.5493 50.6934 35.909 50.5625 36.247H61.4212C62.0208 36.247 62.5115 35.7672 62.5115 35.1567C62.5115 30.7086 59.7969 26.871 55.9373 25.2247Z"
                      fill="#DE3720"
                    />
                  </svg>
                </div>
                <div class="ref-info__invited-value">{{ data.invited }}</div>
                <div class="ref-info__invited-title">{{$t('content.refs.invited')}}</div>
              </div>
              <div class="ref-info__bonus">
                <div class="ref-info__bonus-icon">
                  <svg
                    width="38"
                    height="38"
                    viewBox="8 8 38 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.4141 30.4141H9.11328C8.49793 30.4141 8 30.912 8 31.5273V44.8867C8 45.5021 8.49793 46 9.11328 46H11.4141C13.2557 46 14.7539 44.5018 14.7539 42.6602V33.7539C14.7539 31.9122 13.2557 30.4141 11.4141 30.4141Z"
                      fill="#DE3720"
                    />
                    <path
                      d="M33.7539 8C27.0073 8 21.5078 13.4995 21.5078 20.2461C21.5078 23.1852 22.5542 25.8792 24.291 27.9945C25.6937 28.3952 27.0073 29.1077 28.1206 30.0875C28.33 30.2445 28.4482 30.2427 28.6773 30.2656H32.6406C34.177 30.2656 35.5352 31.0226 36.3145 32.225C41.8363 31.0448 46 26.1242 46 20.2461C46 13.4995 40.5005 8 33.7539 8ZM34.8895 25.612H34.8672V26.9258C34.8672 27.5491 34.3774 28.0391 33.7539 28.0391C33.1304 28.0391 32.6406 27.5491 32.6406 26.9258V25.612C31.9059 25.3671 31.2156 24.8995 30.6145 24.1648C30.2137 23.6972 30.2805 23.007 30.7481 22.6063C31.2156 22.2055 31.9281 22.2723 32.3066 22.7398C32.9079 23.4523 33.5758 23.7195 34.1324 23.5191C34.5777 23.3632 34.8672 22.9402 34.8672 22.4727C34.8672 21.8491 34.3774 21.3594 33.7539 21.3594C31.9059 21.3594 30.4141 19.8675 30.4141 18.0195C30.4141 16.6835 31.2156 15.4589 32.4625 14.9469C32.5071 14.9246 32.5738 14.9246 32.6406 14.9023V13.5664C32.6406 12.9429 33.1304 12.4531 33.7539 12.4531C34.3774 12.4531 34.8672 12.9429 34.8672 13.5664V14.9023C35.4461 15.1027 36.0027 15.3922 36.5148 15.882C36.9602 16.305 36.9602 17.0175 36.5371 17.4629C36.1141 17.9083 35.4016 17.9082 34.9562 17.4852C34.4218 16.973 33.8208 16.7727 33.3309 16.9952C32.9078 17.1734 32.6406 17.5742 32.6406 18.0195C32.6406 18.6429 33.1304 19.1328 33.7539 19.1328C35.602 19.1328 37.0938 20.6246 37.0938 22.4727C37.0938 23.8754 36.203 25.1223 34.8895 25.612Z"
                      fill="#DE3720"
                    />
                    <path
                      d="M45.666 32.5737C45.5324 32.3511 45.3544 32.1729 45.1539 32.0171C44.3342 31.2999 42.953 31.3677 42.1481 32.2398L37.0938 38.0734L36.9379 38.2514C36.3145 38.9416 35.4238 39.3202 34.4887 39.3202H25.7754C25.1519 39.3202 24.6621 38.8303 24.6621 38.2069C24.6621 37.5834 25.1519 37.0936 25.7754 37.0936H32.6406C33.8652 37.0936 34.8672 36.0917 34.8672 34.8671V34.8448C34.8449 33.6202 33.8652 32.6405 32.6406 32.6405H28.5363C27.8687 32.6405 27.1531 32.3954 26.577 31.9058C23.8606 29.5233 19.8973 29.3674 16.9805 31.3937V45.087C19.1848 45.6882 21.4559 46 23.7491 46H33.7539C36.2031 46 38.5188 44.8421 39.9883 42.8827L45.3321 35.7577C46.1118 34.7343 46.1706 33.3308 45.666 32.5737Z"
                      fill="#DE3720"
                    />
                  </svg>
                </div>
                <div class="ref-info__bonus-value sosiska-wrap">
                  {{
                    $root
                      .conv($root.settings.bonus.referral.affiliate.balance.sum)
                      .toFixed(2)
                  }} <Sosiska />
                </div>
                <div class="ref-info__bonus-title">{{$t('content.refs.bonusFriend')}}</div>
              </div>
              <div class="ref-info__balance">
                <div class="ref-info__balance-title">{{$t('content.refs.bonusBalance')}}</div>
                <div class="ref-info__balance-form">
                  <div class="ref-info__balance-form--icon">
                    <svg
                      width="37"
                      height="30"
                      viewBox="0 0 37 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.774 5.74441L25.456 0.131541C27.5716 -0.416211 29.7454 0.796762 30.3109 2.83966L31.1157 5.74058H33.0357C35.2253 5.74058 37 7.45534 37 9.57102V13.4014H25.1071C24.4068 13.4014 23.7342 13.6709 23.2386 14.1497C22.7431 14.6285 22.4643 15.2784 22.4643 15.9551V19.7855C22.4643 20.4622 22.7431 21.1121 23.2386 21.5909C23.7342 22.0697 24.4068 22.3391 25.1071 22.3391H37V26.1696C37 28.2852 35.2253 30 33.0357 30C26.636 30 10.364 30 3.96429 30C1.77468 30 0 28.2852 0 26.1696C0 21.9931 0 13.7475 0 9.57102C0 7.5179 1.67293 5.84145 3.774 5.74441ZM37 15.9551V19.7855H25.1071V15.9551H37ZM28.3803 5.74058L27.7592 3.50106C27.5703 2.81924 26.8448 2.41577 26.1405 2.59835L14.0019 5.74058H28.3803Z"
                        fill="#DE3720"
                      />
                    </svg>
                  </div>
                  <div class="ref-info__balance-form--wrapper">
                    <div class="ref-info__balance-form--price sosiska-wrap">
                      {{ $root.conv(data.balance).toFixed(2) }} <Sosiska />
                    </div>
                    <button
                      class="ref-info__balance-form--btn btn-tr"
                      @click="withdraw"
                      :disabled="
                        data.balance <
                        this.$root.settings.referral.affiliateMinWithdraw
                      "
                    >
                      {{$t('content.refs.with')}}
                    </button>
                  </div>
                </div>
                <div class="ref-info__balance-subform">
                  {{$t('content.refs.minWithBal')}} -
                  {{
                    $root.conv($root.settings.referral.affiliateMinWithdraw)
                  }};
                </div>
              </div>
            </div>
            <div class="ref-table">
              <div class="ref-table__title">{{$t('content.refs.sysLvl')}}</div>
              <div class="ref-table__head">
                <div class="ref-table__head--td">{{$t('content.refs.lvl')}}</div>
                <div class="ref-table__head--td">{{$t('content.refs.deposits')}}</div>
                <div class="ref-table__head--td">{{$t('content.refs.yourBonus')}}</div>
                <div class="ref-table__head--td">{{$t('content.refs.refBonus')}}</div>
              </div>
              <div class="ref-table__body">
                <div
                  class="ref-table__body--tr"
                  :class="{ active: item.level === data.level }"
                  v-for="item in $root.settings.referral.levels"
                  :key="item.level"
                >
                  <div class="ref-table__body--td">
                    <div class="td-lvl">{{ item.level }}</div>
                  </div>
                  <div class="ref-table__body--td sosiska-wrap" style=" justify-content: center">
                    {{ $root.conv(item.deposit) }} <Sosiska />
                  </div>
                  <div class="ref-table__body--td">{{ item.percent }}%</div>
                  <div class="ref-table__body--td">
                    +{{ item.percentReferral }}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    <Loader v-else-if="$root.user && loading == true" />

</template>

<script>
import AffCode from "@/components/aff-code/AffCode";
import RefCode from "@/components/ref-code/RefCode";
export default {
  components: {
    RefCode,
    AffCode,
  },
  data() {
    return {
      gainTab: "week",
      data: null,
      dashArr: null,
      loading: true,
      dashOff: null,
      refcode: null,
    };
  },
  sockets: {
    referralChanged() {
      this.fetchRef()
    },
  },
  async created() {
    if (this.$root.user == null) {
      this.$router.push("/");
    }else{
      await this.fetchRef()
      this.loading = false;
    }
  },
  methods: {
    async fetchRef() {
      await this.$root.request("GET", "/api/referral").then((resp) => {
        this.data = resp;
        //
        var percent = resp.percent == 0 ? 1 : resp.percent;
        var radius = 69;
        var circumference = radius * 2 * Math.PI;
        this.dashArr = `${circumference} ${circumference}`;
        const offset = circumference - (percent / 100) * circumference;
        this.dashOff = offset;
        //
      });
    },
    withdraw() {
      this.$root
        .request("POST", "/api/referral/withdraw", { sum: this.data.balance })
    },
  },
};
</script>

<style lang="scss" scoped>
#st0 {
  -moz-transform: rotate(-90deg); /* Для Firefox */
  -ms-transform: rotate(-90deg); /* Для IE */
  -webkit-transform: rotate(-90deg); /* Для Safari, Chrome, iOS */
  -o-transform: rotate(-90deg); /* Для Opera */
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: 0.35s stroke-dashoffset;
}

.profile {
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
  }
  &-body {
    padding: 20px;
  }
}

.ref {
  &-top {
    margin-bottom: 20px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  &-reflink {
    width: 385px;
    min-height: 100px;
    max-height: 500px;
    background: #1f1f1f;
    border-radius: 10px;
    padding: 14px 20px 15px 20px;

    &__title {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #ffffff;
      margin-bottom: 14px;
    }
  }

  &-gain {
    width: 240px;
    height: 100px;
    background: #1f1f1f;
    border-radius: 10px;
    overflow: hidden;
    &__content {
      padding: 12px 5px 0 20px;
      height: 78px;
      h3 {
        font-weight: bold;
        font-size: 18px;
        line-height: 18px;
        color: #ffffff;
        margin-bottom: 3px;
      }

      span {
        font-weight: bold;
        font-size: 18px;
        line-height: 22px;
        text-shadow: 0px 0px 4px rgba(114, 242, 53, 0.5);
        color: rgba(114, 242, 53);
      }
    }

    &__tabs {
      height: 22px;
      display: flex;
      &-item {
        width: 33%;
        &:nth-child(1) {
          background: linear-gradient(
            270deg,
            #424242 0%,
            rgba(66, 66, 66, 0) 100%
          );
        }

        &:nth-child(2) {
          background: #424242;
        }

        &:nth-child(3) {
          background: linear-gradient(
            90deg,
            #424242 0%,
            rgba(87, 87, 87, 0) 100%
          );
        }
        font-weight: 500;
        font-size: 10px;
        line-height: 12px;
        color: #7b7b7b;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 300ms;
        cursor: pointer;
        &.active,
        &:hover {
          background: #2b2b2b;
          box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.25);
          color: #fff;
        }
      }
    }
  }

  &-bottom {
    margin-top: 13px;
    display: flex;
    gap: 20px;
  }

  &-stats {
    width: 240px;
    height: 300px;
    background: #1f1f1f;
    border-radius: 10px;
    padding-top: 13px;
    &__title {
      font-weight: 600;
      font-size: 18px;
      line-height: 22px;
      color: #ffffff;
      text-transform: uppercase;
      text-align: center;
    }

    &__lvl {
      background: url("/img/bubbles.png");
      width: 215px;
      height: 190px;
      padding-top: 14px;
      margin: 0 auto;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &-num {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        span {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          &:first-child {
            font-weight: 800;
            font-size: 36px;
            line-height: 43px;
            color: #ffffff;
            text-shadow: 0px 0px 4px rgba(255, 255, 255, 0.25);
          }

          &:last-child {
            font-weight: normal;
            font-size: 12px;
            line-height: 14px;
            color: #7b7b7b;
            text-transform: uppercase;
          }
        }
      }
    }

    &__progress {
      text-align: center;
      margin-bottom: 8px;
      font-weight: 600;
      font-size: 18px;
      line-height: 22px;
      color: #de3720;
      span {
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        color: #7e281c;
      }
    }

    &__subprogress {
      font-weight: 600;
      font-size: 18px;
      line-height: 22px;
      color: #ffffff;
      text-align: center;
      text-transform: uppercase;
    }
  }

  &-info {
    display: flex;
    flex-wrap: wrap;
    gap: 20px 25px;
    width: 385px;
    &__invited {
      width: 180px;
      height: 140px;
      background: #1f1f1f;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &-icon {
        margin-bottom: 15px;
        svg {
          filter: drop-shadow(0px 0px 8px rgba(222, 55, 32, 0.5));
        }
      }

      &-value {
        font-weight: 600;
        font-size: 24px;
        line-height: 29px;
        color: #ffffff;
        margin-bottom: 18px;
      }

      &-title {
        font-weight: 600;
        font-size: 12px;
        line-height: 14px;
        color: #7b7b7b;
        text-transform: uppercase;
      }
    }

    &__bonus {
      width: 180px;
      height: 140px;
      background: #1f1f1f;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &-icon {
        margin-bottom: 15px;
        svg {
          filter: drop-shadow(0px 0px 8px rgba(222, 55, 32, 0.5));
        }
      }

      &-value {
        font-weight: 600;
        font-size: 24px;
        line-height: 29px;
        color: #ffffff;
        margin-bottom: 18px;
      }

      &-title {
        font-weight: 600;
        font-size: 12px;
        line-height: 14px;
        color: #7b7b7b;
        text-transform: uppercase;
      }
    }

    &__balance {
      width: 100%;
      background: #1f1f1f;
      border-radius: 10px;
      height: 140px;
      padding: 11px 25px 22px 21px;

      &-title {
        font-weight: 600;
        font-size: 12px;
        line-height: 14px;
        text-transform: uppercase;
        color: #7b7b7b;
        margin-bottom: 25px;
        text-align: center;
      }

      &-form {
        display: flex;
        align-items: center;
        margin-bottom: 4px;
        &--icon {
          width: 37px;
          height: 30px;
          margin-right: 15px;
        }

        &--wrapper {
          display: flex;
          flex: 1;
          background: #161616;
          border-radius: 10px;
          height: 40px;
        }

        &--price {
          font-weight: 600;
          font-size: 24px;
          line-height: 29px;
          color: #ffffff;
          padding: 5px 0 6px 13px;
        }

        &--btn {
          background: #de3720;
          border-radius: 10px;
          border: none;
          outline: none;
          transition: all 300ms;
          width: 144px;
          margin-left: auto;
          font-weight: 600;
          font-size: 18px;
          line-height: 22px;
          color: #000000;
          text-transform: uppercase;
          border: 1px solid transparent;
          &:hover {
            color: #fff;
            background: #1f1f1f;
            border: 1px solid #de3720;
          }
        }
      }

      &-subform {
        width: 111px;
        font-weight: 300;
        font-size: 10px;
        line-height: 12px;
        color: #7b7b7b;
        margin-left: auto;
        margin-right: 35px;
      }
    }
  }

  &-table {
    background: #1f1f1f;
    border-radius: 10px;
    height: 300px;
    flex: 1;
    padding: 11px 15px 10px 15px;

    &__title {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #ffffff;
      margin-left: 5px;
      margin-bottom: 15px;
    }

    &__head {
      display: flex;
      margin-bottom: 12px;
      &--td {
        width: 25%;
        text-align: center;
        font-weight: 500;
        font-size: 9px;
        text-transform: uppercase;
        line-height: 11px;
        color: #7b7b7b;
      }
    }

    &__body {
      display: flex;
      flex-direction: column;
      row-gap: 15px;
      &--tr {
        background: #4b332f;
        box-sizing: border-box;
        border-radius: 5px;
        display: flex;
        height: 32px;
        align-items: center;
        opacity: 0.5;
        &.active {
          border: 1px solid #a04235;
          box-shadow: 0px 0px 4px #a04235;
          opacity: 1;
        }
      }

      &--td {
        font-weight: bold;
        font-size: 9px;
        width: 25%;
        text-transform: uppercase;
        line-height: 11px;
        color: #ffffff;

        text-align: center;
        color: #ffffff;
        .td-lvl {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          width: 20px;
          height: 20px;
          background: #a04235;
          border-radius: 5px;
          font-weight: bold;
          font-size: 9px;
          line-height: 11px;
          color: #fff;
        }
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .profile {
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

@media screen and (max-width: 1800px) {
  .profile-body {
    overflow-y: auto;
    height: 100%;
    padding-bottom: 60px;
  }
  .ref {
    &-bottom {
      flex-wrap: wrap;
    }

    &-info {
      flex: 1;
    }

    &-table {
      min-width: 310px;
    }

    &-info {
      gap: 0;
      &__invited {
        width: 49%;
      }

      &__bonus {
        width: 49%;
        margin-left: auto;
      }

      &__balance {
        margin-top: 20px;
      }
    }
  }
}

@media screen and (max-width: 1600px) {
  .ref {
    &-top {
      flex-wrap: wrap;

      & > div {
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 1260px) {
  .ref {
    &-stats {
      width: 100%;
    }
  }
}

@media screen and (max-width: 900px) {
  .profile-body {
    padding-bottom: 10px;
  }
}

@media screen and (max-width: 450px) {
  .ref {
    &-info {
      &__invited {
        width: 157px;
      }

      &__bonus {
        width: 157px;
      }

      &__balance {
        margin-top: 20px;
      }
    }
  }

  .ref-info__balance-form--btn {
    width: 115px;
  }
}
</style>