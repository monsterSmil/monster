/*
注册页面：使用正则验证表单格式，符合要求存入localStorage，然后跳转到登录页面
*/
class Register {
    constructor() {
        // 获取节点 手机号  密码  确认密码  邮箱
        this.phoneNum = this.$('.mi-form .input-id');
        this.psd = this.$('.mi-form .input-psd');
        this.comPsd = this.$('.mi-form .input-cpsd');
        this.email = this.$('.mi-form .eml');
        // console.log(this.phoneNum,this.psd,this.comPsd,this.email);
        this.sp = this.$$('.mi-form span');
        // console.log(this.sp);

        // 获取注册按钮
        this.submit = this.$('.mi-form .input-sub');
        // console.log(this.submit);
        //调用方法
        this.phoneMethod();
        this.psdMethod();
        this.comPsdMethod();
        this.comPsdMethod();
        this.saveData();
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

    //确认密码
    comPsdMethod() {
        // 失去焦点的时候判断确认密码框的值与密码框的值是否相同
        this.comPsd.onblur = () => {
            if (this.psd.value == this.comPsd.value) {
                this.sp[2].innerHTML = '√';
                this.sp[2].className = 'sp2';
            } else {
                this.sp[2].innerHTML = '×';
                this.sp[2].className = 'sp1';
            }
        }

    }

    // 判断邮箱正则
    emailMethod() {
        let reg = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
        this.email.onblur = () => {
            if (reg.test(this.email.value)) {
                this.sp[3].innerHTML = '√';
                this.sp[3].className = 'sp2';
            } else {
                this.sp[3].innerHTML = '×';
                this.sp[3].className = 'sp1';
            }

        }
    }


    // 点击注册按钮后，把数据存入localStorage中
    saveData() {
        this.submit.onclick = function () {

            let phoneNum = document.getElementById("phoneNum").value;
            let psd = document.getElementById("psd").value;
            let comPsd = document.getElementById("comPsd").value;
            let email = document.getElementById("email").value;
            //点击注册时，先判断所有表单内容不能为空、密码和确认密码必须相同
            console.log("comPsd", comPsd)
            console.log("phoneNum", phoneNum)
            if (phoneNum == null || psd == null || comPsd == null || email == null) {
                alert("用户信息不能为空")
                return;
            } else if (psd != comPsd) {
                alert("两次密码不一致")
                return;
            }
            let array
            //先获取所有用户的对象//变成数组
            if (window.localStorage.userArr) {
                array = JSON.parse(window.localStorage.userArr);
            } else {
                //创建一个新数组
                array = [];
            }
            console.log("user", JSON.stringify(array))
            //遍历数组进行匹配,查询用户是否注册
            for (let i = 0; i < array.length; i++) {
                //判断是否有相同账号
                if (phoneNum == array[i].phoneNum) {
                    alert("该账号已存在");
                    window.location.href = "./login2.html";
                    return;
                }
            }
            //创建用户对象
            let userObj = {
                phoneNum: phoneNum, psd: psd, comPsd: comPsd, email: email
            }
            // 将用户放入本地仓库
            array.push(userObj);
            window.localStorage.userArr = JSON.stringify(array);
            console.log("JSON.stringify(array)", JSON.stringify(array))
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
new Register();