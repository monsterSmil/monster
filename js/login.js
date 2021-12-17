/*
input失去焦点时正则验证，点击登录，判断input框不能为空，不为空，ajax获取【get】查看是否注册过
*/
class Login{
    constructor() {//作用：调用方法，添加属性
        // 获取2个input和登录按钮
        this.phone = this.$('.input-id');
        this.psd = this.$('.input-psd');
        this.login = this.$('.input-sub');
        console.log(this.phone,this.psd);

    }

    // 失去焦点时，手机号正则判断

    // 封装获取元素的方法
    $(ele) {
        return document.querySelector(ele);
    }

}
// 实例化类
new Login();