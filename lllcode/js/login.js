/*
注册页面：使用正则验证表单格式，符合要求存入localStorage，然后跳转到登录页面
*/
class Login {
    constructor() {
        // 获取节点 手机号  密码
        this.phoneNum = this.$('.mi-form .input-id');
        this.psd = this.$('.mi-form .input-psd');
        this.sp = this.$$('.mi-form span');

        // 获取登录按钮
        this.submit = this.$('.mi-form .input-sub');

        //调用方法
        this.phoneMethod();
        this.psdMethod();
        this.login();
    }

    // 正则判断
    // 手机号正则判断
    phoneMethod() {
        // let that = this;
        // console.log(this.sp);
        // 判断输入框是否为空
        // if(!this.phoneNum.value) {
        //     // this.sp[0].innerHTML = '不能为空';
        //     return;
        // }
        let reg = /^1[3-9]\d{9}$/;
        // 失去焦点时验证手机号
        // console.log(this.phoneNum);
        this.phoneNum.onblur = () => {
            // console.log(this.sp);
            if (reg.test(this.phoneNum.value)) {
                this.sp[0].innerHTML = '√';
                this.sp[0].className = 'sp2';

            } else {
                //    console.log('no');
                this.sp[0].innerHTML = '×';
                this.sp[0].className = 'sp1';
            }

        }
    }

    // 密码正则判断
    psdMethod() {
        let reg = /^(\w){6,20}$/;
        // 失去焦点时验证密码
        this.psd.onblur = () => {
            if (reg.test(this.psd.value)) {
                this.sp[1].innerHTML = '√';
                this.sp[1].className = 'sp2';
            } else {
                this.sp[1].innerHTML = '×';
                this.sp[1].className = 'sp1';
            }

        }

    }


    // 点击登录按钮，从localStorage中取出数据
    login() {
        this.submit.onclick = function () {

            let phoneNum = document.getElementById("phoneNum").value;
            let psd = document.getElementById("psd").value;

            //点击登录时，先判断所有表单内容不能为空
            if (phoneNum == null || psd == null) {
                alert("用户信息不能为空")
                return;
            }
            let array
            //先获取所有用户的对象//变成数组
            if (window.localStorage.userArr) {
                //判断是否存在
                array = JSON.parse(window.localStorage.userArr);
            } else {
                //创建一个新数组
                array = [];
            }

            // 遍历数组进行匹配, 查询用户是否存在
            for (let i = 0; i < array.length; i++) {
                //判断是否有相同账号
                if (phoneNum == array[i].phoneNum) {
                    if (psd == array[i].phoneNum) {
                        window.location.href = "./index1.html";
                        return;
                    } else {
                        alert("密码错误！")
                        window.location.href = "./login2.html";
                        return;
                    }

                }
            }
            //创建用户对象
            let userObj = {
                phoneNum: phoneNum, psd: psd, comPsd: comPsd, email: email
            }
            // 将用户放入本地仓库
            array.push(userObj);
            window.localStorage.userArr = JSON.stringify(array);
            window.location.href = './login2.html';
        }
    }

    // 封装获取节点的方法
    // 单个节点
    $(ele) {
        return document.querySelector(ele);
    }

    // 多个节点
    $$(ele) {
        return document.querySelectorAll(ele);
    }

}


// 实例化类
new Login();