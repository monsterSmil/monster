/*
input失去焦点时正则验证，点击登录，判断input框不能为空，不为空，ajax获取【get】查看是否注册过
*/
class Login{
    constructor() {//作用：调用方法，添加属性
        // 获取2个input和登录按钮
        this.phone = this.$('.input-id');
        this.psd = this.$('.input-psd');
        this.login = this.$('.input-sub');
        // console.log(this.phone,this.psd);

        // this.judgeNum();
        // this.judgePsd();

        this. Loginbtn();
    }

    // 失去焦点时，手机号正则判断
    judgeNum() {
        let that = this;
        let reg = /^1[3-9]\d{9}$/;
        this.phone.onblur = function() {
            // console.log('lost');
            if(reg.test(that.phone.value)) {
                console.log('yes');
            }else {
                that.phone.value = '';
            }
        }
    }
    // 失去焦点时，正则判断密码
    judgePsd() {
        let that = this;
        let reg=/^(\w){6,20}$/;
        this.psd.onblur = function() {
            // console.log('lost');
            if(reg.test(that.psd.value)) {
                console.log('yes');
            }else {
                that.psd.value = '';
            }
        }
    }

    // 登录
     Loginbtn() {
        let that = this;
        this.login.onclick = function() {
            // 点击登录的时候，获取input的值
            let num = that.phone.value;
            let psd = that.psd.value;
            // // 发送请求get方式，匹配存不存在
            // let data =  axios.get('http://localhost:3000/users?phoneNum=' + num + '&pwd=' + psd);
            // console.log(data);
            that.judgeData(num, psd);
        }
    }

    // 判断值是否存在方法
    async judgeData(num, psd) {
        // 发送请求【get请求方式】查询账号密码是否存在在json中
        let {data} = await axios.get('http://localhost:3000/users?phoneNum=' + num + '&pwd=' + psd);
        // console.log(data);
        // 判断返回的数组值是否为空
        if(data.length === 0) {
            alert('账号不存在，去注册一个吧');
            window.location.href = './register.html';
        }else{
            // 登录的时候把账号密码存入了localStorage，查询购物车的时候，匹配当前账号的购物车
            localStorage.setItem('user', num);
            window.location.href = './index1.html';
        }
    }

    // // 点击登录时，判断内容不能为空【判断账号密码否和JSON文件中的一致，一致就跳转到首页】
    // // 封装获取元素的方法
    // async Loginbtn() {
    //     let that = this;
    //     this.login.onclick = function() {
    //         // 获取文本框和密码框的值
    //         let phoneNum = that.$('.input-id').value;
    //         let psd = that.$('.input-psd').value;
    //         // console.log(phoneNum, psd);
    //         if(!phoneNum == '') {

    //         }
    //         // let data = await axios.get('http://localhost:3000/users?phoneNum=' + phoneNum + '&pwd=' + psd);
    //         // console.log(data);
    //         // window.location.href = './index1.html';
    //     }
    // }
    $(ele) {
        return document.querySelector(ele);
    }

}
// 实例化类
new Login();