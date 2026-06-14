
# POSIX 线程（Pthreads）

 iOS 系统架构中，Pthreads 位于 Darwin 核之上，是苹果所有高层多线程技术的实现基础
    - 实现链条：Mach 线程（内核级）→ Pthreads（底层接口）→ NSThread（封装层）→ GCD/Operation（任务级调度）。
    - iOS 完整支持 POSIX 标准，通过引入 <pthread.h> 即可调用 C 语言原生的线程接口。

- 动态初始化：使用 pthread_mutex_init 函数，可自定义属性。
- 加锁：pthread_mutex_lock(&mutex);（若已被锁则阻塞）或 pthread_mutex_trylock（非阻塞）。
- 解锁：pthread_mutex_unlock(&mutex);
- 销毁：不再使用时调用 pthread_mutex_destroy(&mutex);


https://github.com/reers/ReerKit/blob/main/Sources/ReerKit/Utility/Lock/MutexLock.swift

```swift
#if os(Linux)
import Glibc
#else
import Darwin
#endif

/// ReerKit: A wrapper class for pthread mutex, providing a simple interface for thread synchronization.
public final class MutexLock {
    private var mutex = pthread_mutex_t()
    
    public init() {
        pthread_mutex_init(&mutex, nil)
    }
    
    deinit {
        pthread_mutex_destroy(&mutex)
    }
    
    /// Acquires the lock, blocking the current thread until the lock can be obtained.
    public func lock() {
        pthread_mutex_lock(&mutex)
    }
    
    /// ReerKit: Attempts to acquire the lock without blocking.
    /// Returns true if the lock was successfully locked and false if the lock was already locked.
    @discardableResult
    public func tryLock() -> Bool {
        return pthread_mutex_trylock(&mutex) == 0
    }
    
    /// Releases the lock.
    public func unlock() {
        pthread_mutex_unlock(&mutex)
    }

    /// ReerKit: Executes a closure returning a value while acquiring the lock.
    ///
    /// - Parameter execute: The closure to run while holding the lock.
    ///
    /// - Returns: The value the closure generated.
    ///
    /// - Throws: Rethrows any error that the closure might throw.
    public func around<Result>(_ execute: () throws -> Result) rethrows -> Result {
        lock()
        defer { unlock() }
        return try execute()
    }
}
```