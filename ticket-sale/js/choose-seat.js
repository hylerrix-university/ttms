window.onload = function () {
    // 初始化已选座位
    layui.data('ticket-sale', {
        key: 'positionSelected'
        ,value: []
    });

    let seatInfo = loadSeatInfo()
    renderSeatInfo(seatInfo)
}

// 座位信息绑定在全局 window 对象上


// 0: 没座位，1: 可选座位，2: 已选座位，3: 已售座位
function loadSeatInfo () {
     return [
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    ]
}

function renderSeatInfo (seatInfo) {
    let domString = ''
    seatInfo.forEach(function (seatRow, i) {
        domString += `<dl class="row${ i + 1 }">`
        seatRow.forEach(function (seatCol, j) {
            let statusClass = getStatusClass(seatInfo[i][j])
            domString += `<dd><div class="${ statusClass }" data-position="${i + '-' + j}" data-status="${ seatInfo[i][j] }" onclick="clickOneSeat(this)"></div></dd>`
        })
        domString += `</dl>`
    })
    $('#sittingList').append($.parseHTML(domString))
}

function clickOneSeat (el) {
    let position = el.dataset.position.split('-')
    // 0: 没座位，1: 可选座位，2: 已选座位，3: 已售座位
    let status = parseInt(el.dataset.status)
    let ticketSale = layui.data('ticket-sale')
    let positionSelected = ticketSale.positionSelected

    if (status === 1) {
        // 本身可选，变成已选

        // 判断是否超过 5 个
        if (positionSelected.length > 4) {
            layui.use(['layer'], function () {
                layer.msg('最多选择五个座位！')
            })
            return
        }

        el.dataset.status = 2
        el.className = getStatusClass(2)
        // 更新右侧已选座位信息
        positionSelected.push(position)
        layui.data('ticket-sale', {
            key: 'positionSelected'
            ,value: positionSelected
        });
        renderPositionInfo()
    } else if (status === 2) {
        // 本身已选，变成可选，更新右侧已选座位信息
        el.dataset.status = 1
        el.className = getStatusClass(1)
        // 更新右侧已选座位信息
        let afterFilter = positionSelected.filter(v => {
            // 删除该已选座位信息
            return !arraysEqual(v, position)
        })
        layui.data('ticket-sale', {
            key: 'positionSelected'
            ,value: afterFilter
        });
        renderPositionInfo()
    }
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function getStatusClass (number) {
    let statusClass = ''
    switch (parseInt(number)) {
        case 0:
            statusClass = 'nosit'
            break;
        case 1:
            statusClass = 'kx'
            break;
        case 2:
            statusClass = 'yx'
            break;
        case 3:
            statusClass = 'ys'
            break;
    }
    return statusClass
}

function renderPositionInfo () {
    let ticketSale = layui.data('ticket-sale')
    let positionSelected = ticketSale.positionSelected

    // clear
    $('#selectedSeat').empty()

    // render
    let domString = ''
    positionSelected.forEach(v => {
        domString += `<ol>${v[0]} 排 ${v[1]} 座</ol>`
    })
    $('#selectedSeat').append($.parseHTML(domString))
}

function Step03_selectSeat (el) {
    console.log(el)

    layui.use('layer', function(){
        layer.open({
            type: 1,
            skin: 'demo-class', //加上边框
            area: ['689px', '403px'], //宽高
            title: '订单信息',
            content: `
                <div class="payBox" style="display: block;">
                    <!--/*支付信息*/-->
                    <div class="payInfo_list">
                        <div class="payInfo_main">
                            <table>
                                <tbody><tr>
                                    <th colspan="2">订单号：<span>2014021088888888</span></th>
                                </tr>
                                <tr>
                                    <td>影片：<span>澳门风云</span></td><td></td>
                                </tr>
                                <tr>
                                    <td>影厅：<span>IMAX厅</span></td><td></td>
                                </tr>
                                <tr>
                                    <td>影城：<span>星星国际影城</span></td><td></td>
                                </tr>
                                <tr>
                                    <td>时间：<span>2014-02-10 13:30</span></td><td></td>
                                </tr>
                                <tr>
                                    <td>数量：5张  <b>5排12座</b><b>8排10座</b><b>8排11座</b><b>8排12座</b><b>8排13座</b></td><td></td>
                                </tr>
                                <tr>
                                    <td>单价： <span>元/张 ，总金额：  元</span></td><td></td>
                                </tr>
                                <tr>
                                    <td colspan="2">手机号码：13318702255</td>
                                </tr>
                                </tbody></table>
                            <div class="btn"> <a href="javascript:void(0);" class="sure" onclick="doBuyTicket()">确定支付</a></div>
                        </div>
                    </div>
                </div>
            `
        });
    });
}

function doBuyTicket () {
    layer.confirm('购买成功！', {
        btn: ['好的'] //按钮
    }, function(){
        top.window.postMessage('closeIFrame', '*');
    });
}