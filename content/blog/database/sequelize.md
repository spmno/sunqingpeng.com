---
title:  sequelize简单使用
date: "2020-04-06T15:46:15.284Z"
description: "sequelize简单使用"
tags: ["database", "mysql", "sequelize"]
---

    安装：
        ```
        npm install --save sequelize
        
        你还必须手动为所选数据库安装驱动程序：
        选择以下之一:
        npm install --save pg pg-hstore # Postgres
        npm install --save mysql2
        npm install --save mariadb
        npm install --save sqlite3
        npm install --save tedious # Microsoft SQL Server
        ```
1. 测试配置是否正确：
   ```
    async function test(){
        try {
            const sequelize = new Sequelize(databaseName, userName, password, {
                host: 'localhost',
                dialect: 'mysql'
            });
            await sequelize.authenticate();
            console.log('Connection has been established successful.');
        } catch(error) {
            console.error('Unable to connect to database: ', error);
        }
    }

    test();
   ```
2. 建立表，有两种方法：  
  调用 sequelize.define(modelName, attributes, options)  
  扩展 Model 并调用 init(attributes, options)  
  ```
    使用 sequelize.define:
    const { Sequelize, DataTypes } = require('sequelize');
    const sequelize = new Sequelize('sqlite::memory:');

    const User = sequelize.define('User', {
    // 在这里定义模型属性
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull 默认为 true
    }
    }, {
    // 这是其他模型参数
    });

    // `sequelize.define` 会返回模型
    console.log(User === sequelize.models.User); // true
    ------------------------------------------------------------------------
    扩展 Model
    const { Sequelize, DataTypes, Model } = require('sequelize');
    const sequelize = new Sequelize('sqlite::memory');

    class User extends Model {}

    User.init({
    // 在这里定义模型属性
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull 默认为 true
    }
    }, {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'User' // 我们需要选择模型名称
    });

    // 定义的模型是类本身
    console.log(User === sequelize.models.User); // true
  ```
4. 实例操作：
  创建实例：  
  `const jane = User.build({ name: "Jane" });  `  
  保存数据：
  `await jane.save();  `  
  创建并保存：  
  `const jane = await User.create({ name: "Jane" });`  
  删除实例：  
  `await jane.destroy();`  
  select查询：    
    查询全部  
    `const users = await User.findAll();`  
    根据属性查询
    ```
    Model.findAll({
    attributes: ['foo', 'bar']
    });
    ```
    where查询：
        ```
        Post.findAll({
        where: {
            authorId: 2
        }
        });  
        ```
    传递多个条件：
    ```
    Post.findAll({
      where: {
        authorId: 12
        status: 'active'
      }
    });
    ```
    带操作符：
    ```
    const { Op } = require("sequelize");
    Post.findAll({
      where: {
        [Op.or]: [
          { authorId: 12 },
          { authorId: 13 }
        ]
      }
    });
    ```  
    通用操作符：  
    ```
      [Op.eq]: 3,                              // = 3
      [Op.ne]: 20,                             // != 20
      [Op.is]: null,                           // IS NULL
      [Op.not]: true,                          // IS NOT TRUE
      [Op.or]: [5, 6],                         // (someAttribute = 5) OR (someAttribute = 6)

      // 使用方言特定的列标识符 (以下示例中使用 PG):
      [Op.col]: 'user.organization_id',        // = "user"."organization_id"

      // 数字比较
      [Op.gt]: 6,                              // > 6
      [Op.gte]: 6,                             // >= 6
      [Op.lt]: 10,                             // < 10
      [Op.lte]: 10,                            // <= 10
      [Op.between]: [6, 10],                   // BETWEEN 6 AND 10
      [Op.notBetween]: [11, 15],               // NOT BETWEEN 11 AND 15

      // 其它操作符

      [Op.all]: sequelize.literal('SELECT 1'), // > ALL (SELECT 1)

      [Op.in]: [1, 2],                         // IN [1, 2]
      [Op.notIn]: [1, 2],                      // NOT IN [1, 2]

      [Op.like]: '%hat',                       // LIKE '%hat'
      [Op.notLike]: '%hat',                    // NOT LIKE '%hat'
      [Op.startsWith]: 'hat',                  // LIKE 'hat%'
      [Op.endsWith]: 'hat',                    // LIKE '%hat'
      [Op.substring]: 'hat',                   // LIKE '%hat%'
      ```
    UPDATE数据：  
    ```
    await User.update({ lastName: "Doe" }, {
        where: {
        lastName: null
        }
    });
    ```
    DELETE数据：
    ```
    await User.destroy({
        where: {
            firstName: "Jane"
        }
    });
    ```
    // 截断表格
    ```
    await User.destroy({
        truncate: true
    });  
    ```
    排序和分组：  
    Sequelize 提供了 order and group 参数,来与 ORDER BY 和 GROUP BY 一起使用.
    ```
    Subtask.findAll({
        order: [
            // 将转义 title 并针对有效方向列表进行降序排列
            ['title', 'DESC'],
            // 将按最大年龄进行升序排序
            sequelize.fn('max', sequelize.col('age')),
            // 将按最大年龄进行降序排序
            [sequelize.fn('max', sequelize.col('age')), 'DESC'],
            // 将按 otherfunction(`col1`, 12, 'lalala') 进行降序排序
            [sequelize.fn('otherfunction', sequelize.col('col1'), 12, 'lalala'), 'DESC'],
            // 将使用模型名称作为关联名称按关联模型的 createdAt 排序.
            [Task, 'createdAt', 'DESC'],
            // 将使用模型名称作为关联名称通过关联模型的 createdAt 排序.
            [Task, Project, 'createdAt', 'DESC'],
            // 将使用关联名称按关联模型的 createdAt 排序.
        ['Task', 'createdAt', 'DESC'],
            // 将使用关联的名称按嵌套的关联模型的 createdAt 排序.
            ['Task', 'Project', 'createdAt', 'DESC'],
            // 将使用关联对象按关联模型的 createdAt 排序. (首选方法)
            [Subtask.associations.Task, 'createdAt', 'DESC'],
            // 将使用关联对象按嵌套关联模型的 createdAt 排序. (首选方法)
            [Subtask.associations.Task, Task.associations.Project, 'createdAt', 'DESC'],
            // 将使用简单的关联对象按关联模型的 createdAt 排序.
            [{model: Task, as: 'Task'}, 'createdAt', 'DESC'],
            // 将由嵌套关联模型的 createdAt 简单关联对象排序.
            [{model: Task, as: 'Task'}, {model: Project, as: 'Project'}, 'createdAt', 'DESC']
        ],
        // 将按最大年龄降序排列
        order: sequelize.literal('max(age) DESC'),
        // 如果忽略方向,则默认升序,将按最大年龄升序排序
        order: sequelize.fn('max', sequelize.col('age')),
        // 如果省略方向,则默认升序, 将按年龄升序排列
        order: sequelize.col('age'),
        // 将根据方言随机排序(但不是 fn('RAND') 或 fn('RANDOM'))
        order: sequelize.random()
    });

    Foo.findOne({  
        order: [  
            // 将返回 `name`  
            ['name'],  
            // 将返回 `username` DESC  
            ['username', 'DESC'],  
            // 将返回 max(`age`)  
            sequelize.fn('max', sequelize.col('age')),  
            // 将返回 max(`age`) DESC  
            [sequelize.fn('max', sequelize.col('age')), 'DESC'],  
            // 将返回 otherfunction(`col1`, 12, 'lalala') DESC  
            [sequelize.fn('otherfunction', sequelize.col('col1'), 12, 'lalala'), 'DESC'],  
            // 将返回 otherfunction(awesomefunction(`col`)) DESC, 这种嵌套可能是无限的!  
            [sequelize.fn('otherfunction', sequelize.fn('awesomefunction', sequelize.col('col'))), 'DESC']  
        ]
    });  
    ```
    限制和分页：
    // 提取10个实例/行    
    `Project.findAll({ limit: 10 });  `  
    // 跳过8个实例/行  
    `Project.findAll({ offset: 8 });  `  
    // 跳过5个实例,然后获取5个实例  
    `Project.findAll({ offset: 5, limit: 5 });  `  