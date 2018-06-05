layui.use('element', function(){
    let element = layui.element;

    //…
});

function Step02_selectTheater (el) {
    console.log(el)
    let theaterId= 1
    let movieName = '侏罗纪世界2'

    layui.data('ticket-sale', {
        key: 'theaterId',
        value: theaterId
    });

    layui.use('layer', function(){
        let layer = layui.layer;

        let index = layer.open({
            type: 2,
            content: `./choose-seat.html`,
            skin: 'demo-class',
            title: `${ movieName }:  第二步 - 选择座位`,
            area: ['320px', '195px'],
            anim: 2
        });

        layer.full(index);
    });
}

function toggleSession (el) {
    console.log(el)
}

function Step03_selectSeat (el) {
    console.log(el)
}