class Nav {

    constructor(){

    }
    static cartNum(){
        let res = localStorage.getItem('cart');
        if(!res) return false;
        res = JSON.parse(res);

        let num = Object.getOwnPropertyNames(res).length;
        // console.log(num); 
          
        //获取购书车数量节点
        let buy = document.querySelector('.buy-cart span:last-child');
        // console.log(buy);  
        buy.innerHTML = num;
      
    }
 
}
new Nav;