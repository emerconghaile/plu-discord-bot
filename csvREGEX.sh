 #!/usr/bin/env bash

awk -v FS=\",\" '{ for (i=1;i<=5;i++) printf "\"" $i "\","; printf "\n" }' Commodities_20210406090430.csv | sed 's/^.//;s/.$//' > allPLUcodes.csv
