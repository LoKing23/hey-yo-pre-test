import React from 'react';
import { FormControl, FormLabel, FormErrorMessage, InputGroup, InputLeftAddon, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form';
import addComma from "../utils/addComma"
/*
○ UI 如下圖所示,間距色碼字型大小自訂
○ 初始價格為 0 元
○ 入住費用輸入顯示需要自動加上千分位
○ 需要支援小數點的輸入與顯示
*/

const PriceInput = ({label = '入住費用(每人每晚)'}) => {
  const { register, formState: { errors }, watch } = useFormContext();
  const priceProps = register('price', { required: '不可以為空白' });
  
  return (
      <FormControl isInvalid={errors.price}>
          <FormLabel>{label}</FormLabel>
          <InputGroup>
            <InputLeftAddon children='TWD' />
            <Input 
              {...priceProps}
              // onChange={(event) => {
              //   const { value } = event.target;
              //   const number = Number(value.replace(/,/g, ''));
              //   const formatNumber = addComma(number);

              //   priceProps.onChange(formatNumber);
              // }}
            />
          </InputGroup>
          <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
      </FormControl>
  )
}

export default PriceInput