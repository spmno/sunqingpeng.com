---
title:  Android组件Room
date: "2020-03-16T17:17:03.284Z"
description: "android data binding "
tags: ["android", "room"]
---

Room 持久性库在 SQLite 的基础上提供了一个抽象层，让用户能够在充分利用 SQLite 的强大功能的同时，获享更强健的数据库访问机制。  
<font color=red>谷歌官方强烈建议您使用 Room（而不是 SQLite）</font>具体可见：<https://developer.android.google.cn/training/data-storage/room>

Room 包含 3 个主要组件：

Database：包含数据库持有者，并作为应用已保留的持久关系型数据的底层连接的主要接入点。  
Entity：表示数据库中的表。  
DAO：包含用于访问数据库的方法。  

我们来看一下，三个组件的具体定义：
DataBase：定义数据库名称，外部访问的单例方法。
```
@Database(entities = {User.class}, version = 1)
public abstract class AppDataBase extends RoomDatabase {
    public abstract UserDao userDao();
    private static AppDataBase instance;

    static AppDataBase getInstance(final Context context) {
        if (instance == null) {
            synchronized (AppDataBase.class) {
                if (instance == null) {
                    instance = Room.databaseBuilder(context.getApplicationContext(), AppDataBase.class, "app")
                            .addCallback(callback)
                            .build();
                }
            }
        }
        return instance;
    }
}
```
Entity：定义数据库表的类型，包括其中的字段。
```
@Entity
public class User {
    @PrimaryKey(autoGenerate = true)
    public int id;
    private String firstName;
    private String lastName;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public User(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
```
DAO：定义访问数据库的方法，主要是完成SQL语句的注释。
```
@Dao
public interface UserDao {
    @Insert
    public long insertUser(User user);

    @Update
    public int updateUser(User user);

    @Delete
    public int deleteUser(User user);

    @Query("SELECT * FROM user")
    public LiveData<List<User>> getAllUser();

    @Query("DELETE FROM user")
    public void deleteAllUser();
}
```
使用方法见UserRepository：
```
public class UserRepository {
    private final UserDao userDao;
    private LiveData<List<User>> users;

    UserRepository(Application application) {
        AppDataBase db = AppDataBase.getInstance(application);
        userDao = db.userDao();
        users = userDao.getAllUser();
    }

    LiveData<List<User>> getUsers() {
        return users;
    }

    public void insert(User user) {
        new insertAsyncTask(userDao).execute(user);
    }

    private static class insertAsyncTask extends AsyncTask<User, Void, Void> {
        private UserDao asyncTaskUserDao;
        insertAsyncTask(UserDao userDao) {
            asyncTaskUserDao = userDao;
        }


        @Override
        protected Void doInBackground(User... users) {
            asyncTaskUserDao.insertUser(users[0]);
            return null;
        }
    }
}
```

