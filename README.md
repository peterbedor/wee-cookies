# Wee Cookies Module

This module makes manipulating browser cookies easier


## Configuration
| Variable     | Type    | Default | Description                                          |
|--------------|---------|---------|------------------------------------------------------|
| name         | string  |         | Sets the name of the cookie                          |
| value        | mixed   |         | Sets the value of the cookie                         |
| daysToExpire | integer | 7       | Sets the number of days after which the cookie will expire |

## Getting Started

To set a cookie:

```javascript
Wee.cookie.set({
    name: 'cookieName',
    value: 'cookieValue',
    daysToExpire: 14
});
```

To get a cookie:

```javascript
Wee.cookie.get('cookieName');
```

To destroy a cookie:

```javascript
Wee.cookie.destroy('cookieName');
```