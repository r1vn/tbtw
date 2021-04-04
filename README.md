calculates the time between two timestamps\
timestamps are treated as UTC, so any local timezone fluctuations are ignored

## setup

`npm i -g r1vn/tbtw` as root/admin

or

save [index.js](https://raw.githubusercontent.com/r1vn/tbtw/master/index.js) as `~/bin/tbtw` then run `chmod +x ~/bin/tbtw`

## use

also displayed with `tbtw -help`

```
tbtw timestamp1 [timestamp2]

- if both timestamps are provided, calculates the difference between them
- if timestamp2 is omitted, calculates the difference between timestamp1 and present time

timestamps must be provided in one of the following formats:

    2020
    2020-01
    2020-01-23
    2020-01-23T01:23
    2020-01-23T01:23:45
    01:23
    01:23:45

examples:

(invoked at 2021-04-04 09:08:47)

tbtw 02:00

    2021-04-04 02:00:00
    2021-04-04 09:08:47
    7 hours 8 minutes 47 seconds

tbtw 22:00

    2021-04-04 09:08:47
    2021-04-04 22:00:00
    12 hours 51 minutes 13 seconds

tbtw 2021

    2021-01-01 00:00:00
    2021-04-04 09:08:47
    93 days 9 hours 8 minutes 47 seconds
    
tbtw 2022

    2021-04-04 09:08:47
    2022-01-01 00:00:00
    271 days 14 hours 51 minutes 13 seconds
    
tbtw 2021-04

    2021-04-01 00:00:00
    2021-04-04 09:08:47
    3 days 9 hours 8 minutes 47 seconds
    
tbtw 2021-05

    2021-04-04 09:08:47
    2021-05-01 00:00:00
    26 days 14 hours 51 minutes 13 seconds
    
tbtw 2021-04-04

    2021-04-04 00:00:00
    2021-04-04 09:08:47
    9 hours 8 minutes 47 seconds
    
tbtw 2021-04-05

    2021-04-04 09:08:47
    2021-04-05 00:00:00
    14 hours 51 minutes 13 seconds
    
tbtw 2021-04-04T08:00

    2021-04-04 08:00:00
    2021-04-04 09:08:47
    1 hour 8 minutes 47 seconds
    
tbtw 2021-04-04T10:00

    2021-04-04 09:08:47
    2021-04-04 10:00:00
    51 minutes 13 seconds
    
tbtw 2021-04-04T01:23:45

    2021-04-04 01:23:45
    2021-04-04 09:08:47
    7 hours 45 minutes 2 seconds
    
tbtw 02:00 22:00

    2021-04-04 02:00:00
    2021-04-04 22:00:00
    20 hours 

tbtw 2021 2022
    
    2021-01-01 00:00:00
    2022-01-01 00:00:00
    365 days 
    
tbtw 2021 2021-04
    
    2021-01-01 00:00:00
    2021-04-01 00:00:00
    90 days 

tbtw 2021-04 2021-04-04

    2021-04-01 00:00:00
    2021-04-04 00:00:00
    3 days 

tbtw 2021-04-04 2021-04-04T04:00

    2021-04-04 00:00:00
    2021-04-04 04:00:00
    4 hours 
    
tbtw 2021-04-04T04:00 2021-04-04T05:02:03

    2021-04-04 04:00:00
    2021-04-04 05:02:03
    1 hour 2 minutes 3 seconds
```