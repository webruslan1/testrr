<template>
  <div  v-if="$root.user && loading == false"  class="support">
    <SupportInfo />
    <div class="support-content">
      <div class="support-header">{{$t('content.support.ansOnQue')}}</div>
      <div class="support-body">
        <div class="support-list">
          <router-link
            :to="'/support/' + $route.params.id + '/' + item.id"
            class="support-list__item"
            v-for="item in questions"
            :key="item.id"
          >
            <div class="support-list__item-title">
              {{ item.data[$root.language][0] }}
            </div>
            <div class="support-list__item-arrow">
              <svg
                width="10"
                height="13"
                viewBox="0 0 10 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.56064 13L10 6.5L2.56064 0L0 2.23804L4.87702 6.5L0 10.762L2.56064 13Z"
                  fill="white"
                />
              </svg>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <Loader v-else-if="$root.user && loading == true" />
</template>

<script>
import SupportInfo from "@/components/support-info/SupportInfo";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    SupportInfo,
  },
  data() {
    return {
      questions: null,
      loading: true
    };
  },
  watch: {
    "$route.params.id"() {
      this.checkSupport()
    },
  },
  computed: {
    ...mapState({ support: "support" }),
  },
  async created() {
    if (this.$root.user == null) {
      this.$router.push("/");
    }else{
      await this.checkSupport()
      this.loading = false;
    }
  },
  methods: {
    ...mapActions({ getSupport: "getSupport" }),
    async checkSupport() {
      if (this.support === null) {
        await this.getSupport();
        this.questions = this.support.question.filter(
          (item) => item.folderId == this.$route.params.id
        );
      } else {
        this.questions = this.support.question.filter(
          (item) => item.folderId == this.$route.params.id
        );
      }
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
  }
  &-body {
    padding: 20px;
  }
  &-list {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;

    &__item {
      background: #1f1f1f;
      border: 1px solid #313131;
      border-radius: 10px;
      padding: 0 26px 0 29px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100px;
      width: 48%;
      cursor: pointer;
      transition: all 300ms;
      &:hover {
        opacity: 0.5;
      }

      &-title {
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;
        color: #ffffff;
      }

      &-arrow {
        margin-left: auto;
      }
    }
  }
}

@media screen and (max-width: 1500px) {
  .support {
    &-body {
      height: 100%;
      overflow-y: auto;
      padding-bottom: 60px;
    }
    &-list {
      &__item {
        width: 100%;
      }
    }
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