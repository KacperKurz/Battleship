#! /bin/bash

table=()

for ((i=0;i<5;++i))
    do
        read temp
        table[$i]=$temp
    done

sum=0
for i in "${table[@]}"
    do
        sum=$(($sum+$i))
    done

echo $(bc<<<"$sum/5")

exit 0