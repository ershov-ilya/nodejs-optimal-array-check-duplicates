﻿## Сравнение эффективности методов поиска дубликатов в массиве
### Node.js скрипт

Для запуска скрипта необходимо загрузить npm зависимости:

После клонирования репозитория: `npm install` 

---
Генерирует набор массивов с заданной длиной строки элементов и их количеством,
затем прогоняет эти массивы через 3 метода поиска дубликатов и замеряет время
за которое они справляются со своей задачей

> Практика показала, что самым эффективными являются

> **На коротких строках** - метод **индексирования** массива

> Если же массив состоит **из длинных строк**, то тогда эффективнее метод основанный на **хэшах**

Для того чтобы провести тестирование на массивах из длинных строк, необходимо раскомментировать строки:
```
    // Генерируем массивы для тестирования
    program=[
	    {strlen:8, arrsize:100},
	    //{strlen:32, arrsize:100},
	    //{strlen:64, arrsize:10000},
	    {strlen:8, arrsize:20000},
	    {strlen:4, arrsize:20000},
    ]
```

