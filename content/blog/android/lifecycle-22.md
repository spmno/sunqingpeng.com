---
title:  弃用 ViewModelProviders.of()，lifecycle2.2变化
date: "2020-03-11T11:37:03.284Z"
description: " 弃用 ViewModelProviders.of()，lifecycle2.2变化，lifecycle-extensions已经被弃用"
tags: ["android", "lifecycle"]
---

今天用Android官方文档试用ViewModel时发现之前的lifecycle-extensions中的 ViewModelProviders.of()不能用了。  
看了 Lifecycle 的 Release Note才发现，lifecycle-extensions已经被弃用了。以下引用原文：  
* Lifecycle 协程集成：新的 lifecycle-runtime-ktx 工件实现了 Lifecycle 协程与 Kotlin 协程之间的集成。此外，我们还扩展了 lifecycle-livedata-ktx 以便利用协程的优势。如需了解详情，请参阅将 Kotlin 协程与架构组件一起使用。  
* 弃用 ViewModelProviders.of()：已弃用 ViewModelProviders.of() 。您可以将 Fragment 或 FragmentActivity 传递给新的 ViewModelProvider(ViewModelStoreOwner) 构造函数，以便在使用 Fragment 1.2.0 时实现相同的功能。  
* 弃用 lifecycle-extensions 工件：在上面弃用 ViewModelProviders.of() 后，此版本标志着弃用 lifecycle-extensions 中的最后一个 API，因此现在该工件已完全被弃用。我们强烈建议您根据所需的具体 Lifecycle 工件（例如，如果您使用 LifecycleService，则为 lifecycle-service；如果您使用 ProcessLifecycleOwner，则为 lifecycle-process）而不是 lifecycle-extensions 来做判断，因为 lifecycle-extensions 将不会有 2.3.0 这个未来版本。  
* Gradle 增量注释处理器：Lifecycle 的注释处理器默认为增量处理器。如果您的应用是用 Java 8 编程语言编写的，则可以使用 DefautLifecycleObserver；如果是用 Java 7 编程语言编写的，则可以使用 LifecycleEventObserver。  

附上具体依赖项：
```
    dependencies {
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

        // optional - Test helpers for LiveData
        testImplementation "androidx.arch.core:core-testing:$lifecycle_version"
    }
```
THE END