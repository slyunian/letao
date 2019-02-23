// 左边
var myChart1 = echarts.init(document.querySelector('.echarts_left'));

// 指定图表的配置项和数据
var option1 = {
    title: {
        text: '乐淘月销量'
    },
    tooltip: {},
    legend: {
        data: ['销量', '库存']
    },
    xAxis: {
        data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [125, 230, 346, 150, 160, 230]
    }, {
        name: '库存',
        type: 'bar',
        data: [53, 204, 326, 130, 120, 220]
    }]
};

// 使用刚指定的配置项和数据显示图表。
myChart1.setOption(option1);

// 右边
var myChart2 = echarts.init(document.querySelector('.echarts_right'));
option2 = {
    title: {
        text: '各个品牌销售占比',
        subtext: '2019年度',
        x: 'center',
        textStyle: {
            color: "red",
            fontSize: 25
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克', '安踏', '回力', 'AJ', '老人头']
    },
    series: [{
        name: '销售占比',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [{
                value: 335,
                name: '耐克'
            },
            {
                value: 310,
                name: '安踏'
            },
            {
                value: 234,
                name: '回力'
            },
            {
                value: 135,
                name: 'AJ'
            },
            {
                value: 1548,
                name: '老人头'
            }
        ],
        itemStyle: {
            emphasis: {
                shadowBlur: 100,
                shadowOffsetX: 0,
                shadowColor: 'pink'
            }
        }
    }]
}
myChart2.setOption(option2);