 #!/usr/bin/env bash

awk '! /Retailer Assigned/' Commodities_20210406090430.csv | awk -v FS=\",\" '{ for (i=1;i<=5;i++) printf "\"" $i "\","; printf "\n" }' | sed 's/^.//;s/.$//' > allPLUcodes.csv
