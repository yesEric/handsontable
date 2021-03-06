require('./style.less')
const Tabel = require('./table.js')
var data = [
    ['说明', '内容', null],
    ['数据', 10, 11],
    ['字符串', 'AAA', ''],
    ['对象', {name: '对象A', value: 123, hide: false}, {name: '对象B', value: 133}],
    ['公式', '=B2+C2'],
    ['错误示例', '=B1+B2'],
    ['对象属性计算', '=B4.value + 1'],
    ['别名计算示例', '=B4.值 + 1'],
    ['不存在的属性', '=B4.notExist'],
    ['公式套公式', '=B5 + 10'],
    ['公式SUM', '=SUM(B2:C2)']
]

var container = document.getElementById('table')
var hot = new Tabel({
    dom: container,
    data: data,
    // 属性别名
    propAlias: {
        'value': '值'
    },
    mergeCells: [
        {row: 0, col: 1, rowspan: 1, colspan: 2}
    ],
    metas: [
        {row: 0, col: 0, meta: {className: 'htRight'}}
    ],
})

// 需要选择数据时触发
hot.on('dblclick-object', function(row, col, data) {
    console.log('select:', row, col, data);
    setTimeout(() => {
        let value = data.value
        hot.setDataAtCell(row, col, {
            name: '值:' + (value + 1),
            value: (value + 1)
        })
    }, 1000)
});

hot.on('update', function(data) {
    console.log('update:', hot.getDataWithFormat());
})

window.hot = hot