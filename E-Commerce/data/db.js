const {to} = require('await-to-js')
const {Sequelize, DataTypes} = require('sequelize')

let connection = new Sequelize(
    'E-Commerce',
    'root',
    '',{
        host     : 'localhost',
        dialect  : 'mysql' 
});

const Category = connection.define('Categories', {
    id : {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true 
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    Description:{
          type: DataTypes.STRING,
          allowNull: true
    }

})
const Product = connection.define('Products', {
    id : {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true 
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Description:{
          type: DataTypes.STRING,
          allowNull: true
    },
    price:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    Category_id:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        references:{
            model:'Categories',
            key:'id'
        }
    }    
});
const Customers=connection.define('Customers',{
    cname:{
        type:DataTypes.STRING,
        nonEmpty: true,
        notNull: true
    },
    email:{
        type:DataTypes.STRING,
        nonEmpty: true,
        notNull: true

    },
    encryptedPassword:{
        type: DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    Address:{
        type:DataTypes.STRING

    },
    Credit:{
        type:DataTypes.INTEGER
    }

});
const Cart=connection.define('Carts',{
    order_id : {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true,
       },
    product_name:{
        type:DataTypes.STRING,
        nonEmpty: true,
        notNull: true
    },
    product_id:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        references:{
            model:'Products',
            key:'id'
       }
    }
    ,
    price:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    p_Description:{
          type: DataTypes.STRING,
          allowNull: true
    },
    customer_name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Order_status:{
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue:"NOT ORDERD"
    }
    

});
const Orders=connection.define('Orders',{
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true 
    },
    product_name:{
        type:DataTypes.STRING,
        nonEmpty: true,
        notNull: true
    },
    product_id:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        references:{
            model:'Products',
            key:'id'
       }
    }
    ,
    price:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    p_Description:{
          type: DataTypes.STRING,
          allowNull: true
    },
    customer_name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    }


})

Category.hasMany(Product,{
        foreignKey:'Category_id'
});
Product.belongsTo(Category,{
    foreignKey:'Category_id'
}); 
Product.hasMany(Cart,{
    foreignKey:'product_id'
});
Cart.belongsTo(Product,{
foreignKey:'product_id'
}); 

/* 
Product.hasMany(reviewModel,{
    foreignKey:'product_id'
}); */



const connect = async () =>{
    let [err, res] = await to ( connection.sync( {alter:true} ) )
    if (err){
        console.log('Error connecting to DB')
        return
    }
    console.log('Successfully connected to DB')
}
connect();

module.exports = {
     Category,Product,Customers,Cart,Orders
}