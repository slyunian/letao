// 已进入页面就渲染上搜索记录

render();


// 获取历史记录
function getHistory() {
    var jsonStr = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse(jsonStr);
    // console.log(arr);
    return arr;

}

// 渲染模板
function render() {
    var arr = getHistory();
    var htmlStr = template('historyTe', {
        arr: arr
    });
    $('.lt_history').html(htmlStr);
}


//添加记录
$('.btn-search').on('click', function () {
    var txt = $('.search-txt').val().trim();
    // 清空内容
    $('.search-txt').val("");
    // 如果txt的长度为空
    if (txt.length == 0) {
        mui.toast('请输入搜索的关键字');
        return;
    }
    var arr = getHistory();
    // 将内容添加到数组中
    // 判断arr的长度
    if (arr.length >= 10) {
        // 删除最后一项
        arr.pop();
    }

    // 判断输入是否重复
    // indexOf(txt)会返回元素下标
    if (arr.indexOf(txt) != -1) {
        arr.splice(arr.indexOf(txt), 1);
    }
    arr.unshift(txt);
    // 转换为字符串
    var jsonStr = JSON.stringify(arr);
    localStorage.setItem('search_list', jsonStr);
    render();
})


// 删除记录
$('.lt_history').on('click', '.btn_delete', function () {
    var index = $(this).data('index');
    // console.log(id);
    var arr = getHistory();
    arr.splice(index, 1);
    var jsonStr = JSON.stringify(arr);
    localStorage.setItem('search_list', jsonStr);
    render();
})

// 清空记录
$('.lt_history').on('click', '.btn-empty', function () {
    console.log(1);
    mui.confirm("你确定要清空你的小秘密吗", '温馨提示', ['取消', '确认'], function (e) {
        // 判断用户选择的确认按钮
        if (e.index === 1) {
            localStorage.removeItem('search_list');
            render();
        }
    })
})