import React from 'react'
import { Flex, Box, Text, Spacer, Button } from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form';
// components
import AgeGroupSelect from "./AgeGroupSelect";
import PriceInput from "./PriceInput";


const FormHeader = ({ handleRemoveForm, formName }) => {
    return (
        <Flex alignItems='center'>
            <Text fontSize='2xl' fontWeight='bold'>{formName}</Text>
            <Spacer />
            <Button 
                variant='unstyled' 
                onClick={handleRemoveForm}
                color="red.500"
                _hover={{
                    color: 'red.400',
                }}
            >
                X 移除
            </Button>
        </Flex>
    )
}
const PriceSettingForm = ({ 
    formName = '價格設定', 
    handleSubmit = () => {}, 
    setRange = () => {},
    handleRemoveForm = () => {},
}) => {
    const methods = useForm();
    const { watch } = methods;
    const formValues = watch();
    console.log({
        formValues
    });
    
    return (
        <FormProvider {...methods}>
            <Box py="4">
                <FormHeader formName={formName} handleRemoveForm={handleRemoveForm}/>
                <form onSubmit={methods.handleSubmit(handleSubmit)}>
                    <Flex>
                        <Box w='full' mr="2">
                            <AgeGroupSelect />
                        </Box>
                        <Spacer />
                        <Box w='full'>
                            <PriceInput />
                        </Box>
                    </Flex>
                </form>
            </Box>
        </FormProvider>
    )
}

export default PriceSettingForm