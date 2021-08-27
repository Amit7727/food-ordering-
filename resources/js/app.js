import axios from 'axios'
import Noty from 'noty'

let addtocart = document.querySelectorAll('.add-to-cart');
let cartcounter = document.querySelector('#cartcounter');




function updatecart(pizza)
{
    axios.post('./update-cart',pizza).then(res =>{

        cartcounter.innerText = res.data.totalQty
       
        new Noty({

            type : 'success',
            timeout: 1000,
            text: 'item added to cart'

        }).show();
        

    }).catch(err =>
        {
            new Noty({

                type : 'error',
                timeout: 1000,
                text: 'something went wrong'
    
            }).show();
        })
}

addtocart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        console.log(e);
        let pizza = JSON.parse(btn.dataset.pizza)
        updatecart(pizza);

        console.log(pizza);

    })
})