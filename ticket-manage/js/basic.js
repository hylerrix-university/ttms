layui.use('rate', function(){
    let rate = layui.rate;

    //渲染
    let ins1 = rate.render({
        elem: '.test1'  //绑定元素
    });
});


function showDetail (el) {
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
                            <div class="btn"> <a href="javascript:void(0);" class="sure" onclick="doRefundTicket()">我要退票</a></div>
                        </div>
                    </div>
                </div>
            `
        });
    });
}

function doRefundTicket () {
    layer.confirm('退票成功！', {
        btn: ['好的'] //按钮
    }, function(){
        window.location.reload()
    });
}