import React, { useEffect } from 'react';
import { Select, Flex, Text, FormControl, FormLabel } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form';
import findNestedErrorMessage from "../utils/findNestedErrorMessage"
import FormErrorMessage from "./FormErrorMessage"

/*
○ UI 如下圖所示,間距色碼字型大小自訂
○ 限制 0 ~ 20 歲
○ 初始年齡範圍為 0 到 20 歲
○ 年齡 Option 要 Disabled 無法選取的年齡,解釋如下
    ■ 已選擇 0 到 20 歲,則起始年齡和結束年齡都可以選擇 0 ~ 20 歲
    ■ 若先選擇起始年齡,假設 6 歲,則結束年齡只能選擇 6 ~ 20 歲
    ■ 若先選擇結束年齡,假設 15 歲,則起始年齡只能選擇 0 ~ 15 歲
    ■ 已選擇 7 到 17 歲,則起始年齡可以選擇 0 ~ 17 歲,結束年齡可以選擇
    7 ~ 20 歲
*/
const AGE_RANGE = Array.from({ length: 20 }).map((_, index) => index + 1);

const AgeGroupSelect = ({
    label = '年齡', 
    name = 'ageGroup', 
}) => {
    const { register, watch, formState: { errors }, trigger } = useFormContext();
    const startName = `${name}.0`;
    const endName = `${name}.1`;
    const [startAge, endAge] = watch([startName, endName]);
    const { isInvalid, errorMessage  } = findNestedErrorMessage(errors, startName) || findNestedErrorMessage(errors, endName);

    // trigger validation when startAge or endAge is selected
    useEffect(() => {
        const isSelected = startAge && endAge;

        if(isSelected) {
            trigger(startName);
            trigger(endName);
        }

    }, [startAge, endAge, trigger, startName, endName]);

    return (
        <FormControl isInvalid={isInvalid}>
            <FormLabel>{label}</FormLabel>
            <Flex alignItems='center'>
                <Select 
                    {...register(
                        startName,
                        {
                           required: '請選擇起始年齡',
                        }
                    )}
                >
                    {
                        AGE_RANGE.map(value => (
                            <option key={value} value={value} disabled={endAge && value > endAge}>
                                { value }
                            </option>
                        ))
                    }
                </Select>
                <Text px="2">
                    ~
                </Text>
                <Select 
                    {...register(
                        endName,
                        {
                            required: '請選擇結束年齡',
                        }
                    )}
                >
                    {
                        AGE_RANGE.map(value => (
                            <option key={value} value={value} disabled={startAge && value < startAge} >
                                { value }
                            </option>
                        ))
                    }
                </Select>
            </Flex>
            <FormErrorMessage errorMessage={errorMessage} />
        </FormControl>
    )
}

export default AgeGroupSelect