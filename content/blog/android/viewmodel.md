---
title:  Android ViewModel 例子
date: "2020-03-11T15:37:03.284Z"
description: "android viewmodel  小例子，通过例子学习ViewMode+LiveData "
tags: ["Android", "ViewModel", "LiveData"]
---

[ViewModel](https://developer.android.google.cn/topic/libraries/architecture/viewmodel)是Android Jetpack的重要组成部分，加上LiveData还可以自己更新数据，业务数据相关的逻辑应该都放到这里。  

直接上代码，例子实现数据初始化显示，点击变更按钮后，数据自己更新。  
Layout: 两个TextView，一个Button
```
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/textFirst"
        android:layout_width="wrap_content"
        android:layout_height="19dp"
        android:text=""
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/textLast"
        android:layout_width="wrap_content"
        android:layout_height="19dp"
        android:text=""
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.26" />

    <Button
        android:id="@+id/button"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="@string/button"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textFirst"
        android:onClick="changeData"
        />

</androidx.constraintlayout.widget.ConstraintLayout>
```
User数据：
```
public class User {
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

    private String firstName;
    private String lastName;
    public User(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
```
ViewModel: 存储数据User，提供修改数据接口  
```
public class MyViewModel extends ViewModel {
    private MutableLiveData<List<User>> users;
    User hello = new User("hello", "world");
    User nihao = new User("ni", "hao");
    List<User> userList = new ArrayList<User>();

    public LiveData<List<User>> getUsers() {
        if (users == null) {
            users = new MutableLiveData<List<User>>();
            loadUsers();
        }
        return users;
    }

    private void loadUsers() {
        userList.add(hello);
        users.setValue(userList);
    }

    public void changeData() {
        userList.set(0, nihao);
        users.setValue(userList);  //会通知观察者数据的变化
    }
}
```
Activity：用了view binding，注册数据事件，有数据更新时，自己更新UI  
```
public class MainActivity extends AppCompatActivity {
    private ActivityMainBinding mainBinding;
    private MyViewModel viewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mainBinding = ActivityMainBinding.inflate(LayoutInflater.from(this));
        setContentView(mainBinding.getRoot());
        viewModel = new ViewModelProvider(this).get(MyViewModel.class);
        viewModel.getUsers().observe(this, users -> {
            mainBinding.textFirst.setText(users.get(0).getFirstName());
            mainBinding.textLast.setText(users.get(0).getLastName());
        });
    }

    public void changeData(View view) {
        viewModel.changeData();
    }
}
```
