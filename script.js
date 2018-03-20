var using = false
var eraserEnabled = false
var point = {'x':undefined,'y':undefined}
var canvas = document.getElementById("graph")
var ctx = canvas.getContext('2d')
var lineColor = 'black'

//画布
setCanvasSize(canvas)

window.onresize = function(){
    setCanvasSize(canvas)
}

//特性检测
if(document.body.ontouchstart !== undefined){
    //触屏设备
    canvas.ontouchstart = function(tch){
        console.log(1)
        var x = tch.touches[0].clientX
        var y = tch.touches[0].clientY
        using = true
        if(eraserEnabled == true){
            ctx.clearRect(x-5,y-5,10,10)
        }else{
            point.x = x
            point.y = y
        }
    }
    canvas.ontouchmove = function(tch){
        console.log(2)
        var x = tch.touches[0].clientX
        var y = tch.touches[0].clientY
        if(using == true){
            if(eraserEnabled == true){
                ctx.clearRect(x-5,y-5,10,10)
            }else{
                var newPoint = {'x':x,'y':y}
                drawLine(point.x, point.y, newPoint.x, newPoint.y, 5, lineColor)
                point = newPoint
            }
        }
    }
    canvas.ontouchend = function(tch){
        using = false
    }
}else{
    //非触屏设备
    //鼠标事件
    canvas.onmousedown = function(zzz){
        var x = zzz.clientX
        var y = zzz.clientY
        using = true
        if(eraserEnabled == true){
            ctx.clearRect(x-5,y-5,10,10)
        }else{
            point.x = x
            point.y = y
        }
    }
    canvas.onmousemove = function(zzz){
        var x = zzz.clientX
        var y = zzz.clientY
        if(using == true){
            if(eraserEnabled == true){
                ctx.clearRect(x-5,y-5,10,10)
            }else{
                var newPoint = {'x':x,'y':y}
                drawLine(point.x, point.y, newPoint.x, newPoint.y, 5, lineColor)
                point = newPoint
            }
        }
    }
    canvas.onmouseup = function(zzz){
        using = false
    }
}

//画笔橡皮擦按钮
eraser.onclick = function(){
    eraserEnabled = true
    eraser.classList.add('active')
    brush.classList.remove('active')
}

brush.onclick = function(){
    eraserEnabled = false
    brush.classList.add('active')
    eraser.classList.remove('active')
}
//清屏按钮
clearAll.onclick = function(){
    var width = document.documentElement.clientWidth
    var height = document.documentElement.clientHeight
    ctx.clearRect(0, 0, width, height)
}
//下载按钮
download.onclick = function(){
    var img = canvas.toDataURL("image/png")
    var aLink = document.createElement('a')
    document.body.appendChild(aLink)
    aLink.href = img
    aLink.download = new Date().getTime() + ".png"
    aLink.click()
}
//颜色变换
colorBlack.onclick = function(){
    lineColor = 'black'
    removeColorClass()
    colorBlack.classList.add('active')
}
colorRed.onclick = function(){
    lineColor = 'red'
    removeColorClass()
    colorRed.classList.add('active')
}
colorGreen.onclick = function(){
    lineColor = 'green'
    removeColorClass()
    colorGreen.classList.add('active')
}
colorBlue.onclick = function(){
    lineColor = 'blue'
    removeColorClass()
    colorBlue.classList.add('active')
}

function removeColorClass(){
    colorBlack.classList.remove('active')
    colorRed.classList.remove('active')
    colorGreen.classList.remove('active')
    colorBlue.classList.remove('active')
}
/**********/
function setCanvasSize(canvas){
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
}

function drawLine(x1, y1, x2, y2, lineWidth, lineColor){
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.closePath()
}

function drawCircle(x1, y1, radius){
    ctx.beginPath()
    ctx.arc(x1, y1, radius, 0, Math.PI*2, true)
    ctx.fill()
    //arc(x, y, radius, startAngle, endAngle, anticlockwise)
    //startAngle 开始角度 endAngle 结束角度 anticlockwise 方向 默认为顺时针
}
