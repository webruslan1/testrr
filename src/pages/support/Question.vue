<template>
  <div class="support" v-if="$root.user && loading == false">
    <SupportInfo />
    <div class="support-content" v-if="currentQuestion">
      <router-link
        :to="'/support/' + currentQuestion.folderId"
        class="support-header"
      >
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
        {{$t('content.support.goQuest')}}
      </router-link>
      <div class="support-body">
        <div class="question">
          <div
            class="question-title"
            v-html="currentQuestion.data[$root.language][0]"
          ></div>
          <div
            class="question-content"
            v-html="currentQuestion.data[$root.language][1]"
          ></div>
          <router-link
            :to="'/create-ticket/' + currentQuestion.folderId"
            v-if="currentQuestion.canTicket"
            class="question-btn btn-tr"
          >
            <span>{{$t('content.support.writeTicket')}}</span>
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
      currentQuestion: null,
      loading: true
    };
  },
  watch: {
    "$route.params.id"() {
      this.checkSupport();
    },
  },
  computed: {
    ...mapState({ support: "support" }),
  },
  async created() {
    if (this.$root.user == null) {
      this.$router.push("/");
    }else{
      await this.checkSupport();
      this.loading = false;
    }
  },
  methods: {
    ...mapActions({ getSupport: "getSupport" }),
    async checkSupport() {
      if (this.support === null) {
        await this.getSupport();
      }
      this.currentQuestion = this.support.question.filter(
        (item) => item.id == parseInt(this.$route.params.id)
      )[0];
    },
  },
};
</script>

<style lang="scss">
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
    padding: 20px 20px 20px 62px;
  }
}

.question {
  &-title {
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #ffffff;
    margin-bottom: 20px;
  }
  &-content {
    margin-bottom: 22px;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #7b7b7b;

    & * {
      font-size: 14px;
      line-height: 17px;
      font-weight: 500;
    }

    & * svg{
      display: none;
    }

    & p {
      font-size: 14px;
      line-height: 17px;
      font-weight: 500;
    }

    ul {
      padding-left: 20px;
      font-size: 14px;
      line-height: 17px;
      font-weight: 500;
      li {
        list-style-type: disc;
      }
    }
  }
  &-btn {
    background: #1f1f1f;
    border: 1px solid #313131;
    box-sizing: border-box;
    border-radius: 10px;
    display: flex;
    align-items: center;
    width: 205px;
    padding: 19px 24px 20px 29px;
    span {
      margin-right: auto;
      font-weight: normal;
      font-size: 14px;
      line-height: 17px;
      color: #ffffff;
    }
  }
}

@media screen and (max-width: 1300px) {
  .support-body {
    padding-left: 20px;
  }
}

@media screen and (max-width: 900px) {
  .support {
    flex-direction: column;

    &-header {
      padding: 10px 10px 0 23px;
      background: unset;
    }

    &-content {
      margin-bottom: 70px;
    }
  }
}
</style>