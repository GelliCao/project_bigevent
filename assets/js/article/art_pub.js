$(function () {
    var form = layui.form
    initCate()
    // 加载文章
    function initCate() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res)
                if (res.status != 0) return layui.layer.msg(res.message)
                var htmlStr = template('tpl-cate', res)
                $("[name=cate_id]").html(htmlStr)
                form.render()
            }
        })
    }

    // 初始化富文本编辑器
    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $("#btnChooseImage").on('click', function () {
        $("#coverFile").click()
    })
    $("#coverFile").on('change', function (e) {
        var files = e.target.files
        if (files.length == 0) return layui.layer.msg("请选择图片")
        var newImgURL = URL.createObjectURL(files[0])
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 发布状态
    var state = "已发布"
    $("#btnSave2").on('click', function () {
        state = "草稿"
    })
    $("#form-add").on('submit', function (e) {
        e.preventDefault()
        var fd = new FormData(this)
        fd.append('state', state)
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求
                $.ajax({
                    type:'post',
                    url:'/my/article/add',
                    data: fd,
                    contentType:false,
                    processData:false,
                    success:function(res){
                        if(res.status != 0)return layui.layer.msg(res.message)
                        layui.layer.msg(res.message)
                        $("#form-add")[0].reset()
                        // location.href = '/article/art_list.html'
                        window.parent.document.getElementById('a2').click()
                        // window.parent.$('#a2').click()
                    }
                })
            })
    })

})