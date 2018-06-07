window.onload = function () {
    // 初始化已选座位
    layui.data('ticket-sale', {
        key: 'positionSelected'
        ,value: []
    });

    // 从 localstorage 里获取订单信息，这里先这设置，需要后端接入数据
    layui.data('ticket-sale', {
        key: 'orderId'
        ,value: '2018061088888888'
    })
    layui.data('ticket-sale', {
        key: 'movieName'
        ,value: '侏罗纪世界2'
    })
    layui.data('ticket-sale', {
        key: 'movieHall'
        ,value: 'IMAX厅'
    })
    layui.data('ticket-sale', {
        key: 'theater'
        ,value: '星星国际影城'
    })
    layui.data('ticket-sale', {
        key: 'session'
        ,value: '2014-02-10 13:30'
    })
    layui.data('ticket-sale', {
        key: 'time'
        ,value: '94'
    })
    layui.data('ticket-sale', {
        key: 'language'
        ,value: '粤语'
    })
    layui.data('ticket-sale', {
        key: 'count'
        ,value: 0
    })
    layui.data('ticket-sale', {
        key: 'perMoney'
        ,value: '80'
    })
    layui.data('ticket-sale', {
        key: 'tel'
        ,value: '13318702255'
    });

    renderOrderInfo()

    let seatInfo = loadSeatInfo()
    renderSeatInfo(seatInfo)
}

function renderOrderInfo () {
    let ticketSale = layui.data('ticket-sale')

    let domString = ''
    domString += `
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
            <tbody>
            <tr>
                <td rowspan="3" class="img"><img src="https://img.alicdn.com/bao/uploaded/i3/TB1VY70niOYBuNjSsD4XXbSkFXa_.jpg_160x240.jpg"></td>
                <td width="f1">${ ticketSale.movieName }</td>
                <td>${ ticketSale.theater }</td>
                <td>${ ticketSale.movieHall }</td>
            </tr>
            <tr>
                <td width="f1">场次：${ ticketSale.session }</td>
                <td>片长：${ ticketSale.time }</td>
                <td>语言：${ ticketSale.language }</td>
            </tr>
            <tr>
                <td>正价：${ ticketSale.perMoney }</td>
                <td>网购价:<b class="red">￥${ ticketSale.perMoney }</b></td>
                <td><span class="red">会员价按会员折扣标准执行</span></td>
            </tr>
            </tbody>
        </table>
    `
    $('#orderWrap').append($.parseHTML(domString))
}

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
        domString += `<ol>${parseInt(v[0]) + 1} 排 ${parseInt(v[1]) + 1} 座</ol>`
    })
    $('#selectedSeat').append($.parseHTML(domString))
}

function Step03_selectSeat () {

    // 判断是否选座位
    let ticketSale = layui.data('ticket-sale')
    let positionSelected = ticketSale.positionSelected
    if (positionSelected.length === 0) {
        layui.use(['layer'], function () {
            layer.msg('您还没有选择座位！')
        })
        return
    }

    let count = positionSelected.length
    layui.data('ticket-sale', {
        key: 'count'
        ,value: count
    })

    layui.use('layer', function(){
        let content = `
                <div class="payBox" style="display: block;">
                    <!--/*支付信息*/-->
                    <div class="payInfo_list">
                        <div class="payInfo_main">
                            <table>
                                <tbody><tr>
                                    <th colspan="2">订单号：<span>${ ticketSale.orderId }</span></th>
                                </tr>
                                <tr>
                                    <td>影片：<span>${ ticketSale.movieName }</span></td><td></td>
                                </tr>
                                <tr>
                                    <td>影厅：<span>${ ticketSale.movieHall }</span></td><td></td>
                                </tr>
                                <tr>
                                    <td>影城：<span>${ ticketSale.theater }</span></td><td></td>
                                </tr>
                                <tr>
                                    <td>时间：<span>${ ticketSale.session }</span></td><td></td>
                                </tr>
                                <tr>
                                    <td>数量：${ count } 张`
        positionSelected.forEach(v => {
            content += `<b>${parseInt(v[0]) + 1} 排 ${parseInt(v[1]) + 1} 座</b>`
        })
        content += `</td><td></td>
                                </tr>
                                <tr>
                                    <td>单价： ${ ticketSale.perMoney }<span>元/张 ，总金额： ${ ticketSale.count * ticketSale.perMoney } 元</span></td><td></td>
                                </tr>
                                <tr>
                                    <td colspan="2">手机号码：${ ticketSale.tel }</td>
                                </tr>
                                </tbody></table>
                            <div class="btn"> <a href="javascript:void(0);" class="sure" onclick="doBuyTicket()">确定支付</a></div>
                        </div>
                    </div>
                </div>
            `

        layer.open({
            type: 1,
            skin: 'demo-class', //加上边框
            area: ['689px', '403px'], //宽高
            title: '订单信息',
            content: content
        });
    });
}

function doBuyTicket () {

    // 提示购买成功
    layer.confirm('购买成功！', {
        btn: ['好的'] //按钮
    }, function(){
        top.window.postMessage('closeIFrame', '*');
        window.location.reload()
    });
}