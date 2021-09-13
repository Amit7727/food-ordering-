const order = require('../../../models/order')

function orderController()
{
    return {
        store(req,res){
            const { phone , address } = req.body
            if(!phone || !address){
                req.flash('error','all fields req');
                return res.redirect('/');
            }
            
            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone:phone,
                address : address
            })

            order.save().then(result =>{

                req.flash('sucess','Order placed placed')
                return res.redirect('/')

            }).catch(err =>{
                req.flash('error','went wrong');
                return res.redirect('/cart');
            })
        }
    }
}

module.exports = orderController;