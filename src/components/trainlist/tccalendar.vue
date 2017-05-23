<template>
    <div class="C_wrap">
        <div class="C_tips">
            因铁路局列车运行图调整，火车票预售期调整为30天，建议您提前预约抢票，开售自动抢票。
        </div>
        <div class="C_weekHead flexBox">
            <div class="flex1"></div>
        </div>
    </div>
</template>
<style scoped>
    .C_tips{
        padding: 8px 15px;
        line-height: 20.5px;
        color: #ab7e49;
        background: #fff4e1;
        font-size: 12px;
    }
    .C_weekHead{
        display: block;
        margin: 0;
        padding: 0;
        height: 42px;
        background-color: #5f5e5e;
        width: 100%;
    }
    .C_weekHead div{
        list-style: none;
        line-height: 2;
        padding: 5px 0;
        font-size: 1rem;
        width: 14.2857143%;
        float: left;
        color: #fff;
        text-align: center;
        font-weight: 400;
    }
</style>
<script>
export default {
    props: {
        startDate: {
            type: Date,
            default: new Date()
        },
        maxLength: {
            type: Number,
            default: 60
        },
        canbookLength: {
            type: Number,
            default: 30
        },
        reserveText: {
            type: String,
            default: "预订"
        }
    },
    data () {
        var bookenddate = new Date(this.startDate.getTime() + this.canbookLength*24*3600*1000)
        return {
        }
    },
    created() {
    },
    watch: {
    },
    methods: {
    }
}
</script>