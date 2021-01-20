#! /bin/sh

table=()
for ((i=0;i<5;++i))
    do
        read temp
        table+=($temp)
    done

min=${table[0]}
for i in ${table[@]}
    do
        if [ $i -lt $min ]
            then
                min=$i
        fi
    done

echo "Liczba minimalna to $min"

exit 0