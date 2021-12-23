class Index {
    constructor() {
        // 获取节点【轮播图】
        this.container = document.querySelector('.banner-img')
        this.pic = this.container.children
        // console.log(this.pic);
        this.prev = document.querySelector('.icon-left')
        this.next = document.querySelector('.icon-right')
        this.circleBtn = document.querySelector('.banner-disc')
        
        

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
        // console.log( this.middle_lis);//11个li
        // console.log( this.middle_div);//8个div

        // 吸顶效果
        this.phoneHead = document.querySelector('.c-item1');
        this.loft = document.querySelector('.home-loft');
        // console.log(this.phoneHead,this.loft);
        
        // 电梯样式
        this.lofting = document.querySelector('.home-loft>ul');
        this.loftChild = this.lofting.querySelectorAll('li');
        // console.log(this.loftChild);
        // console.log(this.lofting);

        this.electric = document.querySelector('.item-con>.elec');
        // console.log(this.electric,222);
        // 获取节点【手机商品渲染,要追加到的手机列表】
        this.phone = document.querySelector('.item-con .items')
        // console.log(this.phone,111);

       
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
        this. leftDisplay()
        this.middleDisplay()
        this. Ceiling() 
        this.phoneList()
        this.electricList()
        Nav.cartNum()
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
    // leftDisplay() {
    //     let that = this;
    //     //事件委托给ul【鼠标移入，li有背景色，div显示】
    //     this.l_list.onmouseover = function(e) {
    //         e = e || window.event;
    //         let tar = e.target;
    //         // console.log(tar);
    //         // 判断当前鼠标移入的是不是li
    //         if(tar.nodeName == 'LI') {
    //             for(let i = 0; i < that.liChild.length; i++) {
    //                 that.liChild[i].style.background = '';
    //             }
    //             tar.style.background = 'rgb(255, 103, 0)';
    //             tar.querySelector('.child-list').style.display = 'block';
    //         }
    //     }
    //     // 鼠标移出，li没有背景色，div隐藏
    //     this.l_list.onmouseout = function(e) {
    //         e = e || window.event;
    //         let tar = e.target;
    //         console.log(tar);
    //         if(tar.nodeName == 'LI') {
    //             for(let i = 0; i < that.liChild.length; i++) {
    //                 that.liChild[i].style.background = '';
    //             }
    //             tar.style.background = '';
    //             tar.querySelector('.child-list').style.display = 'none';
    //         }
    //     }
    // }
    //左侧菜单显示与隐藏
    leftDisplay() {
        // 循环所有li，给每个里绑定事件
        let that = this;
        for(let i = 0; i < this.liChild.length; i++) {
            // 鼠标移入
            this.liChild[i].onmouseover = function() {
                // console.log(111);
                // 遍历循环所有li，清除所有li的样式，给当前里添加样式
                // console.log(that.liChild);
                for(let j = 0; j < that.liChild.length; j++) {
                    that.liChild[j].style.background = '';
                }
                that.liChild[i].style.background = 'rgb(255, 103, 0)';
                that.liChild[i].querySelector('.child-list').style.display = 'block';
            }
            // 鼠标移出
            this.liChild[i].onmouseout = function() {
                // console.log(111);
                // console.log(that.liChild);
                for(let j = 0; j < that.liChild.length; j++) {
                    that.liChild[j].style.background = '';
                }
                // that.liChild[i].style.background = '';
                that.liChild[i].querySelector('.child-list').style.display = 'none';
            }
        }
    }
    // 中间header显示与隐藏
    middleDisplay() {
        // 当鼠标移入在li身上时，当前div显示，离开隐藏【获取所有li，绑定事件，获取所有div】
        let that = this;
        // console.log(that.middle_lis);
        // 遍历循环给每个li绑定事件
        for(let i = 1; i < 9; i++) {
            that.middle_lis[i].onmouseover = function() {
            // console.log( that.middle_lis[i].querySelector('.down-menu-wrapper') );
            let div = that.middle_lis[i].querySelector('.down-menu-wrapper');
            div.style.display = 'block';
            }

            that.middle_lis[i].onmouseout = function() {
            // console.log( that.middle_lis[i].querySelector('.down-menu-wrapper') );
            let div = that.middle_lis[i].querySelector('.down-menu-wrapper');
            div.style.display = 'none';
            }
        }
        
    }

    // 吸顶效果【滚动事件】
    Ceiling() {
        // 当卷去的高度大于等于手机模块的高度时，电梯出现
        let that = this;
        // 滚动事件
        onscroll = function() {
            let lis = that.loft.querySelectorAll('li');
            // console.log(lis);
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            // 判断滚动距离是否到达手机模块的高度，到达电梯出现
            if(scrollTop >= 700) {
                that.loft.style.display = 'block'
                // 手机
                if(scrollTop < 1460) {
                    lis[0].classList.add('active');
                }else {
                    lis[0].classList.remove('active');
                }
                // 家电
                if(scrollTop >= 1460 && scrollTop <= 2165) {
                    lis[1].classList.add('active');
                }else {
                    lis[1].classList.remove('active');
                }
                // 智能
                if(scrollTop >= 2165 && scrollTop <= 2960) {
                    lis[2].classList.add('active');
                }else {
                    lis[2].classList.remove('active');
                }
                // 搭配
                if(scrollTop >= 2960 && scrollTop <= 3675) {
                    lis[3].classList.add('active');
                }else {
                    lis[3].classList.remove('active');
                }
                // 配件
                if(scrollTop >= 3675 && scrollTop <= 4406) {
                    lis[4].classList.add('active');
                }else {
                    lis[4].classList.remove('active');
                }
                // 周边
                if(scrollTop >= 4406 && scrollTop <= 5131) {
                    lis[5].classList.add('active');
                }else {
                    lis[5].classList.remove('active');
                }
                // 视频
                if(scrollTop >5131) {
                    lis[6].classList.add('active');
                }else {
                    lis[6].classList.remove('active');
                }
            }else {
                that.loft.style.display = 'none'
            }
        }

    }
    // 电梯样式
    // Loft() {
    //     let that = this;
    //     // 点击a的时候，给li添加样式
    //     // 遍历循环所有li，点击谁给谁添加样式，其余样式清除【排他】【事件委托】
    //     // console.log(this.lofting);
    //     this.lofting.onclick = function(e) {
    //         e = e || window.event;
    //         let tar = e.target;
    //         // console.log(tar);
    //         if(tar.nodeName == 'LI') {
    //             // console.log(tar);
               
    //             for(let i = 0; i < that.loftChild.length; i++ ) {
    //                 // console.log(111);
    //                 // 清空所有li的样式
    //                 that.loftChild[i].className = '';
    //             }
    //             tar.className = 'active ';

    //         }
    //     }



    //     // let that = this;
    //     // //事件委托给ul【鼠标移入，li有背景色，div显示】
    //     // this.lofting.click = function(e) {
    //     //     e = e || window.event;
    //     //     let tar = e.target;
           
    //     //     // 判断当前鼠标移入的是不是a
    //     //     if(tar.nodeName == 'LI') {
    //     //         for(let i = 0; i < that.loftChild.length; i++) {
    //     //             that.loftChild[i].className = '';
    //     //         }
    //     //         tar.className = 'active';
    //     //     }
    //     // }
        
    // }


    // 手机商品渲染到页面上
    // async getPhone() {
    //     // 发送请求，获取json数据
    //     let data = await axios.get({url:'./js/phone.json'});
    //     // console.log(data);//[{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    //     // 遍历获取到的数据，追加到页面中
    //     let html = '';
    //     data.forEach(phone => {
    //         // console.log(phone,111);
    //         html += `<li class="item">
    //         <img src="${phone.src}" class="pic" alt="">
    //         <h3 class="item-name">${phone.name}</h3>
    //         <p class="item-info">${phone.info}</p>
    //         <p class="item-price">
    //         <span class="present-price">${phone.presentprice}</span>
    //         <span class="primary-price">${phone.primaryprice}</span>
    //         </p>
    //     </li>`;
       
    //     });
    //     // console.log(html);
    //     // 追加到页面
    //     this.phone.innerHTML = html;
    // }
    


    
    // 首页渲染手机商品页面
    async phoneList() {
        let that = this;
        // 发送axios请求，获取Phone的数据
        let {data} = await axios.get('http://localhost:3000/phone');
        // console.log(data);//[{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        // 遍历数组取出元素
        let html = '';
        data.forEach(phone => {
            // console.log(phone);//{id: 1, src: 'https://z3.ax1x.com/2021/09/23/4wdy1P.jpg', name: 'Redmi K30 5G', info: '120Hz高帧率流速屏', nowPrice: '1799元', …}
            html += `
            <li class="item"> <a href="./goods-details.html?pid=${phone.id}" >
            <img src="${phone.src}" alt="">
            <h3 class="item-name">${phone.name}</h3>
            <p class="item-info">${phone.info}</p>
            <p class="item-price">
                <span class="present-price">${phone.nowPrice}</span>
                <span class="primary-price">${phone.oldPrice}</span>
            </p></a>
        </li>`;
        })
        // 追加到手机商品页面上
        that.phone.innerHTML = html;
    }

    // 首页渲染家电商品
    async electricList() {
        let that = this;
        // console.log(that);
        // 发送请求，获取数据
        let {data} = await axios.get('http://localhost:3000/equipment');
        // console.log(data);//[{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        // 遍历数组每一个数据追加到页面中
        let html = '';
        data.forEach(elec => {
            // console.log(elec);//{id: 1, src: './img/家电2.webp', name: 'Redmi K30 5G', info: '120Hz高帧率流速屏', nowPrice: '1799元', …}
            html += `
            <li class="item"> <a href="./goods-details.html?pid=${elec.id}" >
                <img src="${elec.src}" alt="">
                <h3 class="item-name">${elec.name}</h3>
                <p class="item-info">${elec.info}</p>
                <p class="item-price">
                    <span class="present-price">${elec.nowPrice}</span>
                    <span class="primary-price">${elec.oldPrice}</span>
                </p></a>
            </li>`;
        });
        // console.log( that.electric);
        that.electric.innerHTML = html;

    }

    // static cartNum() {
    //     let res = localStorage.getItem('cart');
    //     if(!res) return false
    //     res = JSON.parse(res);

    //     let num = Object.getOwnPropertyNames(res).length;
    //     // console.log(num); 
          
    //     //获取购书车数量节点
    //     let buy = document.querySelector('.buy-cart span:last-child');
    //     // console.log(buy);  
    //     buy.innerHTML = num;
    // }
}
new Index();