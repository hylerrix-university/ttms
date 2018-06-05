function Step01_selectSeat (el) {
    console.log(el)
    let movieId= 1
    let movieName = '侏罗纪世界2'

    // movieId 存入 layui 封装的 localStorage 中
    // 查找方法：var xxx = layui.data('ticket-sale'); console.log(xxx.movieId); // movieId
    // 删除方法：layui.data('ticket-sale', {
    //   key: 'movieId',
    //   remove: true
    // });
    layui.data('ticket-sale', {
        key: 'movieId',
        value: movieId
    });

    layui.use('layer', function(){
        let layer = layui.layer;

        layer.open({
            type: 2,
            content: `./choose-theater.html`,
            skin: 'demo-class',
            title: `${ movieName }: 第一步 - 选择场次`,
            area: ['1020px', '98vh'],
            anim: 2
        });
    });
}

// 监听子 iframe 的关闭请求，避免跨域问题
window.addEventListener('message', function(evt){
    window.location.reload(true)
});