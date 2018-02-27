console.log "Hello, CoffeeScript!"

### Comments ###

# One Line Comment

###
One Line
Another Line
Third Line
###


### Numbers ###

a = 10; b = 20

num = 464
num2 = 34636.2343


### Booleans ###

bool = true
online = on or off
isReady = yes or no


### Strings ###

str = "Some string"
multiLineString =
    "Some very
    very very very
    long string"

heredocString = """

My Text:

Lorem ipsum dolor sit amet,
consectetur adipisicing elit. Laboriosam consectetur,
maiores ea corporis quisquam molestiae dignissimos
veritatis consequatur, distinctio sapiente voluptatum
praesentium voluptatibus suscipit quas inventore,
asperiores quidem necessitatibus officiis.
"""

name = "Sorax"
greeting = "Hello, #{name.toUpperCase()}!"


### Arrays ###

arr = [1, 2, 3, 4, 5]
arr = [
    1, 2, 3
    4, 5, 6
    7, 8, 9
]

range = [0..10]
range = [0...10]
range = [0..25]

range[0..10]
range[5..]
newRange = range[..]


### Objects ###

user =
    name: "John Doe",
    age: 24
    status: "Web Developer"
    skills:
        html: 10
        css: 9
        javascript: 6
        coffeescript: 8


### Regular Expressions ###

visa = ///
    ^4 # Start with 4
    [0-9]{12} # 12 digits
    (?:[0-9]{3})?$ # New cards have 16 digits
///
masterCard = ///
    ^5[1-5] # Start with 51-55
    [0-9]{14}$ # 14 digits
///
americanExpress = ///
    ^3[47] # Start with 34 or 37
    [0-9]{13}$ # 13 digits
///


### Operators ###

first && second
true || false

first and second
yes or no

not isReady or not isOnline

a == b
a is 10
a isnt b
a is not b

update a if 10 < a < 20

[a, b] = [b, a]
[book, author, pages] = ["1984", "G.Orwell", 327]

car =
    brand: "Porsche"
    model: "911 Turbo"
    engine:
        type: "V8"
        hp: 478
    cost: 600000

{model, engine: {type}} = car

user.lastVisit = do Date.now
"age" of user

14 in range
country in ["Russia", "USA", "UK", "Germany"]

book = 24623
open book if book
open? book if book?

obj = {}
obj.speed ?= 100

obj.speed = obj.speed || 100
obj.speed ||= 100

this.age = config.age || 10
this.age = config.age ? 10


### Functions ###

greet = (name) ->
    do updateSomething
    "Hello, #{name}!"
    do changeSomething

greet = (name) ->
    if name
        "hello"
    else
        "goodbye"

greet = (name = "Sorax", greeting = "Bonjour") ->
    "#{greeting}, #{name}!"
    return

normilize = (length, vectors...) -> return

outer = 10

func = () ->
    outer = 10
    inner = 10
    return

show update obj, 10, 20
show update(obj, 10, 20), "fast"
show()
do show

a +b

do -> do something


### Conditional statements ###

if isReady
    activate something
    if not isFull
        append something
else
    do prepare

if isReady then activate something
activate something if isReady

unless isReady then do prepare

action = if mode is "idle" then "sleep" else "wander"
show if message then message else warning

switch state
    when 0 then message = "request not initialized"
    when 1 then message = "server connection established"
    when 2 then message = "request received"
    when 3 then message = "processing request"
    when 4 then message = "request finished and response is ready"
    else message = "unknown state"

message = switch state
    when 0 then "request not initialized"
    when 1 then "server connection established"
    when 2 then "request received"
    when 3 then "processing request"
    when 4 then "request finished and response is ready"
    else "unknown state"


### Cycles ###

while isReady
    do something
while isReady then do something
do something while isReady

while not isReady
    do prepare
until isReady
    do prepare

for i in [0..10]
    update i

update i for i in [0..10] by 2
update i for i in [0..100] when isPrime i

primeNumbers = (i for i in [0..100] when isPrime i)

show element for element in array
show element for element in array when element in rightEelements
remove index for element, index in array when element in rightEelements

console.log value for property, value of obj
console.log value for own property, value of obj

for event in ["click", "mouseover", "mouseout", "focus"]
    do (event) ->
        mySuperLibrary::["on#{event}"] = (callback) ->
            mySuperLibrary::on event, callback
            return
        return


### Classes ###

class Person

    constructor: (name, age) ->
        @name = name
        @age = age

    getInfo: ->
        "Name: #{@name}, Age: #{@age}"

    @myStaticFunc: ->
        do something

    @myStaticNum: 1234

class WebDeveloper extends Person

    constructor: ->
        super 10, 20, 30
        do something

    getInfo: ->
        super arg1, arg2
        "My custom method"

    myMethod: ->
        someFunc =>
            process @age

Person::myMethod = -> say "hi"










































