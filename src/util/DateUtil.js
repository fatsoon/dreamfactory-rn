/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/5/22.
 */

export default class DateUtil{

    static Format(date, fmt)
    {
        var o = {
            "M+" : date.getMonth()+1,                 //月份
            "d+" : date.getDate(),                    //日
            "h+" : date.getHours(),                   //小时
            "m+" : date.getMinutes(),                 //分
            "s+" : date.getSeconds(),                 //秒
            "q+" : Math.floor((date.getMonth()+3)/3), //季度
            "S"  : date.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    };

    static timeAgo(timeLong){
        let currentTimeLong = Date.parse(new Date());
        let offsetSeconds = (currentTimeLong - timeLong)/1000;
        let offsetMinutes = offsetSeconds / 60;
        let offsetHours = offsetMinutes / 60;
        let offsetDays = offsetHours / 24;

        if(offsetSeconds < 60){
            return '刚刚';
        }
        else if(offsetMinutes < 60){
            return Math.floor(offsetMinutes) + '分钟前';
        }
        else if(offsetHours < 24){
            return Math.floor(offsetHours) + '小时前';
        }
        else if(offsetDays < 30){
            return Math.floor(offsetDays) + '天前';
        }
        else{
            return this.fomartDate(timeLong);
        }

    }

    static fomartDate(timeLong){
        let date = new Date();
        date.setTime(timeLong);
        let str = this.Format(date, 'yyyy-MM-dd hh:mm');
        return str;
    }

}