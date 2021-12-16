class Index {
    constructor() {
        // 获取节点【轮播图】
        this.container = document.querySelector('.banner-img')
        this.pic = this.container.children
        // console.log(this.pic);
        this.prev = document.querySelector('.icon-left')
        this.next = document.querySelector('.icon-right')
        this.circleBtn = document.querySelector('.banner-disc')
        
        // 获取节点【手机商品渲染,要追加到的手机列表】
        this.phone = document.querySelector('.item-con .items')
        // console.log(this.phone,111);

        // 获取节点【左侧菜单栏显示与隐藏】ul下的li
        this.l_list = document.querySelector('.l-list');
        // this.liChild = this.l_list.children;//HTMLCollection不是数组
        this.liChild = document.querySelectorAll('.l-list>li');
        // console.log(this.liChild );//NodeList(10) [li, li, li, li, li, li, li, li, li, li]
        this.div_child = document.querySelectorAll('.l-list>li>.child-list');
        // console.log(this.div_child,111);

        // 获取所有li中间header
        this.middle_lis = document.querySelectorAll('.h-list>li');
        this.middle_div = document.querySelectorAll('.h-list>li>.down-menu-wrapper');
        // console.log( this.middle_div);
        this.middle_ul = document.querySelector('.h-list');
        // console.log(this.middle_ul);
       
        //声明一个变量作为改变的下标
        this.num = 0
        this.circle = 0
        this.flag = true
        this.timer = null

        //只调用初始化方法init（）即可
        this.init()
    }
    //初始化方法
    init() {
        this.setBtn()
        this.picSwitching()
        this.onBanner()
        this.onprve()
        this.onnext()
        this.getPhone()
        this. leftDisplay()
        this.middleDisplay()
    }
    setBtn() {
        //遍历创建li
        for (var i = 0; i < this.pic.length; i++) {
            var li = document.createElement('li')
            li.innerHTML = i + 1
            this.circleBtn.appendChild(li)
        }
        //给第一个小圆圈设置背景
        this.circleBtn.children[0].className = 'active'
        //把第一张图片复制一张给最后面 表示不仅复制了li标记，还把它里面的图片复制了
        var first = this.pic[0].cloneNode(true)
        this.container.appendChild(first)
    }
    picSwitching() {
        //点击按钮切换图片并有动画 circleBtn.children表示ol标记下的所有li标记
        for (var i = 0; i < this.circleBtn.children.length; i++) {
            //设置自定义属性
            this.circleBtn.children[i].setAttribute('index', i)
            //表示ol标记下的所有li标记
            var that = this
            this.circleBtn.children[i].onclick = function () {
                //获取自定义属性
                var index = this.getAttribute('index')
                //当咱们点击按钮的时候，应该把它的下标给到右侧按钮，这样就可以实现了同步操作
                //让下标进行关联操作
                that.num = index
                that.circle = index
                //让按钮背景颜色改变，做排他
                for (var j = 0; j < that.circleBtn.children.length; j++) {
                    that.circleBtn.children[j].className = ''
                }
                this.className = 'active'
                //让图片切换 pic[0]表示ul里面第一个li pic[0].offsetWidth表示第一个li的宽度
                //设置负值，元素才会向左边移动
                animation(that.container, -that.pic[0].offsetWidth * index, 'left')
            }
        }
    }

    //点击右侧按钮让图片切换 
    /*
        无缝轮播图原理
        + 由于每一张图片大小是一样的，把第一张图片复制一张给拼接到所有图片的最后面
        + 当执行到拼接的这种图片的时候，让程序一瞬间把它拉回到第一张图片，由于第一张图片和最后一张图片
        长得一模一样，可以骗过眼睛
        container.style.width = pic[0].offsetWidth * pic.length
    */
    //使用开关的思路来解决问题

    onprve() {
        //点击左侧按钮进行切换
        var that = this
        this.prev.onclick = function () {
            if (that.flag) {
                that.flag = false
                if (that.num == 0) {
                    that.num = that.pic.length - 1
                    //一瞬间把它拉回第一张图片
                    that.container.style.left = -that.pic[0].offsetWidth * that.num + 'px'
                }
                that.num--
                animation(that.container, -that.pic[0].offsetWidth * that.num, 'left', function () {
                    that.flag = true
                })
                that.circle--
                if (that.circle < 0) {
                    that.circle = that.circleBtn.children.length - 1
                }
                for (var j = 0; j < that.circleBtn.children.length; j++) {
                    that.circleBtn.children[j].className = ''
                }
                that.circleBtn.children[that.circle].className = 'active'
            }
        }

    }
    onnext() {
        var that = this
        this.next.onclick = function () {
            if (that.flag) {
                that.flag = false
                that.num++
                //问题：最后一次没有执行动画
                //console.log(num)
                //当咱们点击自增到最后一张的时候，条件满足进入判断体直接拉回到第一张了，所以下面的动画是没有执行的
                animation(that.container, -that.pic[0].offsetWidth * that.num, 'left', function () {
                    //把判断条件放在回调函数里面，只有每一次动画执行完毕后再执行条件里面的东西
                    if (that.num == that.pic.length - 1) {
                        that.num = 0
                        //一瞬间把它拉回第一张图片
                        that.container.style.left = 0
                    }
                    that.flag = true
                })
                that.circle++
                if (that.circle > that.circleBtn.children.length - 1) {
                    that.circle = 0
                }
                for (var j = 0; j < that.circleBtn.children.length; j++) {
                    that.circleBtn.children[j].className = ''
                }
                that.circleBtn.children[that.circle].className = 'active'
            }
        }
    }

    onBanner() {

        var that=this
        //自动轮播
        function auto() {
            that.timer = setInterval(function () {
                //怎么调用事件和匿名函数  
                //next.onclick里面保存的就是函数，所以加一个括号就可以直接调用执行
                //让事件自调用，直接加括号就可以
                that.next.onclick = function () {
            if (that.flag) {
                that.flag = false
                that.num++
                //问题：最后一次没有执行动画
                //console.log(num)
                //当咱们点击自增到最后一张的时候，条件满足进入判断体直接拉回到第一张了，所以下面的动画是没有执行的
                animation(that.container, -that.pic[0].offsetWidth * that.num, 'left', function () {
                    //把判断条件放在回调函数里面，只有每一次动画执行完毕后再执行条件里面的东西
                    if (that.num == that.pic.length - 1) {
                        that.num = 0
                        //一瞬间把它拉回第一张图片
                        that.container.style.left = 0
                    }
                    that.flag = true
                })
                that.circle++
                if (that.circle > that.circleBtn.children.length - 1) {
                    that.circle = 0
                }
                for (var j = 0; j < that.circleBtn.children.length; j++) {
                    that.circleBtn.children[j].className = ''
                }
                that.circleBtn.children[that.circle].className = 'active'
            }
        }
        that.next.onclick()
            }, 2000)
        }
        auto()
        //当鼠标移入到swiper容器里面的时候让自动轮播停止
        this.container.parentNode.onmouseover = function () {
            clearInterval(that.timer)
        }
        this.container.parentNode.onmouseout = function () {
            auto()
        }
    }


    // 首页左侧菜单栏，鼠标移入，div显示，移出隐藏
    leftDisplay() {
        let that = this;
        //事件委托给ul【鼠标移入，li有背景色，div显示】
        this.l_list.onmouseover = function(e) {
            e = e || window.event;
            let tar = e.target;
            // console.log(tar);
            // 判断当前鼠标移入的是不是li
            if(tar.nodeName == 'LI') {
                // console.log(123);
                // console.log(that.liChild);
                // console.log(that.div_child);
                // console.log(tar.childNodes);
                for(let i = 0; i < that.liChild.length; i++) {
                    // console.log(this.liChild);
                    //  console.log(that.liChild);
                    //  console.log(that.div_child);
                    that.liChild[i].style.background = '';
                }
                tar.style.background = 'rgb(255, 103, 0)';
                /*div的显示与隐藏*/ 
                // that.div_child[i].style.display = block;

            }
        }
        // 鼠标移出，li没有背景色，div隐藏
        this.l_list.onmouseout = function(e) {
            e = e || window.event;
            let tar = e.target;
            // console.log(tar);
            // 判断当前鼠标移入的是不是li
            if(tar.nodeName == 'LI') {
                tar.style.background = '';
            }
        }
        

        
    }


    // 中间header显示与隐藏
    middleDisplay() {
        // 当鼠标移入在li身上时，当前div显示，离开隐藏【获取所有li，绑定事件，获取所有div】
        let that = this;
        // 遍历循环每一个li绑定事件【事件委托ul】
        // console.log(this.middle_lis);
        this.middle_ul.onmouseover = function(e) {
            e = e || window.event;
            let tar = e.target;
            // console.log(tar);
            if(tar.nodeName == 'LI') {
                /*
                实现div的显示与隐藏
                */ 
            }

        }
        
    }


    // 手机商品渲染到页面上
    async getPhone() {
        // 发送请求，获取json数据
        let data = await axios.get({url:'./js/phone.json'});
        // console.log(data);//[{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        // 遍历获取到的数据，追加到页面中
        let html = '';
        data.forEach(phone => {
            // console.log(phone,111);
            html += `<li class="item">
            <img src="${phone.src}" class="pic" alt="">
            <h3 class="item-name">${phone.name}</h3>
            <p class="item-info">${phone.info}</p>
            <p class="item-price">
            
            </p>
        </li>`;
        /*参数问题，价格加不上去
        <span class="present-price">${phone.present-price}</span>
        <span class="primary-price">${phone.primary-price}</span>
        【index.js:201 Uncaught (in promise) ReferenceError: price is not defined】
        */ 
        });
        // console.log(html);
        // 追加到页面
        this.phone.innerHTML = html;
    }
    
}
new Index();