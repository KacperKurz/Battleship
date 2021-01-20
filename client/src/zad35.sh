#! /bin/bash

table=()

for ((i=0;i<5;++i))
    do
        read temp
        if [ $temp -gt 0 ]
            then
                table+=($temp)
            fi
    done

echo ${table[@]}
sum=0
for i in "${table[@]}"
    do
                sum=$(($sum+$i))
    done

echo $sum

exit 0