https://www.cnblogs.com/kidney/p/7384835.html


//计算属性
https://skyronic.com/blog/vuejs-internals-computed-properties

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
</head>

<body>
    <script>
        // Singleton to track dependencies
        var Dep = {
            // current target
            target: null
        }

        var trace = function (message) {
            // change to true to log trace messages
            if (false)
                console.log("[ TRACE ] " + message);
        }

        function defineReactive(obj, key, val) {
            var deps = [];
            Object.defineProperty(obj, key, {
                get: function () {

                    // Check if there is a target and it hasn't been linked 
                    // as a dependency already
                    if (Dep.target && deps.indexOf(Dep.target) == -1) {
                        trace("Adding target to deps for " + key)
                        deps.push(Dep.target);
                    }

                    trace("Getting value of " + key);
                    return val;
                },
                set: function (newValue) {
                    trace("Setting value of " + key + ". value: " + newValue);
                    val = newValue;

                    for (var i = 0; i < deps.length; i++) {
                        // call the target's callback
                        deps[i]();
                    }
                }
            })
        };

        function defineComputed(obj, key, computeFunc, callbackFunc) {
            var onDependencyUpdated = function () {
                trace("Dependency updated for " + key + ". Recomputing.");
                var value = computeFunc();
                callbackFunc(value);
            };

            Object.defineProperty(obj, key, {
                get: function () {
                    trace("Getting computed property :" + key);

                    // Set current update callback 
                    Dep.target = onDependencyUpdated;

                    // Compute the value
                    var value = computeFunc();

                    // Reset the target so no more property adds this as dependency
                    Dep.target = null;

                    return value;
                },
                set: function () {
                    console.warn('nope!');
                }
            })
        }


        var person = {};
        defineReactive(person, 'age', 16);
        defineReactive(person, 'country', 'Brazil');

        defineComputed(person, 'status', function () {
            if (person.age > 18) {
                return 'Adult'
            }
            else {
                return 'Minor'
            }
        }, function (newValue) {
            console.log("CHANGED!! The person's status is now: " + newValue)
        });

        console.log("Current age: " + person.age)
        console.log("Current status: " + person.status)

        // change age
        console.log("Changing age");
        person.age = 22;


        // change country. Note that status update doesn't trigger
        // since status doesn't depend on country
        console.log("Changing country");
        person.country = "Chile";
    </script>
</body>

</html>
```