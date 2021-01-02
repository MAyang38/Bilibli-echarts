// 实时显示时间
//function showTime() {
//    var time=new Date();
//    var year=time.getFullYear();
//    var month=(time.getMonth()+1+'').padStart(2,'0');
//    var day = (time.getDate()+'').padStart(2,'0');
//    var hour = (time.getHours()+'').padStart(2,'0');
//    var minute = (time.getMinutes()+'').padStart(2,'0');
//    var second = (time.getSeconds()+'').padStart(2,'0');
//
//    var content = `${year}年${month}月${day}日${hour}:${minute}:${second}`;
//    $('#title .time').text(content);
//}
//showTime();
//setInterval(showTime,10000);

function get_time() {
    $.ajax({
        url: "/get_time",
        timeout: 10000,//超时时间设置为10秒
        success: function (data) {
            $('#title .time').html(data);
        }, error: function (xhr, type, errorThrown) {

        }
    })
}
setInterval(get_time, 1000);
//function get_data() {
//    $.ajax({
//        url: "/get_data",
//        timeout: 10000,//超时时间设置为10秒
//        success: function (data) {
//            $('#title .time').html(data);
//        }, error: function (xhr, type, errorThrown) {
//
//        }
//    })
//}
//setInterval(get_time, 1000);

function get_data() {
    //$('#right1').text(`123451`);

    $.ajax({
        url: "/get_data",
        dataType : "json",//数据格式
        ///ype : "get",//请求方式'
       timeout: 10000,//超时时间设置为10秒

        success: function (data) {
      // $('#right1').text("data");
       var data=JSON.parse(data);
       left1(data);
       left2(data);
    //$('#right1').text(`123451`);
        }, error: function () {
        }
    })
}
get_data();
setInterval(get_data, 5000);
function left1(datas){
var myChart = echarts.init($('#right1')[0],'dark');
var option = {
            title: {
                text: 'B站每日播量放前十'
            },
            tooltip: {},
            legend: {
                data:['播放']
            },
            xAxis: {
                data: []
            },
            yAxis: {},
            series: [{
                name: '播放',
                type: 'bar',
                data: []
            }]
        };
var topData=[]
    for (var i in datas){
        topData.push({
            'id':datas[i].id,
            'bf':datas[i].bf
        });
    }
topData.sort(function (a,b) {
return b.bf-a.bf;
});

     topData.length=10;
     console.log(topData);

for (var i in topData)
        {option.xAxis.data.push(topData[i].id);
        option.series[0].data.push(topData[i].bf);
        }
// datas.length=5;
// for (var i in datas)
//         {option.xAxis.data.push(datas[i].title);
//         option.series[0].data.push(datas[i].bf);
//         }

myChart.setOption(option);
}


function right2()
{var myChart = echarts.init($('#right2')[0],'dark');

option = {
    title: {
        text: '主要分类',

        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['生活', '数码', '娱乐', '知识', '鬼畜']
    },
    series: [
        {
            name: '分类',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                {value: 4, name: '生活'},
                {value: 2, name: '数码'},
                {value: 2, name: '娱乐'},
                {value: 1, name: '知识'},
                {value: 1, name: '鬼畜'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
myChart.setOption(option);

}

right2();
function left2(datas)
{
var myChart = echarts.init($('#left2')[0],'dark');
option = {
    dataset: {
        source: [
//            ['score', 'amount', 'product'],
//            [89.3, 58212, 'Matcha Latte'],
//            [57.1, 78254, 'Milk Tea'],
//            [74.4, 41032, 'Cheese Cocoa'],
//            [50.1, 12755, 'Cheese Brownie'],
//            [89.7, 20145, 'Matcha Cocoa'],
//            [68.1, 79146, 'Tea'],
//            [19.6, 91852, 'Orange Juice'],
//            [10.6, 101852, 'Lemon Juice'],
//            [32.7, 20112, 'Walnut Brownie']
        ]
    },
    grid: {containLabel: true},
    xAxis: {name: 'amount'},
    yAxis: {type: 'category'},
    visualMap: {
        orient: 'horizontal',
        left: 'center',
        min: 10,
        max: 100,
        text: ['High Score', 'Low Score'],
        // Map the score column to color
        dimension: 0,
        inRange: {
            color: ['#D7DA8B', '#E15457']
        }
    },
    series: [
        {
            type: 'bar',
            encode: {
                // Map the "amount" column to X axis.
                x: 'amount',
                // Map the "product" column to Y axis
                y: 'product'
            }
        }
    ]
};
var topData=[]
  for (var i in datas){
        topData.push([
            Number(datas[i].score),
            datas[i].author
        ]);
    }
//topData.sort(function (a,b) {
//return b.bf-a.bf;
//});

   topData.length=6;
    console.log(topData);

for (var i in topData)
        option.dataset.source.push(topData[i]);
       // option.series[0].data.push(topData[i].bf);
       // }
myChart.setOption(option);

}
