/*首页点击商品，跳转到详情页*/
class Goods{
    constructor() {
        // 获取商品应该追加到的节点
        this.box = document.querySelector('.product-box');
        // console.log(this.box);
        this.boxDetail = document.querySelector('.details');
        // console.log(this.boxDetail);


        this.middle_lis = document.querySelectorAll('.h-list>li');
        // console.log(this.middle_lis);
        this.middle_div = document.querySelectorAll('.h-list>li>.down-menu-wrapper');
        // console.log(this.middle_div);

        this.add = document.querySelector('.details');
        // console.log(this.add);


        // 查询数据的全局
        this.goodData = null;

        this.goodsDetails();

        this.navDisplay();
        
    }

    // 渲染商品详情页信息
    async goodsDetails() {
        // console.log(window.location.href);
        let str = window.location.href;
        let idNum = str.split('?')[1].split('=')[1]
        // console.log(pid);//['http://localhost/test/goods-details.html', 'pid=1']
        // let id = pid[1];
        // // console.log(id);//pid=1
        // let num = id.split('=');
        // // console.log(num);//['pid', '1']
        // let idNum = num[1];
        // // console.log(idNum);
        let that = this;
        // 发送axios请求，获取数据
        let {data} = await axios.get(' http://localhost:3000/phone?id=' + idNum );
        // console.log(data);//[{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        
        Goods.goodData = data;
        // 遍历数组，取出每一个数组元素【每一个商品数据】
        let html = '';
        data.forEach(phone => {
            // console.log(phone);//{id: 1, src: 'https://z3.ax1x.com/2021/09/23/4wdy1P.jpg', name: 'Redmi K30 5G', info: '120Hz高帧率流速屏', nowPrice: '1799元', …}
            // html += `
            // <div class="product-box">
            // <!-- 左边轮播 -->
            // <div class="img-left">
            //     <div class="container">
            //         <ul class="wrapper">
            //             <div class="mask"></div>
            //             <img src="${phone.src}">
            //         </ul>
            //         <div class="bigPic">
            //             <img src="${phone.src}">
            //         </div>
            //     </div>
            // </div>
            // <!-- 右边产品介绍 -->
            // <div class="product-con">
            //     <h2>${phone.name}</h2>
            //     <p class="sale-decr">
            //         双模5G/三路并发/高通骁龙765G /7nm 5G低功耗处理器/120Hz高帧率流速屏/6.6''小孔径全面屏/索尼6400万前后六摄/最高可选8GB+256GB大存储/4500mAh+30W/快充/3D四曲面玻璃机身Ⅰ多功能NFC
            //     </p>
            //     <p class="company-info">
            //         小米自营
            //     </p>
            //     <p class="price-info">
            //         <span>
            //             ${phone.nowPrice}
            //         </span>
            //     </p>
            //     <div class="line">

            //     </div>
            //     <div class="product-address">
            //         <i class="iconfont icon-dingwei icon"></i>
            //         <div class="address-con">
            //             <div>
            //                 <div class="address-info">
            //                     <span>北京</span>
            //                     <span>北京市</span>
            //                     <span>海淀区</span>
            //                     <span>清河街道</span>
            //                     <a href="javascript;">修改</a>
            //                 </div>
            //             </div>
            //             <div class="storage">
            //                 <span>有现货</span>
            //             </div>
            //         </div>
            //     </div>
            //     <div class="buychoies">
            //         <div class="title fs18">
            //             选择颜色
            //         </div>
            //         <ul class="clearfix">
            //             <li title="紫玉幻境" class="active">
            //                 <a href="">
            //                     紫玉幻境
            //                 </a>
            //             </li>
            //         </ul>
            //     </div>
            //     <div class="selected-list">
            //         <ul>
            //             <li>
            //                 Redmi K30 5G 紫玉幻境 通用
            //                 <span class="fr">1799</span>
            //             </li>
            //         </ul>
            //         <div class="total-price">
            //             总计：1799
            //         </div>
            //     </div>
            //     <div class="btn-box">
            //         <div class="putin">  <a href="javascript:0;" onclick = "Goods.addGoods()">加入购物车</a></div>
            //         <div class="likes"> <a href="#"><i class="iconfont icon-xin"></i>喜欢</a></div>
            //     </div>
            //     <div class="after-sale-info">
            //         <span><a href="javascript:void(0);">
            //                 <i class="iconfont icon-tick"></i>
            //                 <em>小米自营</em>
            //             </a>
            //         </span>
            //         <span><a href="javascript:void(0);">
            //                 <i class="iconfont icon-tick"></i>
            //                 <em>小米发货</em>
            //             </a>
            //         </span>
            //         <span><a href="javascript:void(0);">
            //                 <i class="iconfont icon-tick"></i>
            //                 <em>7天无理由退货</em>
            //             </a>
            //         </span>
            //         <span><a href="javascript:void(0);">
            //                 <i class="iconfont icon-tick"></i>
            //                 <em>运费说明</em>
            //             </a>
            //         </span>
            //         <span><a href="javascript:void(0);">
            //                 <i class="iconfont icon-tick"></i>
            //                 <em>企业信息</em>
            //             </a>
            //         </span>
            //         <span><a href="javascript:void(0);">
            //                 <i class="iconfont icon-tick"></i>
            //                 <em>售后服务政策</em>
            //             </a>
            //         </span>
            //         <span><a href="javascript:void(0);">
            //                 <i class="iconfont icon-tick"></i>
            //                 <em>7天价格保护</em>
            //             </a>
            //         </span>
            //     </div>
            // </div>
            // </div>
            // `;
     
            html += `
                <div class="box">
                    <div class="smallBox">
                        <img src='${phone.src}'>
                        <div class="mask"></div>
                    </div>
                    <div class="bigBox">
                        <img src="${phone.src}" alt="">
                    </div>
                </div>
            `;
           
        });
        let htmladd = '';
        data.forEach(goods => {
            // console.log(add);
            htmladd += `<div class="product-con">
            <h2>Redmi K30 5G</h2>
            <p class="sale-decr">
                双模5G/三路并发/高通骁龙765G /7nm 5G低功耗处理器/120Hz高帧率流速屏/6.6''小孔径全面屏/索尼6400万前后六摄/最高可选8GB+256GB大存储/4500mAh+30W/快充/3D四曲面玻璃机身Ⅰ多功能NFC
            </p>
            <p class="company-info">
                小米自营
            </p>
            <p class="price-info">
                <span>
                
                </span>
            </p>
            <div class="line"></div>
            <div class="product-address">
                <i class="iconfont icon-dingwei icon"></i>
                <div class="address-con">
                    <div>
                        <div class="address-info">
                            <span>北京</span>
                            <span>北京市</span>
                            <span>海淀区</span>
                            <span>清河街道</span>
                            <a href="javascript;">修改</a>
                        </div>
                    </div>
                    <div class="storage">
                        <span>有现货</span>
                    </div>
                </div>
            </div>
            <div class="buychoies">
                <div class="title fs18">
                    选择颜色
                </div>
                <ul class="clearfix">
                    <li title="紫玉幻境" class="active">
                        <a href="">
                            紫玉幻境
                        </a>
                    </li>
                </ul>
            </div>
            <div class="selected-list">
                <ul>
                    <li>
                        Redmi K30 5G 紫玉幻境 通用
                        <span class="fr">￥1799</span>
                    </li>
                </ul>
                <div class="total-price">
                    现价：￥1799
                </div>
            </div>
            <div class="btn-box">
                <div class="putin">  <a href="javascript:0;" onclick = "Goods.addGoods(${goods.id},1)">加入购物车</a></div>
                <div class="likes"> <a href="#"><i class="iconfont icon-xin"></i>喜欢</a></div>
            </div>
            <div class="after-sale-info">
                <span><a href="javascript:void(0);">
                        <i class="iconfont icon-tick"></i>
                        <em>小米自营</em>
                    </a>
                </span>
                <span><a href="javascript:void(0);">
                        <i class="iconfont icon-tick"></i>
                        <em>小米发货</em>
                    </a>
                </span>
                <span><a href="javascript:void(0);">
                        <i class="iconfont icon-tick"></i>
                        <em>7天无理由退货</em>
                    </a>
                </span>
                <span><a href="javascript:void(0);">
                        <i class="iconfont icon-tick"></i>
                        <em>运费说明</em>
                    </a>
                </span>
                <span><a href="javascript:void(0);">
                        <i class="iconfont icon-tick"></i>
                        <em>企业信息</em>
                    </a>
                </span>
                <span><a href="javascript:void(0);">
                        <i class="iconfont icon-tick"></i>
                        <em>售后服务政策</em>
                    </a>
                </span>
                <span><a href="javascript:void(0);">
                        <i class="iconfont icon-tick"></i>
                        <em>7天价格保护</em>
                    </a>
                </span>
            </div>
        </div>`;
        });
        // 追加到详情页面上
        // console.log(that.box);
        that.box.innerHTML = html;
        that.add.innerHTML = htmladd;

        this.magnifier();
    }

    // 放大镜
    magnifier() {
        var smallBox = document.querySelector('.smallBox')
        var smallPic = document.querySelector('.smallBox>img')
        var bigBox = document.querySelector('.bigBox')
        var mask = document.querySelector('.mask')
        var bigPic = document.querySelector('.bigBox>img')
        // 划入显示
        smallBox.addEventListener('mouseover',function() {
            mask.style.display='block'
            bigBox.style.display='block'
        },false)
        // 划出隐藏
        smallBox.addEventListener('mouseout',function() {
            mask.style.display='none'
            bigBox.style.display='none'
        },false)

         // 鼠标跟随
         smallBox.onmousemove=(e)=>{
            e=e||window.event
            // 确定鼠标位置
            var x=e.pageX-smallBox.offsetParent.offsetLeft-mask.offsetWidth/2
            var y=e.pageY-smallBox.offsetParent.offsetTop-mask.offsetHeight/2

            // 判断边界
            if(x<=0){
                x=0
            }else if(x>=smallBox.offsetWidth-mask.offsetWidth){
                x=smallBox.offsetWidth-mask.offsetWidth
            }
            if(y<=0){
                y=0
            }else if(y>=smallBox.offsetHeight-mask.offsetHeight){
                y=smallBox.offsetHeight-mask.offsetHeight
            }

            // 赋值
            mask.style.left=x+'px'
            mask.style.top=y+'px'

            // 计算百分比,用移动距离/可移动的范围
            var w=x/(smallBox.offsetWidth-mask.offsetWidth)
            var h=y/(smallBox.offsetHeight-mask.offsetHeight)

             //给大图进行赋值操作（比例*大图可以移动的最大距离）
            bigPic.style.left=-w*(bigPic.offsetWidth-bigBox.offsetWidth)+'px'
            bigPic.style.top=-h*(bigPic.offsetHeight-bigBox.offsetHeight)+'px'
        }
    }

     // 详情页顶部导航栏显示与隐藏
     navDisplay() {
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

    // 加入购物车
    // static async addGoods() {
    //     // console.log(123);
    //     // 获取JSON中的数据，匹配当前点击的商品
    //            // 取出localStorage中存储的用户信息
    //     // let user = localStorage.getItem("user");
    //     // console.log(user);
    //     // 查询购物车中是否有点击的商品
    //     // let {data} = await axios.get('http://localhost:3000/mycart?phoneNum=' + user);
    // //     let goods = data[0].goodsList;
    // //     console.log(goods);// [{…}, {…}]
    // //     let isHave = false;
    // //     // 遍历数组，匹配id
    // //     if(goods.length == 0){

    // //     }else{

        
    // //     goods.forEach(item => {
    // //         // console.log(item);//{id: 1, src: 'https://z3.ax1x.com/2021/09/23/4wdy1P.jpg', info: '120Hz高帧率流速屏', name: 'Redmi K30 5G', nowPrice: '1799元', …}
    // //         // console.log(item.id);
    // //         // console.log(item.num);
    // //          // 判断购物车列表中是否该点击商品
    // //         if(item.id == this.goodData[0].id) {
    // //             item.num++;
    // //             isHave =true;
    // //         }
    // //     })
    // //     if(!isHave){
    // //         goods.push(this.goodData[0]);
    // //     }
    // // }

    // //     console.log("data",data)
    // //       //把input的值添加进json文件
    // //       axios.put('http://localhost:3000/mycart?phoneNum=' + user,{
    // //         phoneNum:user,
    // //         goodsList :goods
    // //     });
       
    // // }

    
   //加入购物车【id商品id，num商品数量】
   static addGoods(id, num) {
    // console.log(id,num);
    // 先去一边localStorage中的值
    let cartGoods = localStorage.getItem('cart');
    // console.log(cartGoods);//null第一次取是空的，因为没有cart这个键
    // 判断cart这个键里面是否有值
    if(cartGoods) {//如果cartgoods这里面有值，遍历对象修改数量
        // 获取的数据是JSON字符串，先解析
        cartGoods = JSON.parse(cartGoods);
        // console.log(cartGoods);
        // 判断商品是否购买【当前点击商品的id是否已存在在在购物车中】
        // 遍历cart
        for(let attr in cartGoods) {
            // console.log(attr);//attr就是商品的id
            // 如果attr等于商品id，改变数量
            // console.log(cartGoods[attr]);//num
            attr == id && (num = num + cartGoods[attr]);
        }
        // console.log(id, num);
        // 遍历数据存在就修改数量，数据不存在就添加数据
        cartGoods[id] = num;
        localStorage.setItem('cart',JSON.stringify(cartGoods));
    }else{//如果cart这个键里面没有值，就存入点击的商品id以及数量
        // 以商品id为键，数量为值，存入localStorage
        cartGoods = {[id]: num};
        localStorage.setItem('cart', JSON.stringify(cartGoods));
    }
   }
}
new Goods();





