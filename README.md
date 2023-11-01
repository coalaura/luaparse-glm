# luaparse-glm

An extension to [luaparse](https://www.npmjs.com/package/luaparse) that adds support for most of FiveM's [lua-glm](https://github.com/citizenfx/lua/blob/luaglm-dev/cfx/README.md) runtime.

### Compound Operators:
Add ``+=, -=, *=, /=, <<=, >>=, &=, |=, and ^=`` to the language. The increment and decrement operators (``++, --``) have not been implemented due to one of those operators being reserved.

### Safe Navigation:
An indexing operation that suppresses errors on accesses into undefined tables (similar to the safe-navigation operators in C#, Kotlin, etc.), e.g.,

```lua
t?.x?.y == nil
```

### In Unpacking:
Support for unpacking named values from tables using the ``in`` keyword, e.g,

```lua
local a,b,c in t
```

is functionally equivalent to:

```lua
local a,b,c = t.a,t.b,t.c
```

### C-Style Comments:
Support for C-style block comments: ``/* Comment */``, e.g.,

```lua
print("Hello, World!") /* Comment */
```

### Compile Time Jenkins' Hashes:
String literals wrapped in back-ticks are Jenkins' one-at-a-time hashed when parsed.

```lua
> `Hello, World!`
1395890823
```

### Not Implemented yet:
- The defer statement
- Set Constructors (`t = { .a, .b }`)