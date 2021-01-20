#! /bin/bash

nr=()
nazwisko=()
rok=()

for ((i=0;i<5;++i))
    do
        echo "Podaj nr"
        read temp
        nr+=($temp)
        echo "Podaj nazwisko"
        read temp
        nazwisko+=($temp)
        echo "Podaj rok zatrudnienia"
        read temp
        rok+=($temp)
    done

for ((i=0;i<5;++i))
    do
        if [ $(bc<<<"2021-${rok[$i]}") -gt 10 ]
        then
            echo ${nazwisko[$i]}
        fi
    done


exit 0