---
layout: post
title: "underscore-unchained"
date: 2013-12-27 00:09:00 -0500
comments: true
reponame: underscore-unchained
categories: [repo]
source: https://github.com/Sigfried/underscore-unchained
---


A mixin that lets you use Underscore methods directly from objects or
classes of objects, and there's no need for _.chain(). Even if you
wouldn't use it in your code, it's pretty nice for debugging in the
console.

<!-- more -->

``` javascript Unchain an array and it's ready to go
var abcd = _.unchain(['a','bb','ccccc','d']) // a humble array of strings

abcd.pluck('length')                         // pluck lengths into an array of numbers: [1,2,5,1]
    .max()                                   // max (as a Number object)
    .range()                                 // create an array of that length

=> [0, 1, 2, 3, 4]                           // no need for unwrapping!
```
### Promethean mode
Defy the gods and bring the full power of Underscore to __all__ your
Arrays, Objects, or whatever.  Also works with constructors of
user-defined classes. Use at your own risk.  Modifying built in types is
a seriously reckless undertaking and I totally recommend against it,
but, hey, what's the worst that could happen?

``` javascript Add Underscore methods to Arrays globally
_.prometheus(Array);

['a','bb','ccc'].pluck('length').last().range()  // OMG, my arrays can do anything!
=> [0, 1, 2]
```

