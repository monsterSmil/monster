class TabChange {
    constructor() {
        this.liEles = document.querySelectorAll('li')
        this.abtnEles = document.querySelectorAll('span')
        // console.log( this.abtnEles);

        // 获取第一个li
        this.liObj = document.querySelectorAll('ul>li')
        // console.log(this.liObj[0]);
        console.log(this.liObj);

        // this.ontab();
        // 循环遍历sp的时候，第一次没有点击，不能渲染页面，默认传递第一个
        this.dataList(1)
        this.spClick();
    }

    // 选项卡切换
    // ontab() {
    //     //指向发生改变，先把this指向赋值给一个新的变量保存起来
    //     let _this = this
    //     for (var i = 0; i < this.abtnEles.length; i++) {
    //         //设置一个自定义属性用于存储按钮的下标（这里虽然i表示的是按钮的下标，但是不能直接用i,因为循环里面出现了事件，
    //         // 会先把循环执行完毕，在执行事件，会导致i是一个固定的值（就是循环判断条件完毕后的那个值））
    //         this.abtnEles[i].setAttribute('index', i)
    //         this.abtnEles[i].onclick = function () {
    //             // 在事件里面获取当前按钮的自定义属性,getAttribute('属性名称') 获取的是属性节点的值
    //             var index = this.getAttribute('index')
    //             // console.log(index);
    //             //排他思想，先排除所有人，再给自己设置，用到循环
    //             for (var j = 0; j < _this.abtnEles.length; j++) {
    //                 _this.abtnEles[j].className = ''
    //                 _this.liEles[j].className = ''
    //             }
    //             //给自己设置样式,this指向的是当前的事件调用者
    //             this.className = 'bg'
    //             _this.liEles[index].className = 'show'
    //         }
    //     }
    // }


    // 每个页面选项只渲染8条数据
    // 选项卡商品渲染
    async dataList(num) {
        // console.log(num);
        let that = this;
        // 获取对应li的索引
        // 页码是一个变量
        let {data} = await axios.get('http://localhost:3000/data?_page=' +num +'&_limit=8' );
        // console.log(data);//获取到了JSON中的48条数据[{},{}...]
        // 遍历数据
        let html = '';
        data.forEach(item => {
            // console.log(item);
            html +=`
                <div class="clearfix">
                    <img src="${item.src}"">
                    <div class="text">
                        <p>${item.name}</p>
                        <p>${item.info}</p>
                        <p>${item.nowPrice}</p>
                    </div>
                </div>`;
        });
        // li索引从0开始，page从1开始，减1
        let index = num - 1;
        that.liObj[index].innerHTML = html;
    }


    // span点击事件
    // spClick() {
    //     let that = this;
    //     this.abtnEles.forEach((item, index) => {
    //         // console.log(item,index);
    //         item.onclick = function() {

    //             // console.log(111);
    //             let num = index + 1;
    //             that.dataList(num);
    //         }
    //     })
    // }
/*选项卡分类，鼠标点击每个按钮【index从0开始】，显示相应的li【index从0开始】，调用渲染页面的方法
渲染页面，请求数据页码是变量，需要改变的【num从1开始】，把遍历的index【index+1】作为参数传递给渲
染页面的方法。渲染到所有li下面，接收的参数是从1开始，参数需要减1*/
    spClick() {
        let _this = this;
        this.abtnEles.forEach((item, index) => {
            // console.log(item,index);
            item.onclick = function() {
                for (var j = 0; j < _this.abtnEles.length; j++) {
                    _this.abtnEles[j].className = ''
                    _this.liEles[j].className = ''
                }
                //给自己设置样式,this指向的是当前的事件调用者
                this.className = 'bg'
                _this.liEles[index].className = 'show'
                // console.log(111);
                let num = index + 1;
                _this.dataList(num);
            }
        })
    }
}
new TabChange();
// const tabone=new TabChange()
// tabone.ontab()
