<!-- TOC -->

- [User Notifications](#user-notifications)
    - [请求使用通知的权限](#%E8%AF%B7%E6%B1%82%E4%BD%BF%E7%94%A8%E9%80%9A%E7%9F%A5%E7%9A%84%E6%9D%83%E9%99%90)
    - [UNUserNotificationCenter](#unusernotificationcenter)
    - [UNUserNotificationCenterDelegate](#unusernotificationcenterdelegate)
    - [UNNotificationSettings](#unnotificationsettings)
        - [UNAuthorizationStatus](#unauthorizationstatus)
        - [UNNotificationSetting](#unnotificationsetting)
    - [UNNotificationRequest](#unnotificationrequest)
        - [UNNotificationTrigger](#unnotificationtrigger)
    - [UNNotification](#unnotification)
    - [UNNotificationCategory](#unnotificationcategory)
        - [UNNotificationAction](#unnotificationaction)
    - [UNNotificationResponse](#unnotificationresponse)

<!-- /TOC -->

# User Notifications

将面向用户的通知从服务器推送到用户的设备，或从您的应用程序本地生成它们。

https://developer.apple.com/documentation/usernotifications/

## 请求使用通知的权限

- 当您的应用第一次发出此授权请求时，系统会提示用户批准或拒绝该请求并记录用户的响应。后续授权请求不会提示用户。

```swift
let center = UNUserNotificationCenter.current()
center.requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in

    if let error = error {
        // Handle the error here.
    }

    // Enable or disable features based on the authorization.
}
```

provisional

```swift
// 临时通知不会影响用户体验
let center = UNUserNotificationCenter.current()
center.requestAuthorization(options: [.alert, .sound, .badge, .provisional]) { granted, error in

    if let error = error {
        // Handle the error here.
    }

    // Provisional authorization granted.
}
```

## UNUserNotificationCenter

用于管理应用或应用扩展的通知相关活动的中心对象。

## UNUserNotificationCenterDelegate

用于处理传入通知和通知相关操作的接口。

```swift
// app在后台运行时到达的通知时处理
func userNotificationCenter(UNUserNotificationCenter, didReceive: UNNotificationResponse, withCompletionHandler: () -> Void)

// app在前台运行时到达的通知时处理
func userNotificationCenter(UNUserNotificationCenter, willPresent: UNNotification, withCompletionHandler: (UNNotificationPresentationOptions) -> Void)
```

## UNNotificationSettings

用于管理通知相关设置和应用授 ​​ 权状态的对象。

### UNAuthorizationStatus

指示是否允许应用程序安排通知的常量

```swift

enum UNAuthorizationStatus{
case notDetermined // 用户尚未选择是否允许应用程序安排通知。
case denied // 该应用无权安排或接收通知。
case authorized // 该应用程序有权安排或接收通知。
case provisional // 该应用程序被临时授权发布不间断的用户通知。
case ephemeral // 该应用程序被授权在有限的时间内安排或接收通知。
}

```

### UNNotificationSetting

指示通知设置当前状态的常量

```swift

enum UNAuthorizationStatus{
case notSupported // 该设置不适用于您的应用。
case disabled // 该设置被禁用
case enabled // 该设置已启用
}

```

## UNNotificationRequest

调度本地通知的请求，包括通知的内容和发送的触发条件。

### UNNotificationTrigger

触发本地或远程通知传递的子类的常见行为。

UNNotificationTrigger 类是一个`抽象类`，用于表示触发通知传递的事件。 您`不直接创建此类的实例`。 相反，您实例化定义您想要通知的触发条件的具体子类。 然后，您将生成的对象分配给您用来安排通知的 UNNotificationRequest 对象。

具体的触发器类包括：

- UNTimeIntervalNotificationTrigger 一种触发条件，它会导致系统在您指定的时间过后发送通知。
- UNCalendarNotificationTrigger 导致系统在特定日期和时间发送通知的触发条件。
- UNLocationNotificationTrigger 当用户的设备进入或退出您指定的地理区域时，导致系统发送通知的触发条件。
- UNPushNotificationTrigger 指示 Apple 推送通知服务 (APN) 已发送通知的触发条件。

## UNNotification

系统传递给您的应用程序的本地或远程通知的数据。

UNNotification 对象包含初始通知请求，其中包含通知的有效负载，以及系统传递通知的日期。 
`不要直接创建通知对象`。 处理通知时，系统会将通知对象传递给您的 UNUserNotificationCenterDelegate 对象。 UNUserNotificationCenter 对象还维护系统传递的通知列表，您可以使用 getDeliveredNotifications(completionHandler:) 方法来检索这些对象。

## UNNotificationCategory

应用支持的一种通知类型以及系统显示的自定义操作。

使用 UNUserNotificationCenter 的 setNotificationCategories(_:) 方法注册您的类别对象。

### UNNotificationAction

应用程序为响应系统提供的通知而执行的任务。

```swift
// Define the custom actions.
let acceptAction = UNNotificationAction(identifier: "ACCEPT_ACTION",
      title: "Accept", 
      options: [])
let declineAction = UNNotificationAction(identifier: "DECLINE_ACTION",
      title: "Decline", 
      options: [])
// Define the notification type
let meetingInviteCategory = 
      UNNotificationCategory(identifier: "MEETING_INVITATION",
      actions: [acceptAction, declineAction], 
      intentIdentifiers: [], 
      hiddenPreviewsBodyPlaceholder: "",
      options: .customDismissAction)
// Register the notification type.
let notificationCenter = UNUserNotificationCenter.current()
notificationCenter.setNotificationCategories([meetingInviteCategory])
```

## UNNotificationResponse

用户对可操作通知的响应。

当用户与传递的通知进行交互时，系统会传递一个 UNNotificationResponse 对象到您的应用程序，以便您可以处理响应。

```swift
func userNotificationCenter(_ center: UNUserNotificationCenter,
            didReceive response: UNNotificationResponse,
            withCompletionHandler completionHandler: 
               @escaping () -> Void) {
   // Get the meeting ID from the original notification.
   let userInfo = response.notification.request.content.userInfo
        
   if response.notification.request.content.categoryIdentifier ==
              "MEETING_INVITATION" {
      // Retrieve the meeting details.
      let meetingID = userInfo["MEETING_ID"] as! String
      let userID = userInfo["USER_ID"] as! String
            
      switch response.actionIdentifier {
      case "ACCEPT_ACTION":
         sharedMeetingManager.acceptMeeting(user: userID, 
               meetingID: meetingID)
         break
                
      case "DECLINE_ACTION":
         sharedMeetingManager.declineMeeting(user: userID, 
               meetingID: meetingID)
         break
                
      case UNNotificationDefaultActionIdentifier,
           UNNotificationDismissActionIdentifier:
         // Queue meeting-related notifications for later
         //  if the user does not act.
         sharedMeetingManager.queueMeetingForDelivery(user: userID,
               meetingID: meetingID)
         break
                
      default:
         break
      }
   }
   else {
      // Handle other notification types...
   }
        
   // Always call the completion handler when done.
   completionHandler()
}
```
