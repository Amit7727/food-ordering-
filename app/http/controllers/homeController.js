
const menu = require('../../models/menu');

function homeController()
{

        return {
            async index(req,res){
                const pizzas  = await menu.find();
                //console.log(pizzas);
                res.render('home',{pizzas: pizzas})
                // menu.find().then(function(pizzas){
                //     console.log(pizzas);
                //     res.render('home',{pizzas: pizzas})
                // })
                
            }
        }
}

module.exports = homeController;