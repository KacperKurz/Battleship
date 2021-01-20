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
        if [ $i -gt 0 ]
            then
                sum=$(($sum+$i))
            fi
    done

echo $sum

exit 0