#! /bin/bash

read iptimes < /dev/stdin
ip=$(cut -d'*' -f1 <<< $iptimes)
times=$(cut -d'*' -f2 -s  <<< $iptimes)
for (( c=1; c<=$times; c++ ))
do
ping -c1 $ip | grep -o '[^ ]\+% packet loss'
sleep 1
done