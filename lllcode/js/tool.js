/*
    通过id名称获取元素
    @param {string} id表示要获取元素的名称
*/
function getId(id) {
    return document.getElementById(id)
}


/*
冒泡排序
@param  {array} arr表示数组
return  排好的数字
*/
function bubbleSorting(arr) {
    for(var i = 0; i < arr.length - 1; i++) {
        for(var j = 0; j < arr.length - 1 - i; j++) {
            if(arr[j] > arr[j+1]) {
                var temp
                temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr
}


/*
    选择排序
    @param {array} arr表示数组
    return 排好的数字
*/
function selectSort(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        //内层控制的是趟数
        for (var j = i + 1; j < arr.length; j++) {
            //判断
            if (arr[i] > arr[j]) {
                //交换位置
                var temp
                temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp
            }
        }
    }
    return arr
}

/*
    封装转换查询字符串 --- 把查询字符串转成对象
    @param {string} str 表示要转换的字符串
    return 转换成的对象
*/
function transformationObj(str) {
    //把查询字符串进行分割 split('?')
    var arrStr = str.split('?')[1]
    //得到一个新的字符串 
    var arr = arrStr.split('&')
    //声明一个空的对象
    var obj = {}
    //遍历
    arr.forEach(function (item) {
        //把字符串继续进行切割 以等号切割 
        var newStr = item.split('=')
        //把数组的第一项（下标是0）设置为对象的键，把数组的第二项（下标是1）设置为对象的值
        obj[newStr[0]] = newStr[1]
    })
    //把结果返回给外界
    return obj
}

/*
    把对象转成查询字符串 --- 把对象转成查询字符串
    @param {object} obj 表示要转换的对象
    return 转换成的查询字符串
*/
function transformationQueryStr(obj) {
    //声明一个空的字符串
    var str = '?'
    //遍历对象
    for (var key in obj) {
        str += key + '=' + obj[key]
        str += '&'
    }
    //字符串截取 
    str = str.slice(0, -1)
    //把结果返回给外界
    return str
}

/*
    tab切换功能
    @param {object} aBtn 要点击的按钮
    @param {object} container 要点击的按钮切换的内容
*/
function tab(aBtn, container) {
    //遍历绑定事件
    for (var i = 0; i < aBtn.length; i++) {
        //设置一个自定义属性用于存储咱们的按钮的下标
        aBtn[i].setAttribute('index', i)
        aBtn[i].onclick = function () {
            //获取自定义属性
            var index = this.getAttribute('index')
            //排他，先清除所有按钮的样式
            for (var j = 0; j < aBtn.length; j++) {
                aBtn[j].className = ''
                //container[j].style.display = 'none'
                // container[j].className = 'hide'
                container[j].className = ''
            }
            //给当前的设置
            this.className = 'bg'
            container[index].className = 'show'
        }
    }
}

/*
    匀速动画封装
    @param {object} ele 表示要做动画的元素
    @param {number} num 表示步长的数值
    @param {number} target 表示目标值
    @param {string} attr 表示要做动画的属性
*/
function uniformAnimation(ele, num, target, attr) {
    //先清除再开启
    //当咱们点击按钮的时候，让其清除自己的定时器，不要清除别人的定时器就可以
    //把timer当成一个对象的属性，这样的timer属于一个单独的对象，这样就不会相互影响
    clearInterval(ele.timer)
    ele.timer = setInterval(function () {
        //开始位置  width:200px  200px + 10px  210px + 10px
        var begin = parseFloat(getStyle(ele, attr))
        //步长
        var step = num
        //赋值结果
        var res = begin + step
        //判断
        if (res >= target && num > 0) {
            res = target
            clearInterval(ele.timer)
        } else if (res <= target && num < 0) {
            res = target
            clearInterval(ele.timer)
        }
        //给元素进行赋值操作
        ele.style[attr] = res + 'px'
    }, 30)
}

/*
    缓动动画封装
    + 注意点：缓动动画的步长需要使用缓动动画公式直接计算出来，所以不需要自己传值进去
    @param {object} ele 表示要做动画的元素
    @param {number} target 表示目标值
    @param {string} attr 表示要做动画的属性
    @param {function} callback 回调函数，当前函数执行完毕后，后面的回调函数执行
*/
function animation(ele, target, attr, callback) {
    clearInterval(ele.timer)
    ele.timer = setInterval(function () {
        //开始位置  width:200px  200px + 10px  210px + 10px
        var begin = parseFloat(getStyle(ele, attr))
        //步长
        var step = (target - begin) / 10
        //判断
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        //赋值结果
        var res = begin + step
        //给元素进行赋值操作
        ele.style[attr] = res + 'px'
        //清除下定时器
        if (res == target) {
            clearInterval(ele.timer)
            //如果咱们传递了这个函数，那就执行，如果没有就不执行
            if (callback) {
                callback()
            }
        }
    }, 30)
}
//获取属性封装
function getStyle(ele, attr) {
    if (window.getComputedStyle) {
        return getComputedStyle(ele, null)[attr]
    } else {
        return ele.currentStyle[attr]
    }
}