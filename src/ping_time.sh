#! /bin/bash

read iptimes < /dev/stdin
ip=$(cut -d'*' -f1 <<< $iptimes)
times=$(cut -d'*' -f2 -s  <<< $iptimes)

temp=""
if [ ! -z "$times" ]
then
    temp="-c${times}"
fi

#ping $temp $ip |grep -o 'time=.*'
for (( c=1; c<=$times; c++ ))
do
ping -c1 $ip |grep -o 'time=.*'
sleep 1
done



