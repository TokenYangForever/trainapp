<template>
    <div class="C_wrap">
        <div class="C_tips">
            {{toptips}}
        </div>
        <div class="C_weekHead flexBox">
            <div class="flex1" style="color:#3c6">日</div>
            <div class="flex1">一</div>
            <div class="flex1">二</div>
            <div class="flex1">三</div>
            <div class="flex1">四</div>
            <div class="flex1">五</div>
            <div class="flex1" style="color:#3c6">六</div>
        </div>
        <div class="scroll">
            <div class="monthwrap" v-for= "montharr in days">
                <div class="m_head">{{montharr.y}}年{{montharr.m}}月</div>
                <div class="flexBox wek_Item" v-for="wekarr in montharr.dayarr">
                    <div class="flex1 day_Item" v-for="dayI in wekarr" v-if="dayI.val!=-1" :class='{enable:dayI.enable,vacation:dayI.Vacation&&!dayI.enable}' >
                    {{dayI.val}}
                    <span v-if = "!dayI.enable&&dayI.yuyue" class='yytag'>{{reserveText}}</span>
                    </div>
                    <div class="flex1 day_Item" v-else></div>
                </div>
            </div>
        </div>     
    </div>
</template>
<style scoped>
    .day_Item.vacation{
        color: #3c6
    }
    .day_Item{
        position: relative;
    }
    .yytag{
        font-size: 12px;
        position: absolute;
        height: 12px;
        text-align: center;
        line-height: 6px;
        color: #FF6540;
        bottom: 1px;
        right: 0;
        width: 100%;
    }
    .day_Item.enable{
        color: #999
    }
    .scroll{
        height: 569px;
        overflow: auto;
    }
    .monthwrap{
        background-color: #fff;
        padding-bottom: 10px;
    }
    .m_head{
        background-color: #f2f4f7;
        line-height: 32px;
        font-size: 14px;
        margin-bottom: 12px;
    }
    .C_wrap{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
    }
    .day_Item{
        background: #fff;
        height: 50px;
        line-height: 50px;
        color: #333;
        font-size: 1rem;
        text-align: center;
        font-weight: 400;
    }
    .C_tips{
        text-align: left;
        padding: 8px 15px;
        line-height: 20.5px;
        color: #ab7e49;
        background: #fff4e1;
        font-size: 12px;
        z-index: 100
    }
    .C_weekHead{
        z-index: 100;
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
            type: String,
            default: new Date().format('yyyy-MM-dd')
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
        },
        toptips: {
            type: String,
            default: "顶部文案"
        }
    },
    data () {
        var sDate = new Date(this.startDate);
        var year = this.startDate.split("-")[0];
        var sday = parseInt(this.startDate.split("-")[2]);
        var sMonth = parseInt(this.startDate.split("-")[1]);
        var bookenddate = new Date(sDate.getTime() + this.maxLength*24*3600*1000);
        var yuyuedate = new Date(sDate.getTime() + this.canbookLength*24*3600*1000); 
        var yday = yuyuedate.getDate();
        var yMonth = yuyuedate.getMonth()+1;
        var eday = bookenddate.getDate();
        var eMonth = bookenddate.getMonth()+1;
        var monArr = [];
        var days = [];
        for(var i = sMonth;i<eMonth+1;i++){
            var firstWek = new Date(year,i-1,1).getDay();
            var maxDay = new Date(year,i,0).getDate();
            var count = 1;
            var modays = [];
            for(var j = 0;j<5;j++){
                var wekday = []
                for(var k = 0;k<7;k++){
                    if(j == 0 ){
                        if(k<firstWek){
                            wekday[k] = {val:-1}
                        }else{
                            wekday[k] = {val:count};
                            count++
                        }
                    }else{
                        if(count>maxDay){
                            wekday[k] = {val:-1}
                        }else{
                            wekday[k] = {val:count};
                            count++; 
                        }
                    }
                    if(i==sMonth&&sday>=count || i==eMonth&&eday<count)
                        wekday[k].enable = true;
                    if(i==yMonth&&count>yday || i>yMonth)
                        wekday[k].yuyue = true;
                    if(k==0||k==6)
                        wekday[k].Vacation = true;
                }

                modays[j] = wekday;
            }
            days.push({dayarr:modays,y:year,m:i});
        }
        return {
            monArr:monArr,
            sDate:sDate,
            bookenddate:bookenddate,
            days:days
        }
    },
    created() {
    },
    mounted (){
    },
    watch: {
    },
    methods: {
    }
}
</script>