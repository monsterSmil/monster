/*
注册页面：使用正则验证表单格式，符合要求通过axios把数据存入json文件中【注册时判断设个账号是否被注册过】，然后跳转到登录页面
*/
class Register{
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
        this. psdMethod();
        this.comPsdMethod();
        this.comPsdMethod();
        this.saveData();
    }

    // 正则判断
    // 手机号正则判断
    phoneMethod() {
        // 文本框值不能为空,为空终止代码运行
        let reg = /^1[3-9]\d{9}$/;
        // 失去焦点时验证手机号
        // console.log(this.phoneNum);
        this.phoneNum.onblur = () => {
        if(!this.phoneNum.value) return;
            // console.log(this.sp);
            if(reg.test(this.phoneNum.value)) {
                this.sp[0].innerHTML = '√';
                this.sp[0].className = 'sp2';

            }else {
            //    console.log('no');
                this.sp[0].innerHTML = '×';
                this.sp[0].className = 'sp1';
            }
        
        }

    }

    // 密码正则判断
    psdMethod() {
        let reg=/^(\w){6,20}$/;
        // 失去焦点时验证密码
        this.psd.onblur = () => {
            if(!this.psd.value) return;
            if(reg.test(this.psd.value)) {
                this.sp[1].innerHTML = '√';
                this.sp[1].className = 'sp2';
            }else {
                this.sp[1].innerHTML = '×';
                this.sp[1].className = 'sp1';
            }
        
        }

    }

    //确认密码
    comPsdMethod() {
        // 失去焦点的时候判断确认密码框的值与密码框的值是否相同
        this.comPsd.onblur = () => {
            if(!this.psd.value) return;
            if( this.comPsd.value === this.comPsd.value) {
                this.sp[2].innerHTML = '√';
                this.sp[2].className = 'sp2'; 
            }else {
                this.sp[2].innerHTML = '×';
                this.sp[2].className = 'sp1';
            }
        }
       
    }

    // 判断邮箱正则
    emailMethod() {
        let reg =  /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
        this.email.onblur = () => {
            if(!this.email.value) return;
            if(reg.test(this.email.value)) {
                this.sp[3].innerHTML = '√';
                this.sp[3].className = 'sp2';
            }else {
                this.sp[3].innerHTML = '×';
                this.sp[3].className = 'sp1';
            }
        
        }
    }


    // 点击注册按钮后，所有表单值不为空的时候，把数据存入json文件中【判断账号是否注册过，跳转到登录页面
    saveData() {
        // console.log(this.submit);
        let that = this;
        this.submit.onclick = function() {
            // console.log(123);
            // console.log(that.phoneNum);
            // 表单值为空，终止代码运行
            // 获取所有input的值
            let phoneNum = that.phoneNum.value;
            let password = that.psd.value;
            let comPsd =  that.comPsd.value;
            let email = that.email.value;
            if(!phoneNum || !password || !comPsd || !email) {
                alert('表单不能为空');
                return;
            }
            // 不为空，先获取数据，判断账号是否被注册过，未注册把数据存入json文件
            that.judgeData(phoneNum,password,email);
            

            window.location.href = './login2.html';
        }
    }
    async judgeData(phoneNum,password,email) {
        let {data} = await axios.get('http://localhost:3000/users?phoneNum=' + phoneNum)
        console.log(data);
        
            if(data) {
                alert('账号已存在')
            }else{
                that.addData(phoneNum,password,email);
            }

        
        
    }
    addData(phoneNum,password,email) {
        // ajax请求，把数据存入JSON文件
        axios.post('http://localhost:3000/users', {
            phoneNum,
            pwd: password,
            email
          })
          .then(function (response) {
            console.log(response);
          })

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