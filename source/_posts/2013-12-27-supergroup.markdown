---
layout: post
title: "supergroup"
date: 2013-12-27 00:07:00 -0500
comments: true
categories: 
categories: [repo]
source: https://github.com/Sigfried/supergroup
demo: ../supergroup/demo.html
---



``` javascript
var gradeBook = [
   {firstName: 'Sigfried', lastName: 'Gold', class: 'Remedial Programming', grade: 'C+', num: 2.2},
   {firstName: 'Sigfried', lastName: 'Gold', class: 'Literary Posturing', grade: 'B', num: 3},
   {firstName: 'Sigfried', lastName: 'Gold', class: 'Documenting with Pretty Colors', grade: 'B-', num: 2.7},
   {firstName: 'Someone', lastName: 'Else', class: 'Remedial Programming', grade: 'A'}];

var gradesByLastName = enlightenedData.group(gradeBook, 'lastName')
```


``` javascript
var gradesByName = enlightenedData.group(gradeBook,  
        function(d) { return d.lastName + ', ' + d.firstName },  
        {dimName: 'fullName'})

var sigfried = gradesByName.lookup('Gold, Sigfried');
sigfried.records.length; // 3
var sigfriedGPA = sigfried.records.reduce(function(result,rec) { return result+rec.num }, 0) / sigfried.records.length;
(it does much much more, will explain below)
```

<!--
{% include_code supergroup-test.js %}
-->
