class Cart {
    constructor() {//作用：添加属性，调用方法
        // 获取tbody
        this.tbody = document.querySelector('#cartTable tbody');
        // console.log(this.tbody);

        this.getCartGoods();
        this.checkAll();

        // 给tbody绑定点击事件【事件委托的对象】
        this.tbody.addEventListener('click', this.clickBubbleFn.bind(this));
    }

    // 判断操作的节点
    clickBubbleFn(e) {
        e = e || window.event;
        let tar = e.target;
        // console.log(tar);
        // 判断操作的是否为单个按钮
        tar.classList.contains('check-one') && this.oneCheckedFn(tar);
    }


    // 获取购物车数据
    async getCartGoods() {
        // 先取一遍localStorage中的数据
        let cartGoods = localStorage.getItem('cart');
        // console.log(cartGoods);
        // 如果没有数据，就终止代码
        if(!cartGoods) return;
        cartGoods = JSON.parse(cartGoods);
        // console.log(cartGoods);

        // 发送axios获取商品数据
        let {data} = await axios.get('http://localhost:3000/data');
        // console.log(data);//解构赋值
        // 循环商品信息，根据商品id取出购物车中的值，有值说明商品存在在购物车中
        let existsCartGoods = data.filter(item => {
            // console.log(item.id);//所有商品id值
            // console.log(cartGoods[item.id]);//存在商品数量，不存在undefined
            return cartGoods[item.id];
        });
        // 
        this.render(existsCartGoods, cartGoods);
    }

    // 渲染购物车列表
    // goodsData存在的商品数据， cg{1: 4, 2: 3, 3: 3, 6: 2}
    render(goodsData, cg) {
        // console.log(cg,goodsData);
        let html = '';
        goodsData.forEach(ele => {
            html += `<tr goods-id="${ele.id}">
                    <td class="checkbox">
                        <input class="check-one check" type="checkbox" />
                    </td>
                    <td class="goods">
                        <img src="${ele.src}" alt="" />
                        <span>${ele.name}</span>
                    </td>
                    <td class="price">${ele.nowPrice}</td>
                    <td class="count">
                        <span class="reduce">-</span>
                        <input class="count-input" type="text" value="${cg[ele.id]}" />
                        <span class="add">+</span>
                    </td>
                    <td class="subtotal">${parseInt(ele.nowPrice) * cg[ele.id]}</td>
                    <td class="operation">
                        <span class="delete">删除</span>
                    </td>
                    </tr>`
                    // console.log(cg[ele.id]);
                    // console.log(ele.nowPrice);//有单位，乘出来结果为NaN
        });
        // 追加到tbody中
        this.tbody.innerHTML = html;
    }


    // 实现全选按钮
    checkAll() {
        // 获取全选按钮节点
        let allObj = document.querySelectorAll('.check-all');
        // console.log(allObj);//NodeList才可以操作
        // 给全选按钮绑定点击事件，事件的回调函数的this指向的是节点对象，使用bind改变this指向
        allObj[0].addEventListener('click',this.allClickFn.bind(this,1))
        allObj[1].addEventListener('click',this.allClickFn.bind(this,0))
    }
    // 使用bind和event时，bind传递的参数在前
    allClickFn(checkAllIndex,event) {
        // console.log(this);//Cart {tbody: tbody}
        // 获取全选按钮的状态
        let status = event.target.checked;
        // 设置另一个按钮的状态
        let allObj = document.querySelectorAll('.check-all');
        // console.log(allObj);
        allObj[checkAllIndex].checked = status;
        // 单选按钮跟随全选按钮状态
        this.oneChecked(status);
        this.subTotal(status);
    }

    // 单个商品选中的状态【点击单个按钮委托给tbody】
    // 点击全选时，获取所有单选框，把全选按钮状态赋值给单选按钮
    oneChecked(status) {
        let allone = document.querySelectorAll('.check-one');
        // console.log(allone);
        allone.forEach(one => {
            one.checked = status;
        });
    }


    // 单个商品的状态【单个按钮全选中，全选选中，有一个没选中，全选不选】
    // 参数是单签点击的单个按钮
    oneCheckedFn(target) {
        this.subTotal();
        // console.log(target);
        // 判断当前点击单选按钮的状态
        if(target.checked) {
            // console.log(target.checked);//当前按钮选中为true
            let allone = document.querySelectorAll('.check-one');
            // console.log(allone);
            // some遍历所有的单选按钮
           let res = Array.from(allone).some(one => {
            //    console.log(one);
            // console.log(one.checked);//遍历所有单个按钮，选中的返回true，未选中的返回false
            return !one.checked;
           });
           //    console.log(res);//所有单个按钮选中的时候返回false
          // 所有单个按钮选中，全选选中，有一个单个按钮未选中，全选不选中
        //   res为真是进入循环
           if(!res) {
                let allObj = document.querySelectorAll('.check-all');
                // console.log(allObj);
                allObj[0].checked = true;
                allObj[1].checked = true;
           }
           }else {
                let allObj = document.querySelectorAll('.check-all');
                allObj[0].checked = false;
                allObj[1].checked = false;
        }
    }


    // 统计数量和价格【全选选中时，需要统计，单个按钮选中时需要统计（两处都要调用）】
    subTotal(sta = true) {
        // 总量和数量的变量
        let totalNum = 0, totalPrice = 0;
        // 获取所有的单个按钮节点，遍历出选中状态的单个按钮
        let allone = document.querySelectorAll('.check-one');
        // console.log(allone);
        sta && allone.forEach(ele => {
            // console.log(ele);
            // 判断当前的单个按钮状态
        })
    }

}
// 实例化类
new Cart();