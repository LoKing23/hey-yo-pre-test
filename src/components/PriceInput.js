import React from 'react';
import { FormControl, FormLabel, FormErrorMessage, InputGroup, InputLeftAddon, Input, NumberInputField, NumberInput } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form';
import addComma from "../utils/addComma"
/*
○ UI 如下圖所示,間距色碼字型大小自訂
○ 初始價格為 0 元
○ 入住費用輸入顯示需要自動加上千分位
○ 需要支援小數點的輸入與顯示
*/

const PriceInput = ({label = '入住費用(每人每晚)', name = 'price'}) => {
  const { register, formState: { errors }, getValues } = useFormContext();
  const priceProps = register(name, { 
    required: '不可以為空白',
  });
  
  return (
      <FormControl isInvalid={errors[name]}>
          <FormLabel>{label}</FormLabel>
          <InputGroup>
            <InputLeftAddon children='TWD' />
            <Input 
              {...priceProps}
              onChange={e => {
                const { value } = e.target;
                const formattedValue = value.replace(/,/g, '');
                const num = Number(formattedValue);
                const isInvalid = isNaN(num);
                const isEmpty = value === '';

                if(isInvalid) {
                  e.target.value = getValues(name);
                } else if(isEmpty) {
                  e.target.value = '';
                } else {
                  e.target.value = addComma(formattedValue);
                }

                priceProps.onChange(e);
              }}
            />
          </InputGroup>
          <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
      </FormControl>
  )
}

export default PriceInput