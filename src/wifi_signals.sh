#! /bin/bash

wifiinfo=$(nmcli -f SSID,ACTIVE,RATE,SIGNAL -t -m multiline -color no dev wifi)
echo $wifiinfo
