#! /bin/sh

table=()
for ((i=0;i<5;++i))
    do
        read temp
        table+=($temp)
    done

max=${table[0]}
for i in ${table[@]}
    do
        if [ $i -gt $max ]
            then
                max=$i
        fi
    done

echo "Liczba maximalna to $max"

exit 0