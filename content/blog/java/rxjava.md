---
title:  RxJava, Retrofit, LiveData 简单例子
date: "2020-03-18T12:10:03.284Z"
description: "Android网络数据获取入门，用RxJava加Retrofit和LiveData获取数据并显示"
tags: ["java", "rxjava", "retrofit", "livedata"]
---

例子比较简单，就是从通过Github的Api取用户相关的信息。显示在主界面上。
代码地址：<https://github.com/spmno/retrofit-test>

先给出环境：在app的gradle加下面库，更新为最新版本。
```
  implementation 'com.squareup.retrofit2:retrofit:2.7.2'
  implementation 'com.squareup.retrofit2:converter-gson:2.7.2'
  implementation 'com.squareup.retrofit2:adapter-rxjava2:2.7.2'
  implementation 'com.squareup.okhttp3:okhttp:4.4.0'
  implementation 'com.squareup.okhttp3:logging-interceptor:4.4.0'
  implementation "io.reactivex.rxjava2:rxjava:2.2.19"
  implementation 'io.reactivex.rxjava2:rxandroid:2.1.1'

  def lifecycle_version = "2.2.0"
  // ViewModel
  implementation "androidx.lifecycle:lifecycle-viewmodel:$lifecycle_version"
  // LiveData
  implementation "androidx.lifecycle:lifecycle-livedata:$lifecycle_version"
  // Lifecycles only (without ViewModel or LiveData)
  implementation "androidx.lifecycle:lifecycle-runtime:$lifecycle_version"

  // Saved state module for ViewModel
  implementation "androidx.lifecycle:lifecycle-viewmodel-savedstate:$lifecycle_version"
  // Annotation processor
  annotationProcessor "androidx.lifecycle:lifecycle-compiler:$lifecycle_version"
  // alternately - if using Java8, use the following instead of lifecycle-compiler
  implementation "androidx.lifecycle:lifecycle-common-java8:$lifecycle_version"
  // optional - ReactiveStreams support for LiveData
  implementation "androidx.lifecycle:lifecycle-reactivestreams:$lifecycle_version"
```
布局比较简单，就用了一个EditText来显示取回来的数据。这里就不贴代码了。  
1. 创建retrofit Api的interface:
```
import io.reactivex.Observable;
import retrofit2.http.GET;
import retrofit2.http.Path;
public interface GithubApi {
    @GET("users/{name}")
    Observable<GithubUserResponse> getUserInfo(@Path("name") String name);
}
```
因为API的地址是https://api.github.com/users/{name}，所以这里用了Path。
如果是参数的话，还可以用Query，比如下面例子：
```
public interface NewsApi {
    @GET("top-headlines")
    Observable<NewsResponse> getNewsList(@Query("sources") String newsSource, @Query("apiKey") String apiKey);
}
```
这种对应的API地址是：http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=7d60a0fa1dec462eb682c0e256f709a8。

2. 创建Retrofit Service:
```
import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;
public class RetrofitService {
    private static Retrofit retrofit;

    public static<T> T createGithubService(Class<T> serviceClass) {
        return createService(serviceClass, "https://api.github.com/");
    }

    private static<T> T createService(Class<T> serviceClass, String baseUrl) {
        HttpLoggingInterceptor logging = new HttpLoggingInterceptor();
        // set your desired log level
        logging.setLevel(HttpLoggingInterceptor.Level.BODY);

        OkHttpClient.Builder httpClient = new OkHttpClient.Builder();
        // add your other interceptors …

        // add logging as last interceptor
        httpClient.addInterceptor(logging);  // <-- this is the important line!

        retrofit = new Retrofit.Builder()
                .baseUrl(baseUrl)
                .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                .addConverterFactory(GsonConverterFactory.create())
                .client(httpClient.build())
                .build();

        return retrofit.create(serviceClass);
    }
}
```
这里加了Okhttp的HttpLoggingInterceptor工具，这个工具可以将Request和Response的Log都打出来，方便调试。
3. 建立Github的ViewModel，存储LiveData对象：
```
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.schedulers.Schedulers;
public class GithubUserViewModel extends ViewModel {
    public MutableLiveData<GithubUserResponse> getGithubUserResponseMutableLiveData() {
        return githubUserResponseMutableLiveData;
    }

    public void setGithubUserResponseMutableLiveData(MutableLiveData<GithubUserResponse> githubUserResponseMutableLiveData) {
        this.githubUserResponseMutableLiveData = githubUserResponseMutableLiveData;
    }

    MutableLiveData<GithubUserResponse> githubUserResponseMutableLiveData;

    public void getUserInfo() {
        GithubApi githubApi = RetrofitService.createGithubService(GithubApi.class);
        githubApi.getUserInfo("spmno")
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(
                    userInfo -> {githubUserResponseMutableLiveData.setValue(userInfo);},
                        throwable -> {
                            Log.e("GithubApi", throwable.toString());}
                );
    }
    //初始化LiveData
    public void init() {
        GithubUserResponse githubUserResponse = new GithubUserResponse();
        githubUserResponseMutableLiveData = new MutableLiveData<>(githubUserResponse);
    }
}
```
这里用了RxJava和Retrofit结合，将网络操作放到io线程，刷新UI的操作放到了主线程。
4. MainActivity，创建ViewModel
```
public class MainActivity extends AppCompatActivity {

    private ActivityMainBinding activityMainBinding;
    private GithubUserViewModel githubUserViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        activityMainBinding = ActivityMainBinding.inflate(LayoutInflater.from(this));
        setContentView(activityMainBinding.getRoot());
        githubUserViewModel = new ViewModelProvider(this).get(GithubUserViewModel.class);
        githubUserViewModel.init();
        githubUserViewModel.getGithubUserResponseMutableLiveData().observe(this,
                userInfo -> {
                    Log.i("Main", userInfo.toString());
                    activityMainBinding.editText.setText(userInfo.toString());
                }
        );
        githubUserViewModel.getUserInfo();
    }
}
```
这个例子就结束了，在谷歌推荐的架构中没有用到Repository，主要是功能太简单了。






